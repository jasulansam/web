# Final project verification — 2026-11-13

## Completed

- Syntax checks for all five JavaScript files.
- Chromium: basket limit, local order result, invalid and formatted phone numbers, Kazakh name, booking summary, feedback preview, mobile basket visibility.
- Chromium and Firefox: demo registration, reload persistence, logout, incorrect password, keyboard login, and account widths 375/768/1440.
- Password not present as plaintext in stored account.

## Repairs

- Basket moved from the menu hero into the top navigation, visible outside mobile collapse.
- Redundant body links to 2GIS removed; home retains header and address directions links.
- Broken `order-builder` anchor corrected.
- Missing form explanation references restored; main page headings corrected.
- Phone accepts formatted +7/7/8 with exactly 11 digits; names support Kazakh letters.
- Payment/order claim replaced with an explicit local-demo result.
- Cart limit feedback and storage errors handled; keyboard focus retained after cart changes.
- Demo account added at the student's reported teacher request.

## Still required before final submission

- Test on a physical phone; emulation is not a substitute.
- Run current W3C validation and review image sizes; this change does not certify those requirements.
- Confirm remaining endterm remarks, review code line by line, and update earlier AI-log entries.
- Review Git authorship and individual contributions; tag final only after acceptance.

Follow-up verification: login-first/register toggle and logout tested in Chromium and Firefox; all five pages checked at 320/375/768/1440 widths with no runtime errors or failed loaded resources. Breakfast offer text no longer mimics links.

Order history: verified multiple orders, reload, direct detail link, guest access, text safety, small-screen layout and failed storage writes in Chromium and Firefox.

Order history now appears inside Account, also available to guests. Old orders.html links redirect to Account and preserve the selected order.

Visual verification: all five pages at 320/375/768/1024/1440px in Chromium and Firefox; mobile collapse and direct basket links; cart, form and history scenarios repeated after the offcanvas change.

Order history visibility now requires the browser account to be signed in. Logout clears rendered order details immediately; sign-in restores saved history. Guest checkout remains available. This is a client-side demo visibility rule.

Navigation repair: consistent main top spacing, reserved scrollbar space, fixed basket action width, cached mobile navigation reset, and basket refresh on browser back/forward and cross-tab storage updates. Added tests navigating through actual page links at mobile and desktop widths.

Order success now closes the basket and shows a dismissible persistent toast with a direct link to the saved order. Save failures remain in the basket.

Feedback: three explicitly labelled illustrative sample reviews, star cards and local user-review persistence. One external 2GIS link opens public feedback; there is no automatic import or publication. Chromium/Firefox checks cover samples, submission, reload, text safety and responsive layout.

Reviews use a manually controlled circular carousel (3/2/1 cards at desktop/tablet/phone widths), with accessible previous/next controls and a View all toggle restoring the full grid. No auto-advance. A newly added review starts the carousel.

Added jQuery 3.7.1 (full build) on Feedback at the student request. Carousel clicks use .on(); .stop(true, true) avoids animation queues and .animate({ opacity: 1 }, 240) softly reveals the next cards. Native click fallback keeps reviews usable if the CDN is unavailable. Reduced-motion skips effects. Button press/hover and order notification use small CSS transitions.
