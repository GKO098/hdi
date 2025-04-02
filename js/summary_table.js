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

  data.forEach((trip) => {
    const tr = document.createElement("tr");

    const noteWrapper = document.createElement("div");
    noteWrapper.className = "note-wrapper";

    const noteContent = document.createElement("div");
    noteContent.className = "note-content";
    noteContent.innerHTML = (trip.note || "").replace(/\r?\n/g, "<br>");

    const noteTd = document.createElement("td");
    noteTd.appendChild(noteContent);
    tr.appendChild(noteTd); // ← テーブル行に追加

    noteTd.innerHTML = "";
    noteTd.appendChild(noteWrapper);

    tr.innerHTML = `
      <td>${trip.date}</td>
      <td>${trip.car_model}</td>
      <td>${trip.weather}</td>
      <td>${trip.upload_date}</td>
      <td>${trip.video_title}</td>
      <td>${getEmbedHTML(trip.niconico)}</td>
      <td>${getEmbedHTML(trip.youtube)}</td>
      <td>${trip.series}</td>
      <td>${trip.summary}</td>
      <td>${trip.itinerary}</td>
      <td>${trip.event}</td>
      <td>${trip.participants}</td>
      <td>${trip.places}</td>
      <td>${(parseFloat(trip.distance) || 0).toFixed(1)}</td>
      <td>${(parseFloat(trip.cost_meal) || 0).toFixed(0)}</td>
      <td>${(parseFloat(trip.cost_toll_road) || 0).toFixed(0)}</td>
      <td>${(parseFloat(trip.cost_fuel) || 0).toFixed(0)}</td>
      <td>${(parseFloat(trip.cost_rental_car) || 0).toFixed(0)}</td>
      <td>${(parseFloat(trip.cost_entrance_fee) || 0).toFixed(0)}</td>
      <td>${(parseFloat(trip.cost_parking) || 0).toFixed(0)}</td>
      <td>${(parseFloat(trip.cost_hotel) || 0).toFixed(0)}</td>
      <td>${(parseFloat(trip.cost_plane) || 0).toFixed(0)}</td>
      <td>${(parseFloat(trip.cost_train) || 0).toFixed(0)}</td>
      <td>${(parseFloat(trip.cost_bus) || 0).toFixed(0)}</td>
      <td>${(parseFloat(trip.cost_ship) || 0).toFixed(0)}</td>
      <td>${(parseFloat(trip.cost_equipment) || 0).toFixed(0)}</td>
      <td>${(parseFloat(trip.cost_other) || 0).toFixed(0)}</td>
      <td><strong>${(
        parseFloat(trip.cost_total) || 0
      ).toLocaleString()}</strong></td>
      <td>${trip.material}</td>
      <td>${trip.reference}</td>
      <td>${trip.advertiser}</td>
      <td>${trip.topics}</td>`;

    tbody.appendChild(tr);

    totalCost += parseFloat(trip.cost) || 0;
    totalDistance += parseFloat(trip.distance) || 0;
  });

  document.getElementById("total-cost").textContent =
    totalCost.toFixed(1) + " 円";
  document.getElementById("total-distance").textContent =
    totalDistance.toFixed(1) + " kZm";
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
