// render.js
// Kleine, herbruikbare weergavehelpers (geen DOM-manipulatie van specifieke
// pagina's, alleen generieke formattering).

export function formatPrijs(bedrag) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(bedrag);
}

export function formatDatumTijd(isoString) {
  return new Date(isoString).toLocaleString("nl-NL");
}
