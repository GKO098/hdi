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
      "participants",
      "material",
      "reference",
      "advertiser",
      "topics",
      "places",
    ];
    this.allKeys = [
      "id",
      "date",
      "car_model",
      "weather",
      "upload_date",
      "video_title",
      "niconico",
      "youtube",
      "series",
      "summary",
      "itinerary",
      "event",
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
      if (this.costKeys.includes(key) || key === "distance") {
        return asc
          ? (parseFloat(aVal) || 0) - (parseFloat(bVal) || 0)
          : (parseFloat(bVal) || 0) - (parseFloat(aVal) || 0);
      }
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
    if (text) {
      const div = document.createElement("div");
      div.className = "collapsible-content";
      div.textContent = text;
      td.appendChild(div);
    }
    return td;
  }
}

const summaryTable = new SummaryTable();
summaryTable.initialize();
  