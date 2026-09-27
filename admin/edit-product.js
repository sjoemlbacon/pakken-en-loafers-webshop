// edit-product.js (admin)
// Paginascript voor admin/edit-product.html?id=...

import { getProducts, setProducts } from "../js/storage.js";
import { validateProduct } from "../js/validate.js";

const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

function init() {
  const product = getProducts().find((p) => p.id === productId);

  if (!product) {
    alert("Product niet gevonden.");
    window.location.href = "products.html";
    return;
  }

  document.getElementById("naam").value = product.naam;
  document.getElementById("prijs").value = product.prijs;
  document.getElementById("afbeelding").value = product.afbeelding;
  showPreview(product.afbeelding);
}

document.getElementById("preview-btn").addEventListener("click", () => {
  showPreview(document.getElementById("afbeelding").value.trim());
});

document.getElementById("edit-product-form").addEventListener("submit", (event) => {
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
  const index = products.findIndex((p) => p.id === productId);
  products[index] = { id: productId, naam, prijs: Number(prijs), afbeelding };

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

init();
