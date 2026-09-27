// index-page.js
// Paginascript voor index.html: toont het productoverzicht en houdt de
// winkelwagen-badge bij.

import { ensureProducts } from "./data.js";
import { getProducts } from "./storage.js";
import { addToCart, getCartCount, getCartDetails } from "./cart.js";
import { formatPrijs } from "./render.js";

async function init() {
  await ensureProducts("data/products.json");
  renderProducts();
  updateCartBadge();
}

function renderProducts() {
  const products = getProducts();
  const cartDetails = getCartDetails();
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";

  products.forEach((product) => {
    const inCart = cartDetails.find((item) => item.productId === product.id);

    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.afbeelding}" alt="${product.naam}">
      <h2>${product.naam}</h2>
      <p class="price">${formatPrijs(product.prijs)}</p>
      <button type="button" class="add-to-cart-btn" data-id="${product.id}">
        ${inCart ? `${inCart.aantal} in de winkelwagen` : "Voeg toe aan winkelwagen"}
      </button>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);
      addToCart(id, 1);
      renderProducts();
      updateCartBadge();
    });
  });
}

function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  const aantal = getCartCount();
  badge.hidden = aantal === 0;
}

init();
