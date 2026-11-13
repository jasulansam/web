# Coffi — Web Technologies final project

Existing semester project: https://github.com/jasulansam/web
Students: Zhaksylyk Adilet and Samrat Zhasulan.

## Local preview

Run `python -m http.server 8765 --bind 127.0.0.1` from this directory, then open http://127.0.0.1:8765/. Use localhost or HTTPS: the demo account requires Web Crypto.

## Pages

- Home: `index.html`.
- Menu: `menu.html`, catalog/search/categories and a basket opened from the top navigation.
- Reservations: `booking.html`, field validation and an unsent request summary.
- Feedback: `feedback.html`, validation and review previews until reload.
- Account: `account.html`, one local demo account, registration/login/logout. The signed-in session lasts in the current tab.
- Shared helpers and catalog: `js/main.js`; styles: `css/bootstrap-custom.css`.

Earlier project documentation assigned Reservations and Feedback to Adilet and Menu to Zhasulan. Git history and actual understanding must substantiate individual contribution. The new changes are AI-assisted; see `ai-log.md`.

## Honest demo boundary

There is no backend, real order, payment, verified identity or confirmed table. Cart/order plans and one demo account use localStorage. Booking saves nothing; feedback previews live in memory. Account sessions use sessionStorage. Only a random salt and PBKDF2 password digest are stored, never the plaintext password; client-side storage is not secure authentication. Use invented details and a disposable demo password.

Phones accept 11 digits beginning with 7 or 8, including `+7 (701) 123-45-67`; 8 is normalized to 7. This validates format, not ownership or existence.

## Verification

See `quality-pass.md` for completed checks and remaining manual checks. Browser regressions are in `tests/`; use an existing Playwright installation through `PLAYWRIGHT_MODULE` if it is not on the Node module path. No package dependency was added.

Do not apply the `final` tag yet: remaining teacher remarks and real-device validation must be completed first.
