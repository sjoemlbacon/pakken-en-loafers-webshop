// storage.js
// Alle directe localStorage lees- en schrijffuncties staan hier gebundeld,
// zodat de rest van de applicatie nooit rechtstreeks met localStorage praat.

const PRODUCTS_KEY = "products";
const CART_KEY = "cart";
const ORDERS_KEY = "orders";

export function getProducts() {
  const raw = localStorage.getItem(PRODUCTS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function setProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function getCart() {
  const raw = localStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function setCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function getOrders() {
  const raw = localStorage.getItem(ORDERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function setOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}
