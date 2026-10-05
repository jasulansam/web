# Midterm quality pass

Checked on 5 October 2026 after the Coffi usability redesign.

## Confirmed

- All six HTML pages use the same navigation, footer, Bootstrap version and local stylesheet.
- Internal page links, section anchors, phone links, email links and supplied 2GIS links resolve to real targets.
- The order planner updates size choices, calculates the selected quantity and saves a local draft.
- The menu cart adds all priced menu rows, supports size selection and quantity changes, persists locally and copies a summary into the order-details form.
- Reservation and feedback forms validate native required fields, save local drafts and show an accessible confirmation message.
- The EN/RU/KZ language switcher updates the main navigation, page headings, actions and form controls and keeps the selected language after reload.
- WhatsApp and Instagram controls are owner-controlled placeholders: they show a clear status message without inventing an official destination.
- All active images have descriptive `alt` text; generated cafe visuals are documented in `ai-log.md` and labelled as conceptual project imagery.
- Nu Html Checker reports zero errors and zero warnings for all six HTML pages and `css/bootstrap-custom.css`.
- Prettier formatting and `git diff --check` pass.

## Manual browser check

- Phone-width review: completed on the local Home, Menu, Reservation and Feedback pages; the collapsed navbar, hero actions, order controls and confirmation states were visible.
- Desktop-width review: completed on the local wide viewport; an owner browser pass is still recommended before public launch.
- Language/contact review: completed on Home, Menu, Reservation and Feedback in English, Russian and Kazakh; placeholder contact feedback was confirmed.
- Cart review: completed by adding fixed-size and barista-confirmed-size drinks, changing quantities, clearing the cart and transferring the summary into the local order form.
- Owner verification still needed: current hours, prices, phone, email, Instagram link and the real ordering channel.

## Before freeze

1. Open every page at phone and desktop widths.
2. Click every navigation and action link.
3. Confirm the owner-approved content and ordering destination.
4. Create the final Git commit and tag it `midterm`.
