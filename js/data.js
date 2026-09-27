// data.js
// Verantwoordelijk voor het ophalen van productdata uit het JSON-bestand
// en het (opnieuw) vullen van localStorage daarmee.

import { getProducts, setProducts } from "./storage.js";

export async function loadProductsFromJson(jsonPath) {
  const response = await fetch(jsonPath);
  if (!response.ok) {
    throw new Error(`Kon producten niet laden uit ${jsonPath}`);
  }
  const products = await response.json();
  setProducts(products);
  return products;
}

// Zorgt dat er producten in localStorage staan. Als er al producten zijn
// (bijvoorbeeld na eerdere admin-wijzigingen) worden die niet overschreven.
export async function ensureProducts(jsonPath) {
  const existing = getProducts();
  if (existing && existing.length > 0) {
    return existing;
  }
  return loadProductsFromJson(jsonPath);
}
