# Coffi Coffee Shop — Assignment 4–5 JavaScript

Introduction to Web Technologies · SE-2537
Students: **Zhaksylyk Adilet** and **Samrat Zhasulan**
Repository: <https://github.com/jasulansam/web>

Coffi is a responsive coffee-shop prototype for students and visitors in Astana. The site helps a visitor compare drinks, prepare a takeaway request, ask for a table and leave feedback. The project continues the accepted `midterm` interface. HTML and CSS stay at that baseline; Assignment 4–5 adds client-side behaviour through the `js/` folder.

## Functional boundary

This is a browser-only demonstration. Cart, booking and feedback data are saved only in the current browser with `localStorage`. No payment, delivery, staff inbox, account or real reservation is created. The confirmation text always says that the action is a demo and gives the visitor the cafe phone number for a real request.

The language switcher is intentionally postponed. The current version stays in English so the team can explain the JavaScript clearly during the defense.

## Functionality Plan

| Page / owner | Visitor goal | Planned function | Expected result |
| --- | --- | --- | --- |
| Menu / Zhasulan | Choose a suitable drink | Show four popular drinks first; search and filter the 20-item catalog by category | Cards and result count update; a clear no-results state appears |
| Menu / Zhasulan | Prepare several drinks | Add, increase, decrease, remove and clear cart lines; calculate quantity and KZT total | One modal contains both the basket and the short order request form |
| Reservations / Adilet | Request a table or study desk | Validate name, email, phone, date, party size, purpose and agreement | Field-level errors focus the first invalid field; valid input gets a local demo reference |
| Feedback / Adilet | Share a useful visit review | Validate rating, visit date and comment length; update a character counter | New review uses the same DOM card renderer as the sample reviews |
| Shared / both | Understand what happened | Shared helpers, accessible status regions and `Math.random()` demo references | Every completed action explains its local prototype boundary |

## JavaScript checklist

- `js/main.js`: shared 20-drink data, DOM helper, money formatter, date helper and demonstration reference generator.
- `js/menu.js`: popular menu cards, search/category filters, empty state, cart calculations and a single basket/order modal.
- `js/booking.js` (lines 1–52): date and field validation, comparison rule for meetings, field-level errors and success state.
- `js/feedback.js` (lines 1–91): review-card renderer, character counter, date/rating/text validation and local success state.
- All scripts use `defer`, `'use strict'`, `const` by default, `let` only for changing cart state, `textContent` for user text and `classList` states.
- No `var`, loose equality, inline handlers, `innerHTML`, `document.write`, server claims, payment flow or copied JavaScript widget is used.

## Pages and assets

- `index.html`: practical home page with hours, address and fast actions.
- `menu.html`: dynamic menu and the combined basket/order modal (created by JavaScript from the existing form).
- `booking.html`: table and workspace request form.
- `about.html`: Coffi story and workspace information.
- `feedback.html`: customer feedback form and local review cards.
- `colophon.html`: technical project information, omitted from visitor navigation.
- `css/bootstrap-custom.css`: unchanged midterm brand correction layer.
- `images/`: project cafe imagery with provenance in `ai-log.md`.
- `assignment3-assets/`: previous assignment evidence retained for reference.

## Sources and real-world boundary

Prices and location were checked against the supplied [Coffi 2GIS listing](https://2gis.kz/astana/geo/70000001093393499). The owner must confirm prices, hours, phone, images and the final ordering channel before using the prototype commercially.

## Verification before submission

1. Run `node --check` for every file in `js/`.
2. Validate all six HTML pages with Nu Html Checker and inspect the stylesheet.
3. Test the four-item popular view, all 20 menu entries, search, category filters, empty state, cart quantity changes and local order request.
4. Test invalid and valid booking and feedback submissions at phone and desktop widths; confirm that the browser console stays clear.
5. Keep the existing `midterm` tag unchanged and record the final Assignment 4–5 commit in the repository history.
