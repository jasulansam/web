# Coffi Coffee Shop

Introduction to Web Technologies | SE-2537 | Midterm Project

Zhaksylyk Adilet and Samrat Zhasulan

Coffi is a responsive coffee shop website for visitors who want to choose a drink, plan a takeaway
order, reserve a table or find the cafe in Astana. The site uses Bootstrap 5.3.8 plus a small brand
stylesheet. Open `index.html` in a browser; the Bootstrap CDN needs internet access.

## Visitor journeys

1. **Find and visit:** start on Home, read today's hours, open the 2GIS directions link and use the
   phone or email link for a practical question.
2. **Choose and plan an order:** open Menu, compare drink sizes and prices, complete the order plan,
   see the calculated total and save the plan locally. Call Coffi to confirm availability and pickup.
3. **Reserve a workspace:** open Reservations, choose a date, party size and seating zone, save the
   request locally and call Coffi to confirm the table.

## Pages and files

- `index.html`: hero, practical visit details and the three fastest actions.
- `menu.html`: prices, category anchors, cafe photography and the order planner.
- `booking.html`: table and study workspace request form with a local confirmation state.
- `about.html`: community, workspace and coffee story.
- `feedback.html`: customer experience form with a local saved state.
- `colophon.html`: technical project page, omitted from visitor navigation.
- `css/bootstrap-custom.css`: dark coffee-bar visual system and small brand corrections.
- `js/coffi.js`: order total, local drafts and form confirmation messages.
- `js/i18n.js`: saved EN/RU/KZ interface language switcher and future contact placeholders.
- `images/`: local and generated project photographs used by the pages; provenance is recorded in `ai-log.md`.
- `DESIGN.md`: product, visual and interaction decisions for future work.
- `quality-pass.md`: manual and automated checks before the midterm freeze.
- `assignment3-assets/`: screenshots, validation evidence and menu source notes.
- `bootstrap-removals.md`: old CSS rules and their Bootstrap replacements.
- `ai-log.md`: assistance and image provenance disclosure.

## Functional boundary

Order and reservation forms work on the client side: they validate native fields, calculate the order
total and save a draft in `localStorage`. No payment, delivery system or staff inbox is connected.
The page tells the visitor to call Coffi for final confirmation, so the static prototype does not
promise a reservation or payment it cannot complete.

The interface can be switched between English, Russian and Kazakh. WhatsApp and Instagram buttons are
prepared as owner-controlled placeholders; they show a connection note until official links are supplied.

## Content and sources

Drink prices are selected from [Coffi on 2GIS](https://2gis.kz/astana/firm/70000001093393499/tab/prices)
and should be rechecked by the owner before launch. The address and directions use the supplied
[2GIS location](https://2gis.kz/astana/geo/70000001093393499). Images in the active site are local
project and generated cafe photographs; generated visuals are clearly documented and are
conceptual until the cafe owner approves final production photography.

## Checks before submission

- Validate all six HTML pages and the stylesheet with the local Nu Html Checker.
- Open the site at roughly 375, 768 and 1440 px and check that the navbar, order panel and forms do
  not overflow horizontally.
- Click every internal link, 2GIS link, phone link and email link.
- Test the order total, reset control and saved confirmation, then test the booking and feedback
  confirmation states.
- Record the final quality-pass findings and freeze the accepted state with the Git tag `midterm`.
