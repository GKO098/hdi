const map = L.map('map').setView([33.3, 131.6], 9);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const csvFile = "data/all_routes.csv";
    const checkboxesDiv = document.getElementById("checkboxes");
    let allDataByDate = {};
    let markers = [];
    let polylines = [];
    const colorList = ["red", "green", "orange", "blue", "violet", "grey", "gold", 'black'];
    const dateColors = {};
    const markerIcons = {};

    function createColorMarkerIcon(color) {
      return L.icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        shadowSize: [41, 41]
      });
    }

    Papa.parse(csvFile, {
      download: true,
      header: true,
      complete: results => {
        const grouped = {};

        results.data.forEach(row => {
          const date = row.arrival_date;
          if (!grouped[date]) grouped[date] = [];
          grouped[date].push(row);
        });

        allDataByDate = grouped;

        const dates = Object.keys(allDataByDate);

        dates.forEach((date, idx) => {
          const color = colorList[idx % colorList.length];
          dateColors[date] = color;
          markerIcons[date] = createColorMarkerIcon(color);

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
        const icon = markerIcons[date];
        const entries = allDataByDate[date];

        entries.forEach(row => {
          try {
            const coords = JSON.parse(row["list of coordinates"]);
            if (coords.length > 0) {
              const polyline = L.polyline(coords.map(([lng, lat]) => [lat, lng]), {
                color,
                weight: 4
              }).addTo(map);
              polylines.push(polyline);
              allCoords.push(...coords.map(([lng, lat]) => [lat, lng]));

              const startCoord = coords[0];
              const marker = L.marker([startCoord[1], startCoord[0]], { icon }).addTo(map);
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
