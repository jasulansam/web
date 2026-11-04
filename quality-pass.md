# Assignment 4–5 quality pass

Checked on 24 October 2026 after the JavaScript scope was reset to the accepted `midterm` interface.

## Current checks

- HTML pages keep the midterm structure and only add deferred script links.
- The correction stylesheet is unchanged from the midterm baseline.
- Menu items are rendered from eight real project objects; search, category, sort, reset and no-results states are available.
- The basket supports add, increase, decrease, remove, clear, quantity totals and KZT totals, then copies a summary into the existing order plan.
- Booking validates contact fields, date, party size, purpose and agreement with field-level errors and a local demo reference.
- Feedback validates visit date, rating and comment length, shows a character counter and renders sample/new review cards with one function.
- No server, account, payment, delivery, real reservation or language switcher is claimed.

## Verification commands

- `node --check js/main.js`
- `node --check js/menu.js`
- `node --check js/booking.js`
- `node --check js/feedback.js`
- Nu Html Checker for all six pages
- `git diff --check`

## Manual browser pass

Open Menu, search for `latte`, change category and sort, reset the controls, add two sizes, change quantity, clear the basket and copy the summary into the order plan. Submit an invalid and a valid booking. Submit an invalid and a valid review and confirm the character counter and review card. Repeat at approximately 375px, 768px and 1440px widths.

## Before submission

1. Re-read each JavaScript file and practise explaining its main functions.
2. Confirm the owner will replace demo contacts, prices, images and local-only actions before a real launch.
3. Keep `midterm` unchanged and use the Assignment 4–5 commit as the current submission state.
