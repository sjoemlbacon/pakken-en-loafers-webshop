// products.js (admin)
// Paginascript voor admin/products.html: toont, verwijdert en reset producten.

import { ensureProducts, loadProductsFromJson } from "../js/data.js";
import { getProducts, setProducts } from "../js/storage.js";
import { formatPrijs } from "../js/render.js";

const PRODUCTS_JSON_PATH = "../data/products.json";

async function init() {
  await ensureProducts(PRODUCTS_JSON_PATH);
  renderTable();

  document.getElementById("reset-btn").addEventListener("click", async () => {
    await loadProductsFromJson(PRODUCTS_JSON_PATH);
    renderTable();
  });
}

function renderTable() {
  const products = getProducts();
  const tbody = document.getElementById("products-body");
  tbody.innerHTML = "";

  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.naam}</td>
      <td>${formatPrijs(product.prijs)}</td>
      <td class="url-cell">${product.afbeelding}</td>
      <td><a href="edit-product.html?id=${product.id}">Edit</a></td>
      <td><a href="#" class="remove-link" data-id="${product.id}">Remove</a></td>
    `;
    tbody.appendChild(row);
  });

  tbody.querySelectorAll(".remove-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const id = Number(link.dataset.id);
      removeProduct(id);
    });
  });
}

function removeProduct(id) {
  const overgeblevenProducten = getProducts().filter((product) => product.id !== id);
  setProducts(overgeblevenProducten);
  renderTable();
}

init();
