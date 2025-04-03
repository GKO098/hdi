class SummaryTable {
  constructor() {
    this.currentSort = {
      key: null,
      asc: true,
    };
    this.costKeys = [
      "cost_meal",
      "cost_toll_road",
      "cost_fuel",
      "cost_rental_car",
      "cost_entrance_fee",
      "cost_parking",
      "cost_hotel",
      "cost_plane",
      "cost_train",
      "cost_bus",
      "cost_ship",
      "cost_equipment",
      "cost_other",
      "cost_total",
    ];
    this.collapsibleKeys = [
      "summary",
      "material",
      "reference",
      "advertiser",
      "topics",
      "places",
    ];
    this.allKeys = [
      "id",
      "date",
      "participants",
      "places",
      "distance",
      ...this.costKeys,
      "material",
      "reference",
      "advertiser",
      "topics",
    ];
  }

  initialize() {
    Papa.parse("data/summary_table.csv", {
      header: true,
      download: true,
      complete: (results) => {
        const trips = results.data
          .filter((row) => row.id)
          .map((row) => {
            const converted = {};
            for (const key in row) {
              converted[key] = row[key];
            }
            return converted;
          });

        this.renderTable(trips);
        this.setupSorting(trips);
      },
    });
  }

  renderTable(data) {
    const tbody = document.querySelector("#trip-table tbody");
    tbody.innerHTML = "";

    const totals = this.calculateTotals(data);

    data.forEach((trip) => {
      const tr = document.createElement("tr");
      this.allKeys.forEach((key) => {
        const cell = this.createCell(trip, key);
        tr.appendChild(cell);
      });
      tbody.appendChild(tr);
    });

    this.updateTotals(totals);
    this.updateSortIcons(null, true);
  }

  calculateTotals(data) {
    const totals = {
      distance: 0,
      ...this.costKeys.reduce((acc, key) => {
        acc[key] = 0;
        return acc;
      }, {}),
    };

    data.forEach((trip) => {
      totals.distance += parseFloat(trip.distance) || 0;
      this.costKeys.forEach((key) => {
        totals[key] += parseFloat(trip[key]) || 0;
      });
    });

    return totals;
  }

  createCell(trip, key) {
    if (key === "id") {
      return this.createIdCell(trip.id);
    } else if (key === "niconico" || key === "youtube") {
      return this.createVideoLinkCell(trip[key], key);
    } else if (key === "participants") {
      return this.createParticipantsCell(trip[key]);
    } else if (this.collapsibleKeys.includes(key)) {
      return this.createCollapsibleCell(trip[key]);
    } else if (key === "itinerary") {
      return this.createItineraryCell(trip[key]);
    } else if (this.costKeys.includes(key) || key === "distance") {
      return this.createNumericCell(trip[key], key);
    } else {
      return this.createTextCell(trip[key]);
    }
  }

  createIdCell(id) {
    const td = document.createElement("td");
    const a = document.createElement("a");
    a.href = `trip_detail.html?id=${id}`;
    a.textContent = id;
    a.className = "trip-link";
    td.appendChild(a);
    return td;
  }

  createVideoLinkCell(url, type) {
    const td = document.createElement("td");
    if (url) {
      const a = document.createElement("a");
      a.href = url;
      a.textContent = type === "niconico"
        ? url.split("https://www.nicovideo.jp/watch/")[1]
        : url.split("https://www.youtube.com/watch?v=")[1];
      a.target = "_blank";
      td.appendChild(a);
    }
    return td;
  }

  createParticipantsCell(text) {
    const td = document.createElement("td");
    td.style.verticalAlign = 'top';
    
    if (text) {
      const div = document.createElement("div");
      div.className = "collapsible-content";
      
      const participants = text.split('\n')
        .map(name => name.trim())
        .filter(name => name !== '');
      
      participants.forEach(name => {
        const icon = document.createElement('img');
        icon.src = `icons/${name}.png`;
        icon.alt = name;
        icon.title = name;
        icon.style.width = '24px';
        icon.style.height = '24px';
        icon.style.verticalAlign = 'middle';
        icon.style.marginRight = '4px';
        div.appendChild(icon);
      });
      
      td.appendChild(div);
    }
    return td;
  }

  createItineraryCell(url) {
    const td = document.createElement("td");
    if (url) {
      const a = document.createElement("a");
      a.href = url;
      a.textContent = "しおり";
      a.target = "_blank";
      td.appendChild(a);
    }
    return td;
  }

  createNumericCell(value, key) {
    const td = document.createElement("td");
    td.classList.add("right");
    const numValue = parseFloat(value) || 0;
    if (key === "cost_total") {
      td.innerHTML = `<strong>${this.formatValue(numValue)}</strong>`;
    } else {
      td.innerHTML = this.formatValue(numValue);
    }
    return td;
  }

  createTextCell(value) {
    const td = document.createElement("td");
    td.style.verticalAlign = 'top';
    td.textContent = value || "";
    return td;
  }

  updateTotals(totals) {
    document.getElementById("total-distance").textContent = totals.distance.toFixed(1);
    this.costKeys.forEach((key) => {
      const element = document.getElementById(`total-${key}`);
      if (element) {
        if (key === "cost_total") {
          element.innerHTML = `<strong>${totals[key].toFixed(1)}円</strong>`;
        } else {
          element.textContent = totals[key].toFixed(1);
        }
      }
    });
  }

  setupSorting(trips) {
    document.querySelectorAll("th.sortable").forEach((th) => {
      th.addEventListener("click", () => {
        const key = th.dataset.key;
        if (key) this.sortTripsBy(trips, key);
      });
    });
  }

  sortTripsBy(data, key) {
    const asc = this.currentSort.key === key ? !this.currentSort.asc : true;
    data.sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];

      // IDの場合は数値として比較
      if (key === 'id') {
        const aNum = parseInt(aVal, 10);
        const bNum = parseInt(bVal, 10);
        return asc ? aNum - bNum : bNum - aNum;
      }

      // 数値項目の場合はfloatとして比較
      if (this.costKeys.includes(key) || key === 'distance') {
        const aNum = parseFloat(aVal) || 0;
        const bNum = parseFloat(bVal) || 0;
        return asc ? aNum - bNum : bNum - aNum;
      }

      // その他の列は文字列として比較
      return asc
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
    this.currentSort = { key, asc };
    this.renderTable(data);
    this.updateSortIcons(key, asc);
  }

  updateSortIcons(key, asc) {
    document.querySelectorAll("th.sortable").forEach((th) => {
      const icon = th.querySelector(".sort-icon");
      if (icon) {
        icon.textContent = th.dataset.key === key ? (asc ? "↑" : "↓") : "↕";
      }
    });
  }

  formatValue(val) {
    if (typeof val === "number") {
      return val.toFixed(0);
    }
    return val;
  }

  createCollapsibleCell(text) {
    const td = document.createElement("td");
    td.style.verticalAlign = 'top';
    
    if (text) {
      const div = document.createElement("div");
      div.className = "collapsible-content";
      
      const lines = text.split('\n');
      lines.forEach(line => {
        if (line.trim()) {  // 空行は無視
          const lineDiv = document.createElement("div");
          lineDiv.textContent = line.trim();
          div.appendChild(lineDiv);
        }
      });
      
      // 5行以上の場合はスクロール可能なコンテナに
      if (lines.length > 5) {
        const container = document.createElement("div");
        container.className = "scrollable-container";
        container.appendChild(div);
        td.appendChild(container);
      } else {
        td.appendChild(div);
      }
    }
    return td;
  }
}

const summaryTable = new SummaryTable();
summaryTable.initialize();
  