// validate.js
// Formuliervalidatie voor het admin productformulier (toevoegen/wijzigen).

export function validateProduct({ naam, prijs, afbeelding }) {
  const errors = {};

  if (!naam || naam.trim().length === 0) {
    errors.naam = "Naam is verplicht.";
  }

  if (prijs === "" || prijs === null || isNaN(Number(prijs))) {
    errors.prijs = "Prijs moet een getal zijn.";
  } else if (Number(prijs) <= 0) {
    errors.prijs = "Prijs moet groter zijn dan 0.";
  }

  if (!afbeelding || afbeelding.trim().length === 0) {
    errors.afbeelding = "Afbeelding URL is verplicht.";
  }

  return errors;
}
