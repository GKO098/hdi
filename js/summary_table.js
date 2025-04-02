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
          if (row[key]) {
            // 改行コードを <br> に変換
            converted[key] = row[key].replace(/\r?\n/g, "<br>");
          } else {
            converted[key] = ""; // nullやundefinedも空文字に
          }
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

  let totalCost = 0;
  let totalDistance = 0;

  const collapsibleKeys = [
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
      } else if (
        key.startsWith("cost_") ||
        key === "cost_total" ||
        key === "distance"
      ) {
        const td = document.createElement("td");
        const value = parseFloat(trip[key]) || 0;

        if (key === "cost_total") {
          td.innerHTML = `<strong>${value.toLocaleString()}</strong>`;
          totalCost += value;
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

  document.getElementById("total-cost").textContent =
    totalCost.toFixed(1) + " 円";
  document.getElementById("total-distance").textContent =
    totalDistance.toFixed(1) + " km";
}

// 🎥 埋め込み生成
function getEmbedHTML(url) {
  if (!url || typeof url !== "string") return "";

  if (url.includes("youtube.com") || url.includes("youtu.be")) {
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

  // ✅ 改行を分割しつつ、空行は除去
  const raw = (text || "").trim(); // ← 末尾・先頭の空行を削除
  const lines = raw.split(/\r?\n/).filter((line) => line.trim() !== ""); // ← 空行は除外

  const isOverflowing = lines.length > 5;

  // 表示する行だけHTMLに変換
  const visibleLines = isOverflowing ? lines.slice(0, 5) : lines;
  content.innerHTML = visibleLines.map((line) => escapeHtml(line)).join("<br>");
  wrapper.appendChild(content);

  if (isOverflowing) {
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "toggle-note-btn";
    toggleBtn.textContent = "▼ もっと見る";

    toggleBtn.addEventListener("click", () => {
      const expanded = content.classList.toggle("expanded");
      toggleBtn.textContent = expanded ? "▲ 閉じる" : "▼ もっと見る";
      content.innerHTML = (expanded ? lines : lines.slice(0, 5))
        .map((line) => escapeHtml(line))
        .join("<br>");
    });

    wrapper.appendChild(toggleBtn);
  }

  td.appendChild(wrapper);
  return td;
}
