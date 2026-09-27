// add-product.js (admin)
// Paginascript voor admin/add-product.html.

import { getProducts, setProducts } from "../js/storage.js";
import { validateProduct } from "../js/validate.js";

document.getElementById("preview-btn").addEventListener("click", () => {
  showPreview(document.getElementById("afbeelding").value.trim());
});

document.getElementById("add-product-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const naam = document.getElementById("naam").value.trim();
  const prijs = document.getElementById("prijs").value.trim();
  const afbeelding = document.getElementById("afbeelding").value.trim();

  const errors = validateProduct({ naam, prijs, afbeelding });
  showErrors(errors);

  if (Object.keys(errors).length > 0) {
    return;
  }

  const products = getProducts();
  const nextId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 0;

  products.push({
    id: nextId,
    naam,
    prijs: Number(prijs),
    afbeelding,
  });

  setProducts(products);
  window.location.href = "products.html";
});

function showPreview(url) {
  const preview = document.getElementById("preview-img");
  if (url) {
    preview.src = url;
    preview.hidden = false;
  } else {
    preview.hidden = true;
  }
}

function showErrors(errors) {
  document.querySelectorAll(".error-message").forEach((el) => {
    el.textContent = "";
  });

  Object.entries(errors).forEach(([field, message]) => {
    const el = document.getElementById(`${field}-error`);
    if (el) {
      el.textContent = message;
    }
  });
}
