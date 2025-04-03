class MapManager {
  constructor() {
    this.map = null;
    this.allDataByDate = {};
    this.markers = [];
    this.polylines = [];
    this.dateColors = {};
  }

  initializeMap() {
    const mapElement = document.getElementById("map");
    if (!mapElement) {
      console.warn("Map container not found. Waiting for it to be created...");
      return;
    }

    this.map = L.map("map").setView([37, 138], 6);
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution: "&copy; OpenStreetMap & CartoDB",
        subdomains: "abcd",
      }
    ).addTo(this.map);

    const csvFile = "data/all_routes.csv";
    const checkboxesDiv = document.getElementById("checkboxes");
    const colorList = [
      "red",
      "green",
      "orange",
      "blue",
      "purple",
      "grey",
      "gold",
    ];

    Papa.parse(csvFile, {
      download: true,
      header: true,
      complete: (results) => {
        const grouped = {};

        results.data.forEach((row) => {
          const date = row.arrival_date?.trim();
          if (!date) return;

          if (!grouped[date]) grouped[date] = [];
          grouped[date].push(row);
        });

        this.allDataByDate = grouped;

        // 年ごとにグループ化
        const groupedByYear = {};
        Object.keys(this.allDataByDate).forEach((date, idx) => {
          const year = date.split("-")[0];
          if (!groupedByYear[year]) groupedByYear[year] = [];
          groupedByYear[year].push(date);

          const color = colorList[idx % colorList.length];
          this.dateColors[date] = color;
        });

        this.createCheckboxes(groupedByYear, checkboxesDiv);
        this.updateMap();
      },
    });
  }

  createCheckboxes(groupedByYear, checkboxesDiv) {
    Object.entries(groupedByYear).forEach(([year, dates]) => {
      const yearLabel = document.createElement("label");
      yearLabel.className = "year-checkbox";

      const yearCheckbox = document.createElement("input");
      yearCheckbox.type = "checkbox";
      const dateForMap = window.dateForMap || null;
      yearCheckbox.checked = dateForMap === "all" || dateForMap == year;
      yearCheckbox.dataset.level = "year";

      yearLabel.appendChild(yearCheckbox);
      yearLabel.append(" " + year);
      checkboxesDiv.appendChild(yearLabel);

      const dateListDiv = document.createElement("div");
      dateListDiv.style.marginLeft = "1em";

      dates.forEach((date) => {
        const dateLabel = document.createElement("label");
        dateLabel.className = "date-checkbox";

        const dateCheckbox = document.createElement("input");
        dateCheckbox.type = "checkbox";
        dateCheckbox.value = date;
        dateCheckbox.checked = dateForMap === "all" || dateForMap == date || dateForMap == year;
        dateCheckbox.dataset.level = "date";
        dateCheckbox.addEventListener("change", () => this.updateMap());

        dateLabel.appendChild(dateCheckbox);
        dateLabel.append(" " + date);
        dateListDiv.appendChild(dateLabel);
      });

      yearCheckbox.addEventListener("change", () => {
        const checked = yearCheckbox.checked;
        dateListDiv
          .querySelectorAll('input[type="checkbox"]')
          .forEach((cb) => {
            cb.checked = checked;
          });
        this.updateMap();
      });

      const childCheckboxes = dateListDiv.querySelectorAll('input[type="checkbox"]');
      childCheckboxes.forEach((cb) => {
        cb.addEventListener("change", () => {
          const allChecked = Array.from(childCheckboxes).every((c) => c.checked);
          const anyChecked = Array.from(childCheckboxes).some((c) => c.checked);
          yearCheckbox.checked = allChecked;
          yearCheckbox.indeterminate = !allChecked && anyChecked;
        });
      });

      checkboxesDiv.appendChild(dateListDiv);
    });
  }

  updateMap() {
    this.markers.forEach((m) => this.map.removeLayer(m));
    this.markers = [];
    this.polylines.forEach((p) => this.map.removeLayer(p));
    this.polylines = [];

    const selectedDates = Array.from(
      document.querySelectorAll('input[type="checkbox"]:checked')
    )
      .map((cb) => cb.value)
      .filter((date) => this.allDataByDate[date]);

    const allCoords = [];

    selectedDates.forEach((date) => {
      const color = this.dateColors[date] || "gray";
      const entries = this.allDataByDate[date];

      // 日付ごとの最初のエントリーの開始点に「S」マーカーを追加
      if (entries.length > 0) {
        const firstEntry = entries[0];
        try {
          const firstCoords = JSON.parse(firstEntry["list of coordinates"]);
          if (firstCoords.length > 0) {
            const startCoord = firstCoords[0];
            const startMarker = L.marker([startCoord[1], startCoord[0]], {
              icon: L.divIcon({
                className: 'start-marker',
                html: `<div class="marker-circle" style="background-color: ${color};">S</div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
              })
            }).addTo(this.map);

            startMarker.bindPopup(`
              <b>${firstEntry.start}</b><br>
              → ${firstEntry.end}<br>
              ${firstEntry.time}秒 / ${firstEntry.distance}m<br>
              <small style="color: gray;">📅 ${firstEntry.arrival_date}</small>
            `);

            this.markers.push(startMarker);
          }
        } catch (e) {
          console.warn("ルート読み込みエラー:", firstEntry, e);
        }
      }

      entries.forEach((row) => {
        try {
          const coords = JSON.parse(row["list of coordinates"]);
          if (coords.length > 0) {
            const outline = L.polyline(
              coords.map(([lng, lat]) => [lat, lng]),
              {
                color: "black",
                weight: 3,
                opacity: 1,
              }
            ).addTo(this.map);
            this.polylines.push(outline);
            allCoords.push(outline.getBounds());

            const mainLine = L.polyline(
              coords.map(([lng, lat]) => [lat, lng]),
              {
                color: color,
                weight: 2,
                opacity: 1,
              }
            ).addTo(this.map);
            this.polylines.push(mainLine);

            const startCoord = coords[0];
            const marker = L.circleMarker([startCoord[1], startCoord[0]], {
              radius: 4,
              color: "black",
              fillColor: color,
              fillOpacity: 1.0,
            }).addTo(this.map);

            marker.bindPopup(`
              <b>${row.start}</b><br>
              → ${row.end}<br>
              ${row.time}秒 / ${row.distance}m<br>
              <small style="color: gray;">📅 ${row.arrival_date}</small>
            `);

            this.markers.push(marker);
          }
        } catch (e) {
          console.warn("ルート読み込みエラー:", row, e);
        }
      });
    });

    if (allCoords.length > 0) {
      this.map.fitBounds(allCoords);
    }
  }

  attachControlEvents() {
    const selectAll = document.getElementById("selectAll");
    const clearAll = document.getElementById("clearAll");

    if (selectAll) {
      selectAll.addEventListener("click", () => {
        document
          .querySelectorAll('#checkboxes input[type="checkbox"]')
          .forEach((cb) => {
            cb.checked = true;
            cb.indeterminate = false;
          });
        this.updateMap();
      });
    }

    if (clearAll) {
      clearAll.addEventListener("click", () => {
        document
          .querySelectorAll('#checkboxes input[type="checkbox"]')
          .forEach((cb) => {
            cb.checked = false;
            cb.indeterminate = false;
          });
        this.updateMap();
      });
    }
  }
}

const mapManager = new MapManager();
// 初期化はtrip_detail.html側で行う
