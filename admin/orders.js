// orders.js (admin)
// Paginascript voor admin/index.html: toont alle geplaatste bestellingen.

import { getOrders } from "../js/storage.js";
import { formatPrijs, formatDatumTijd } from "../js/render.js";

function init() {
  const orders = getOrders();
  const tbody = document.getElementById("orders-body");
  const emptyMessage = document.getElementById("empty-orders-message");

  tbody.innerHTML = "";

  orders.forEach((order) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${formatPrijs(order.totaal)}</td>
      <td>${formatDatumTijd(order.datumTijd)}</td>
    `;
    tbody.appendChild(row);
  });

  emptyMessage.hidden = orders.length > 0;
}

init();
