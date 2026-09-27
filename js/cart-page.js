// cart-page.js
// Paginascript voor shopping-cart.html: toont de winkelwagen-inhoud en
// verzorgt het afrekenen (aanmaken van een order).

import { ensureProducts } from "./data.js";
import { getCartDetails, clearCart } from "./cart.js";
import { getOrders, setOrders } from "./storage.js";
import { formatPrijs } from "./render.js";

async function init() {
  await ensureProducts("data/products.json");
  renderCart();

  document.getElementById("clear-cart-btn").addEventListener("click", () => {
    clearCart();
    renderCart();
  });

  document.getElementById("checkout-btn").addEventListener("click", checkout);
}

function renderCart() {
  const items = getCartDetails();
  const tbody = document.getElementById("cart-items");
  const emptyMessage = document.getElementById("empty-cart-message");
  const checkoutBtn = document.getElementById("checkout-btn");

  tbody.innerHTML = "";
  let totaal = 0;

  items.forEach((item) => {
    totaal += item.subtotaal;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.naam}</td>
      <td>${item.aantal}</td>
      <td>${formatPrijs(item.prijs)}</td>
      <td>${formatPrijs(item.subtotaal)}</td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById("cart-total").textContent = formatPrijs(totaal);
  emptyMessage.hidden = items.length > 0;
  checkoutBtn.disabled = items.length === 0;
}

function checkout() {
  const items = getCartDetails();
  if (items.length === 0) {
    return;
  }

  const totaal = items.reduce((som, item) => som + item.subtotaal, 0);
  const orders = getOrders();
  const nextId = orders.length > 0 ? Math.max(...orders.map((order) => order.id)) + 1 : 0;

  const nieuweOrder = {
    id: nextId,
    totaal,
    datumTijd: new Date().toISOString(),
    items,
  };

  orders.push(nieuweOrder);
  setOrders(orders);
  clearCart();

  window.location.href = "order-confirmation.html";
}

init();
