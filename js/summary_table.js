let currentSort = {
  key: null,
  asc: true,
};

// 📦 CSV読み込み（PapaParse使用）
Papa.parse("data/summary_table.csv", {
  header: true,
  download: true,
  complete: function (results) {
    const trips = results.data
      .filter((row) => row.date) // 空行除外
      .map((row) => {
        const converted = {};
        for (const key in row) {
          converted[key] = row[key];
        }
        return converted;
      });

    renderTable(trips);
    setupSorting(trips);
  },
});

// 🧰 表描画
function renderTable(data) {
  const tbody = document.querySelector("#trip-table tbody");
  tbody.innerHTML = "";

  let totalCost_meal = 0;
  let totalCost_toll_road = 0;
  let totalCost_fuel = 0;
  let totalCost_rental_car = 0;
  let totalCost_entrance_fee = 0;
  let totalCost_parking = 0;
  let totalCost_hotel = 0;
  let totalCost_plane = 0;
  let totalCost_train = 0;
  let totalCost_bus = 0;
  let totalCost_ship = 0;
  let totalCost_equipment = 0;
  let totalCost_other = 0;
  let totalCost_total = 0;
  let totalDistance = 0;

  const collapsibleKeys = [
    "summary",
    "participants",
    "material",
    "reference",
    "advertiser",
    "topics",
    "places",
  ];
  const keys = [
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
    "material",
    "reference",
    "advertiser",
    "topics",
  ];

  data.forEach((trip) => {
    const tr = document.createElement("tr");

    keys.forEach((key) => {
      let cell;

      if (collapsibleKeys.includes(key)) {
        cell = createCollapsibleCell(trip[key]);
      } else if (key === "niconico" || key === "youtube") {
        const td = document.createElement("td");
        td.innerHTML = getEmbedHTML(trip[key]);
        cell = td;
      } else if (key === "itinerary") {
        const td = document.createElement("td");
        // もしあればリンクを生成
        const url = trip[key];
        if (url) {
          const a = document.createElement("a");
          a.href = url;
          a.textContent = "しおり";
          td.appendChild(a);
        } else {
          td.textContent = "";
        }
        cell = td;
      } else if (
        key.startsWith("cost_") ||
        key === "distance"
      ) {
        const td = document.createElement("td");
        const value = parseFloat(trip[key]) || 0;
        if (key === "cost_total") {
          td.innerHTML = `<strong>${value}</strong>`;
          totalCost_total += value;
        } else if (key === "cost_meal") {
          td.innerHTML = `${value}`;
          totalCost_meal += value;
        } else if (key === "cost_toll_road") {
          td.innerHTML = `${value}`;
          totalCost_toll_road += value;
        } else if (key === "cost_fuel") {
          td.innerHTML = `${value}`;
          totalCost_fuel += value;
        } else if (key === "cost_rental_car") {
          td.innerHTML = `${value}`;
          totalCost_rental_car += value;
        } else if (key === "cost_entrance_fee") {
          td.innerHTML = `${value}`;
          totalCost_entrance_fee += value;
        } else if (key === "cost_parking") {
          td.innerHTML = `${value}`;
          totalCost_parking += value;
        } else if (key === "cost_hotel") {
          td.innerHTML = `${value}`;
          totalCost_hotel += value;
        } else if (key === "cost_plane") {
          td.innerHTML = `${value}`;
          totalCost_plane += value;
        } else if (key === "cost_train") {
          td.innerHTML = `${value}`;
          totalCost_train += value;
        } else if (key === "cost_bus") {
          td.innerHTML = `${value}`;
          totalCost_bus += value;
        } else if (key === "cost_ship") {
          td.innerHTML = `${value}`;
          totalCost_ship += value;
        } else if (key === "cost_equipment") {
          td.innerHTML = `${value}`;
          totalCost_equipment += value;
        } else if (key === "cost_other") {
          td.innerHTML = `${value}`;
          totalCost_other += value;
        } else if (key === "cost_total") {
          td.innerHTML = `${value}`;
          totalCost_total += value;
        } else if (key === "distance") {
          td.textContent = value.toFixed(1);
          totalDistance += value;
        } else {
          td.textContent = value.toFixed(0);
        }
        cell = td;
      } else {
        const td = document.createElement("td");
        td.textContent = trip[key] || "";
        cell = td;
      }

      tr.appendChild(cell);
    });

    tbody.appendChild(tr);
  });
  document.getElementById("total-distance").textContent =
    totalDistance.toFixed(1) + " km";
  document.getElementById("total-cost_meal").textContent =
    totalCost_meal.toFixed(1) + "円";
    console.log(totalCost_meal.toFixed(1) + "円");
  document.getElementById("total-cost_toll_road").textContent =
    totalCost_toll_road.toFixed(1) + "円";
  document.getElementById("total-cost_fuel").textContent =
    totalCost_fuel.toFixed(1) + "円";
  document.getElementById("total-cost_rental_car").textContent =
    totalCost_rental_car.toFixed(1) + "円";
  document.getElementById("total-cost_entrance_fee").textContent =
    totalCost_entrance_fee.toFixed(1) + "円";
  document.getElementById("total-cost_parking").textContent =
    totalCost_parking.toFixed(1) + "円";
  document.getElementById("total-cost_hotel").textContent =
    totalCost_hotel.toFixed(1) + "円";
  document.getElementById("total-cost_plane").textContent =
    totalCost_plane.toFixed(1) + "円";
  document.getElementById("total-cost_train").textContent =
    totalCost_train.toFixed(1) + "円";
  document.getElementById("total-cost_bus").textContent =
    totalCost_bus.toFixed(1) + "円";
  document.getElementById("total-cost_ship").textContent =
    totalCost_ship.toFixed(1) + "円";
  document.getElementById("total-cost_equipment").textContent =
    totalCost_equipment.toFixed(1) + "円";
  document.getElementById("total-cost_other").textContent =
    totalCost_other.toFixed(1) + "円";
  document.getElementById("total-cost_total").innerHTML =
  "<strong>" + totalCost_total.toFixed(1) + "円</strong>";
    // ソートアイコン初期化
  updateSortIcons(null, true);
}

// 🎥 埋め込み生成
function getEmbedHTML(url) {
  if (!url || typeof url !== "string") return "";

  if (url.includes("youtube.com")) {
    const videoId = url.includes("v=")
      ? url.split("v=")[1].split("&")[0]
      : url.split("/").pop();
    return `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
  } else if (url.includes("nicovideo.jp")) {
    const id = url.split("/").pop();
    return `<iframe src="https://embed.nicovideo.jp/watch/${id}" frameborder="0" allowfullscreen></iframe>`;
  } else {
    return `<a href="${url}" target="_blank">動画リンク</a>`;
  }
}

// 🔁 ソートイベント登録
function setupSorting(trips) {
  document.querySelectorAll("th.sortable").forEach((th) => {
    th.addEventListener("click", () => {
      const key = th.dataset.key;
      if (key) sortTripsBy(trips, key);
    });
  });
}

// 🔃 ソート処理本体
function sortTripsBy(data, key) {
  const sorted = [...data];
  const asc = currentSort.key === key ? !currentSort.asc : true;
  currentSort = { key, asc };

  sorted.sort((a, b) => {
    let valA, valB;

    if (key === "cost") {
      valA = parseFloat(a.cost);
      valB = parseFloat(b.cost);
    } else if (key === "date") {
      valA = new Date(a.date);
      valB = new Date(b.date);
    } else {
      valA = a[key] ?? "";
      valB = b[key] ?? "";
    }

    return asc ? (valA > valB ? 1 : -1) : valA < valB ? 1 : -1;
  });

  renderTable(sorted);
  updateSortIcons(key, asc);
}

// ⬆⬇ アイコン表示切替
function updateSortIcons(activeKey, asc) {
  document.querySelectorAll("th.sortable").forEach((th) => {
    th.classList.remove("sorted-asc", "sorted-desc");
    if (th.dataset.key === activeKey) {
      th.classList.add(asc ? "sorted-asc" : "sorted-desc");
    }
  });
}
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function createCollapsibleCell(text) {
  const td = document.createElement("td");
  const wrapper = document.createElement("div");
  wrapper.className = "note-wrapper";

  const content = document.createElement("div");
  content.className = "note-content";

  const raw = (text || "").trim();
  const lines = raw.split(/\r?\n/).filter((line) => line.trim() !== "");

  // 全行描画しておく（CSSで折りたたむ）
  content.innerHTML = lines.map((line) => escapeHtml(line)).join("<br>\n");
  wrapper.appendChild(content);

  td.appendChild(wrapper);
  return td;
}
