const map = L.map('map').setView([33.3, 131.6], 9);
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap & CartoDB',
  subdomains: 'abcd'
}).addTo(map);

const csvFile = "data/all_routes.csv";
const checkboxesDiv = document.getElementById("checkboxes");
let allDataByDate = {};
let markers = [];
let polylines = [];
const colorList = ["red", "green", "orange", "blue", "purple", "grey", "gold"];
const dateColors = {};

Papa.parse(csvFile, {
  download: true,
  header: true,
  complete: results => {
    const grouped = {};

    results.data.forEach(row => {
      const date = row.arrival_date?.trim();
      if (!date) return;

      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(row);
    });

    allDataByDate = grouped;

    // ✅ 年ごとにグループ化
    const groupedByYear = {};
    Object.keys(allDataByDate).forEach((date, idx) => {
      const year = date.split("-")[0];
      if (!groupedByYear[year]) groupedByYear[year] = [];
      groupedByYear[year].push(date);

      const color = colorList[idx % colorList.length];
      dateColors[date] = color;
    });

    // ✅ 年→日付 のチェックボックス構造生成
    Object.entries(groupedByYear).forEach(([year, dates]) => {
      const yearLabel = document.createElement("label");
      yearLabel.className = "year-checkbox";

      const yearCheckbox = document.createElement("input");
      yearCheckbox.type = "checkbox";
      yearCheckbox.checked = true;
      yearCheckbox.dataset.level = "year";

      yearLabel.appendChild(yearCheckbox);
      yearLabel.append(" " + year);
      checkboxesDiv.appendChild(yearLabel);

      const dateListDiv = document.createElement("div");
      dateListDiv.style.marginLeft = "1em";

      dates.forEach(date => {
        const dateLabel = document.createElement("label");
        dateLabel.className = "date-checkbox";

        const dateCheckbox = document.createElement("input");
        dateCheckbox.type = "checkbox";
        dateCheckbox.value = date;
        dateCheckbox.checked = true;
        dateCheckbox.dataset.level = "date";
        dateCheckbox.addEventListener("change", updateMap);

        dateLabel.appendChild(dateCheckbox);
        dateLabel.append(" " + date);
        dateListDiv.appendChild(dateLabel);
      });

      // 親（年）と子（日付）連動処理
      yearCheckbox.addEventListener("change", () => {
        const checked = yearCheckbox.checked;
        dateListDiv.querySelectorAll('input[type="checkbox"]').forEach(cb => {
          cb.checked = checked;
        });
        updateMap();
      });

      // 子→親の indeterminate 処理
      const childCheckboxes = dateListDiv.querySelectorAll('input[type="checkbox"]');
      childCheckboxes.forEach(cb => {
        cb.addEventListener("change", () => {
          const allChecked = Array.from(childCheckboxes).every(c => c.checked);
          const anyChecked = Array.from(childCheckboxes).some(c => c.checked);
          yearCheckbox.checked = allChecked;
          yearCheckbox.indeterminate = !allChecked && anyChecked;
        });
      });

      checkboxesDiv.appendChild(dateListDiv);
    });

    updateMap();
  }
});


function updateMap() {
  markers.forEach(m => map.removeLayer(m));
  markers = [];
  polylines.forEach(p => map.removeLayer(p));
  polylines = [];

  const selectedDates = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).map(cb => cb.value)
  .filter(date => allDataByDate[date]);;

  let allCoords = [];

  selectedDates.forEach(date => {
    const color = dateColors[date] || "gray";
    const entries = allDataByDate[date];

    entries.forEach(row => {
      try {
        const coords = JSON.parse(row["list of coordinates"]);
        if (coords.length > 0) {
          const outline = L.polyline(coords.map(([lng, lat]) => [lat, lng]), {
            color: "black",
            weight: 5,
            opacity: 1
          }).addTo(map);
          polylines.push(outline);
          
          // 本体（上側の細い青線など）
          const mainLine = L.polyline(coords.map(([lng, lat]) => [lat, lng]), {
            color: color,  // 青や日付ごとの色
            weight: 3,
            opacity: 1
          }).addTo(map);
          polylines.push(mainLine);

          const startCoord = coords[0];
          const marker = L.circleMarker([startCoord[1], startCoord[0]], {
            radius: 6,
            color: 'black',
            fillColor: color,
            fillOpacity: 1.0
          }).addTo(map);

          marker.bindPopup(`
            <b>${row.start}</b><br>
            → ${row.end}<br>
            ${row.time}秒 / ${row.distance}m<br>
            <small style="color: gray;">📅 ${row.arrival_date}</small>
          `);
          
          markers.push(marker);
        }
      } catch (e) {
        console.warn("ルート読み込みエラー:", row, e);
      }
    });
  });

  if (allCoords.length > 0) {
    map.fitBounds(allCoords);
  }
}

document.getElementById("selectAll").addEventListener("click", () => {
  document.querySelectorAll('#checkboxes input[type="checkbox"]').forEach(cb => {
    cb.checked = true;
    cb.indeterminate = false;
  });
  updateMap();
});

document.getElementById("clearAll").addEventListener("click", () => {
  document.querySelectorAll('#checkboxes input[type="checkbox"]').forEach(cb => {
    cb.checked = false;
    cb.indeterminate = false;
  });
  updateMap();
});
