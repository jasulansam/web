# AI assistance log

## 2026-11-13 — final project repairs and demo account

Tool: OpenAI Codex. The student reported updated teacher permission for AI-written code and requested collaborative implementation. This entry records assistance, not an independently written student contribution.

Requests discussed: explain the final criteria; inspect the repository; move the basket to the top; reduce repeated 2GIS links; avoid dead controls; accept Kazakhstan phone formats beginning with 7 or 8; add a browser-only registration/login/logout demonstration.

AI-assisted changes: header basket, corrected internal anchor, reduced duplicate directions links, missing form descriptions, phone/name validation, honest demo order feedback, storage failure feedback, basket limit behavior and keyboard focus, account page and script, and verification scripts.

Account boundary: one account in this browser, no server and no verified identity. Passwords are not stored as plaintext; a random salt and PBKDF2 digest are saved locally. This is still a demonstration, not production authentication. The student must understand and defend the implementation.

Verification performed: JavaScript syntax; browser scenarios in Chromium and Firefox; emulated viewport checks. A physical phone and live teacher defense have not been verified. Earlier AI use is not reconstructed by this entry and must be added by the students from their records.

Follow-up requests: show login first with a small registration link; remove repeated demo explanations; remove misleading link-like styling from the breakfast offer. Checkout remains available without signing in. Concise local-storage and confirmation wording remains where relevant.

Follow-up: implemented My orders history, order detail snapshots, previous single-order compatibility, explicit browser-local persistence, and tests for reload and storage errors.

Order history now appears inside Account, also available to guests. Old orders.html links redirect to Account and preserve the selected order.

Visual repair: consistent responsive navigation, labelled basket icon with count, offcanvas checkout, visible category controls, consistent forms and account links. Back-to-top is shown only after scrolling. User explicitly requested visual refinement and rejected the circular basket action.

Order history visibility now requires the browser account to be signed in. Logout clears rendered order details immediately; sign-in restores saved history. Guest checkout remains available. This is a client-side demo visibility rule.

Navigation repair: consistent main top spacing, reserved scrollbar space, fixed basket action width, cached mobile navigation reset, and basket refresh on browser back/forward and cross-tab storage updates. Added tests navigating through actual page links at mobile and desktop widths.

Order success now closes the basket and shows a dismissible persistent toast with a direct link to the saved order. Save failures remain in the basket.

Feedback: three explicitly labelled illustrative sample reviews, star cards and local user-review persistence. One external 2GIS link opens public feedback; there is no automatic import or publication. Chromium/Firefox checks cover samples, submission, reload, text safety and responsive layout.

Reviews use a manually controlled circular carousel (3/2/1 cards at desktop/tablet/phone widths), with accessible previous/next controls and a View all toggle restoring the full grid. No auto-advance. A newly added review starts the carousel.

Added a WhatsApp contact button beside directions on Home, using the direct wa.me/77018804104 destination from the user-provided link. Opens a chat only; no automated messages.

Added jQuery 3.7.1 (full build) on Feedback at the student request. Carousel clicks use .on(); .stop(true, true) avoids animation queues and .animate({ opacity: 1 }, 240) softly reveals the next cards. Native click fallback keeps reviews usable if the CDN is unavailable. Reduced-motion skips effects. Button press/hover and order notification use small CSS transitions.

Replaced font-dependent review arrow glyphs with centered SVG chevrons to repair misalignment.
