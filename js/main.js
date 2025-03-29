const map = L.map('map').setView([33.3, 131.6], 9);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
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
      // ✅ 空文字 or undefined の場合はスキップ
      if (!date) return;

      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(row);
    });

    allDataByDate = grouped;

    const dates = Object.keys(allDataByDate);

    dates.forEach((date, idx) => {
      const color = colorList[idx % colorList.length];
      dateColors[date] = color;

      const label = document.createElement("label");
      label.className = "date-checkbox";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = date;
      checkbox.checked = true;
      checkbox.addEventListener("change", updateMap);

      label.appendChild(checkbox);
      label.append(" " + date);
      checkboxesDiv.appendChild(label);
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
  ).map(cb => cb.value);

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
          
          // 本体（上側の細い青線など）
          const mainLine = L.polyline(coords.map(([lng, lat]) => [lat, lng]), {
            color: color,  // 青や日付ごとの色
            weight: 3,
            opacity: 1
          }).addTo(map);

          const startCoord = coords[0];
          const marker = L.circleMarker([startCoord[1], startCoord[0]], {
            radius: 6,
            color: 'black',
            fillColor: color,
            fillOpacity: 1.0
          }).addTo(map);

          marker.bindPopup(`<b>${row.start}</b><br>→ ${row.end}<br>${row.time}秒 / ${row.distance}m`);
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
  });
  updateMap();
});

document.getElementById("clearAll").addEventListener("click", () => {
  document.querySelectorAll('#checkboxes input[type="checkbox"]').forEach(cb => {
    cb.checked = false;
  });
  updateMap();
});
