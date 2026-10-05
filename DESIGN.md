# Design

## Source of truth

- Status: Active
- Last refreshed: 2026-10-05
- Primary product surfaces: Home, menu and order planning, table reservation, about, feedback
- Evidence reviewed: current Coffi HTML pages, `css/bootstrap-custom.css`, Assignment 3 Bootstrap brief, `midterm_project.docx`, existing project photographs, and current 2GIS menu link

## Brand

- Personality: warm, calm and useful; a neighbourhood coffee shop for a quick drink or a focused study session
- Trust signals: clear prices, opening hours, address, phone link, 2GIS directions, ingredient notes and honest form states
- Avoid: decorative clutter, invented social links, fake live availability, unapproved imagery, and long copy before the next action

## Product goals

- Goals: help a visitor decide within 30 seconds, choose a drink, plan an order, reserve a seat, find the cafe and contact the team
- Non-goals: staff dashboards, payments, delivery management or a database before a real backend is introduced
- Success signals: a visitor can complete three clear journeys without dead links or guessing what happens next

## Personas and jobs

- Primary personas: students and remote workers, local residents, and first-time visitors in Astana
- User jobs: find a suitable drink, request a quiet place, check the practical details, and reach Coffi quickly
- Key contexts of use: a phone on the way to the cafe, a laptop during study planning, and a quick desktop menu check

## Information architecture

- Primary navigation: Home, Menu, Reservations, About, Feedback, Find us, language switcher
- Core routes/screens: `index.html`, `menu.html#order-builder`, `booking.html`, `about.html`, `feedback.html`
- Content hierarchy: immediate action and practical facts first, menu and story second, supporting information last

## Design principles

- Put the next useful action beside the information it depends on.
- Treat mobile as the primary ordering and directions context.
- Show limits honestly: a demo form has a visible explanation and a direct phone alternative.
- Tradeoffs: keep the Bootstrap assignment structure and modest stylesheet while adding stronger hierarchy and task-focused sections.

## Visual language

- Color: espresso ink, paper cream, muted sage and a warm amber accent for action and status
- Typography: Georgia for the Coffi wordmark and headings; Arial for readable interface text
- Spacing/layout rhythm: Bootstrap containers, rows, columns and spacing utilities; generous sections and compact action groups
- Shape/radius/elevation: medium rounded cards, restrained borders and soft shadows for interactive groups
- Motion: subtle hover lift only; respect `prefers-reduced-motion`
- Imagery/iconography: warm cafe photography with descriptive alt text and simple inline SVG action icons; generated visuals are documented in the image log and remain conceptual until approved by the cafe owner

## Components

- Existing components to reuse: Bootstrap navbar, collapse, cards, responsive table, forms, buttons, alert and ratio image wrappers
- New/changed components: practical action strip, menu cart, order-planning panel, visit-details card, journey cards, language switcher, future-contact placeholders, confirmation and error containers
- Variants and states: primary, outline, disabled, hidden, active, selected, error and success states for current and future JavaScript
- Token/component ownership: Bootstrap owns layout and component behavior; `bootstrap-custom.css` owns Coffi brand corrections only

## Accessibility

- Target standard: semantic HTML and WCAG-minded defaults for keyboard and mobile use
- Keyboard/focus behavior: native controls, visible Bootstrap focus styles, and labels connected with `for`/`id`
- Contrast/readability: dark ink on cream, restrained muted text, and no text over busy images
- Screen-reader semantics: descriptive headings, landmarks, `aria-live` result containers and useful link names
- Reduced motion and sensory considerations: no essential information depends on hover or animation

## Responsive behavior

- Supported breakpoints/devices: phone around 375px, tablet around 768px and desktop around 1440px
- Layout adaptations: action cards stack on phones, become two columns on tablets and three columns on desktop; forms stack before `lg`
- Touch/hover differences: large tap targets and direct phone/map links; hover is supplementary

## Interaction states

- Loading: future server loading states can reuse the existing `order-status` and `booking-status` hooks
- Empty: empty confirmation/output containers exist where a result will appear
- Error: `is-error` state class and `aria-live` hooks are prepared for validation messages
- Success: `is-success` state class and confirmation containers are prepared for a future response
- Disabled: unavailable server actions stay visibly explained; local planning and form-saving actions remain usable
- Offline/slow network, if applicable: core page content and local images remain readable; external Bootstrap and 2GIS links are clearly separate

## Content voice

- Tone: concise, welcoming and practical
- Terminology: use “order plan”, “reserve a table”, “find us” and “call Coffi” consistently
- Microcopy rules: explain what happens next, name requirements before the field, and avoid promises the static site cannot fulfil

## Implementation constraints

- Framework/styling system: static HTML with Bootstrap 5.3.8 CDN and a small correction stylesheet
- Design-token constraints: preserve Bootstrap utilities; keep custom CSS focused on brand, type and small states
- Performance constraints: reuse local images, avoid new libraries and do not add a carousel or heavy media
- Compatibility constraints: teacher-approved vanilla JavaScript provides local ordering and form feedback; a real backend can replace the local storage layer later
- Test/screenshot expectations: W3C validation, no broken local links or horizontal overflow, and phone/desktop screenshots after the visual refresh

## Open questions

- [ ] Which real ordering channel will the cafe owner use: WhatsApp, a POS link or a backend endpoint? The current cart keeps a local draft and prepares the details for that future channel.
- [ ] Which Instagram URL and current menu should be published after the owner confirms them?
