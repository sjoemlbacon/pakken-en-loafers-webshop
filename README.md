# Pakken & Loafers Webshop

**Auteur:** Christopher Curial
**Laatst bijgewerkt:** 25 september 2026

Een webshop/bestelapplicatie voor herenmode (pakken, loafers en accessoires),
gebouwd als eindproject voor Bit Academy / NexEd.

## Certificaat

- [ ] Met studiepunten
- [ ] Zonder studiepunten

*(vul aan welke van de twee van toepassing is voordat je inlevert)*

## Over het project

De webshop bestaat uit twee delen:

- **Eindgebruikersgedeelte** (`index.html`): productoverzicht, winkelwagen en
  afrekenen.
- **Admingedeelte** (`admin/`): overzicht van bestellingen en beheer van
  producten (toevoegen, wijzigen, verwijderen, resetten naar de
  oorspronkelijke lijst).

Producten worden bij het eerste bezoek geladen uit `data/products.json`.
Daarna worden producten, de winkelwagen en bestellingen bijgehouden in
`localStorage`, zodat alles behouden blijft na een pagina-refresh.

## Waar het project online te vinden is

*(vul aan zodra je het project naar Netlify hebt gedeployed, bijvoorbeeld:
`https://pakken-en-loafers.netlify.app`)*

## Project lokaal draaien

1. Pak de zip uit naar een map op je computer.
2. Open de map in VS Code (of een andere editor) en start een lokale server
   met de Live Server-extensie (klik met rechts op `index.html` →
   "Open with Live Server"). Dit is nodig omdat de JavaScript-modules en het
   ophalen van `data/products.json` via `fetch()` niet werken als je het
   bestand direct opent (`file://`) — er moet een `http://` server draaien.
3. De winkel opent standaard op `index.html`. Het adminpaneel is te
   bereiken via `admin/index.html`.
4. Er is geen installatie of build-stap nodig: het project gebruikt alleen
   vanilla HTML, CSS en JavaScript (ES-modules), zonder frameworks of
   dependencies.

## Technische opzet

```
webshop/
├── index.html                  eindgebruiker: productoverzicht
├── shopping-cart.html          eindgebruiker: winkelwagen
├── order-confirmation.html     eindgebruiker: bestelbevestiging
├── style.css                   gedeelde stylesheet
├── data/
│   └── products.json           brondata voor producten (min. 5)
├── img/                        productafbeeldingen (.webp, geoptimaliseerd)
├── js/
│   ├── storage.js              alle localStorage lees-/schrijffuncties
│   ├── data.js                 producten laden/resetten uit products.json
│   ├── cart.js                 winkelwagenlogica
│   ├── render.js                prijs-/datumnotatie
│   ├── validate.js             formuliervalidatie (admin)
│   ├── index-page.js           paginascript index.html
│   └── cart-page.js            paginascript shopping-cart.html
└── admin/
    ├── index.html               admin: orderoverzicht
    ├── products.html            admin: productenoverzicht
    ├── add-product.html         admin: product toevoegen
    ├── edit-product.html        admin: product wijzigen
    ├── orders.js
    ├── products.js
    ├── add-product.js
    └── edit-product.js
```

## Toegepaste technieken

- **Objects**: elk product, elke winkelwagenregel en elke order is een
  object (zie `js/storage.js`, `data/products.json`).
- **Functies**: alle logica is opgesplitst in kleine, herbruikbare functies
  per bestand (bijv. `addToCart`, `getCartDetails`, `validateProduct`).
- **Arrays**: producten, winkelwagen en orders worden als arrays van
  objecten opgeslagen en bewerkt met `.map()`, `.filter()`, `.find()`,
  `.reduce()`.
- **localStorage**: producten, winkelwagen en orders worden hierin
  opgeslagen (zie `js/storage.js`).
- **`let` en `const`**: `const` voor waarden die niet opnieuw worden
  toegewezen (bijv. geïmporteerde functies, DOM-referenties), `let` waar
  een waarde wel verandert (bijv. tellers, totalen).

## Nakijkcriteria

- [x] De HTML- en CSS-code is lokaal gevalideerd met `html-validate` en
      `stylelint` (standard config) en geeft geen fouten. *(Controleer ook
      zelf op validator.w3.org/nu en jigsaw.w3.org/css-validator, aangezien
      deze omgeving die sites zelf niet kan bereiken.)*
- [x] De bestandsgrootte van de afbeeldingen is geschikt voor het web: alle
      productafbeeldingen zijn `.webp`, 400×400px en onder de 2,5 KB per
      stuk. *(Dit zijn placeholder-afbeeldingen — vervang ze door eigen
      productfoto's, ook geëxporteerd als geoptimaliseerd `.webp`/`.jpg`.)*
- [x] Het project heeft een duidelijke mappenstructuur: `js/` (gedeelde
      logica), `admin/` (admingedeelte + eigen scripts), `data/`
      (brondata), `img/` (afbeeldingen), zie structuur hierboven.
- [x] Aan alle functionele eisen is voldaan: productoverzicht, winkelwagen,
      afrekenen met bevestiging, admin orderoverzicht, producten
      toevoegen/wijzigen/verwijderen/resetten, formuliervalidatie, en
      opslag van producten/winkelwagen/orders in localStorage (zie
      "Functionaliteiten" hieronder).
- [x] Het project is getest en volledig werkend bevonden: de volledige
      flow (product toevoegen → winkelwagen → afrekenen → bevestiging →
      order zichtbaar in admin → product toevoegen/wijzigen/verwijderen/
      resetten met validatie) is doorlopen met Playwright in Chromium,
      zonder JavaScript-fouten.

## Functionaliteiten - eindgebruiker

- Overzicht van alle producten (naam, afbeelding, prijs).
- Product toevoegen aan de winkelwagen; de knop toont daarna het aantal in
  de winkelwagen.
- Winkelwagen-icoon in de header toont een indicator zodra er items in de
  winkelwagen zitten.
- Winkelwagenpagina met aantal, prijs per stuk, subtotaal en totaalbedrag.
- Winkelwagen legen.
- Afrekenen met bevestigingspagina; de bestelling wordt opgeslagen.

## Functionaliteiten - admin

- Orderoverzicht: ID, totaalbedrag, datum en tijd.
- Productenoverzicht met Edit/Remove per product.
- Product toevoegen/wijzigen via een formulier met validatie en
  afbeeldings-preview.
- "Reset producten": haalt de oorspronkelijke lijst opnieuw op uit
  `data/products.json`.

## Datamodel (localStorage)

```js
// products
{
  id: 0,
  naam: "Marineblauw Pak",
  prijs: 349.00,
  afbeelding: "/img/pak-marineblauw.webp"
}

// cart item
{
  productId: 2,
  aantal: 1
}

// order
{
  id: 0,
  totaal: 478.95,
  datumTijd: "2026-09-25T13:20:00.000Z",
  items: [ /* winkelwagenregels op het moment van bestellen */ ]
}
```
