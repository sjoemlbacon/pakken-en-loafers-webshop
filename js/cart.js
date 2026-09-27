// cart.js
// Alle logica rondom de winkelwagen: toevoegen, verwijderen, legen en
// het berekenen van aantallen/totalen.

import { getCart, setCart, getProducts } from "./storage.js";

export function addToCart(productId, aantal = 1) {
  const cart = getCart();
  const bestaandeRegel = cart.find((item) => item.productId === productId);

  if (bestaandeRegel) {
    bestaandeRegel.aantal += aantal;
  } else {
    cart.push({ productId, aantal });
  }

  setCart(cart);
}

export function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.productId !== productId);
  setCart(cart);
}

export function clearCart() {
  setCart([]);
}

export function getCartCount() {
  return getCart().reduce((totaalAantal, item) => totaalAantal + item.aantal, 0);
}

// Combineert de winkelwagen (productId + aantal) met de actuele productdata,
// zodat pagina's meteen naam, prijs en subtotaal per regel kunnen tonen.
export function getCartDetails() {
  const cart = getCart();
  const products = getProducts();

  return cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    const prijs = product ? product.prijs : 0;

    return {
      productId: item.productId,
      naam: product ? product.naam : "Onbekend product",
      prijs,
      aantal: item.aantal,
      subtotaal: prijs * item.aantal,
    };
  });
}

export function getCartTotal() {
  return getCartDetails().reduce((totaal, item) => totaal + item.subtotaal, 0);
}
