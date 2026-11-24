let items = [];

async function loadCatalog() {
  const response = await fetch("./data.json");
  items = await response.json();
  renderCatalog(items);
}

function renderCatalog(list) {
  const grid = document.getElementById("catalogGrid");
  grid.innerHTML = "";

  list.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>Kategori: ${item.category}</p>
      <p>Harga: Rp${item.price.toLocaleString("id-ID")}</p>
    `;
    grid.appendChild(card);
  });
}

function applyFilter() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;

  const filtered = items.filter((item) => {
    const matchName = item.name.toLowerCase().includes(keyword);
    const matchCategory = category === "all" || item.category === category;
    return matchName && matchCategory;
  });

  renderCatalog(filtered);
}

document.getElementById("searchInput").addEventListener("input", applyFilter);
document.getElementById("categoryFilter").addEventListener("change", applyFilter);

loadCatalog();