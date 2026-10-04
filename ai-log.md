# AI assistance log

## 2026-09-20

The following summarizes prompts visible in this task; it does not reconstruct deleted historical logs.

- Asked to inspect Assignment 1, Git history, and Assignment 2 requirements and propose a plan.

- Asked for digital layout sketches to later redraw on paper.

- Delegated the visual design and asked to continue implementation.

- Codex generated digital previews, CSS, HTML attribute changes, this checklist and documentation, and browser screenshots.

This version is an AI-assisted draft. The assignment permits conceptual assistance but prohibits AI-written submission stylesheets and text. It must not be represented as independently student-written work. Student review and live defense remain pending. Paper photographs for booking and feedback were subsequently provided; drawing dates are not visible.

- Follow-up: asked for further improvements. Codex refined float/clear, button hover, technical text wrapping, explanatory comments, and the requirement map; validated CSS with W3C SOAP output.

## 2026-09-21

- Asked Codex to prepare the submission files, PDF and archive. Codex assembled the optional visual PDF, refreshed packaging notes and checked the archive. No authorship, drawing dates or Git history were fabricated.

- Requested publication of the prepared files to the existing repository with the current date, and a minimal PDF containing only both names and the repository URL.

## 2026-09-24

- Assignment 3 was implemented on the existing Coffi pages after reviewing the Bootstrap brief. Bootstrap 5.3.8 CDN links, responsive navbar collapse, containers, rows and columns, utilities, buttons, table styling and responsive form layouts were added.

- Removed the three Assignment 2 personal stylesheets from the active site and documented the replacement mapping in `bootstrap-removals.md`; the remaining correction layer is `css/bootstrap-custom.css`.

- Browser checks covered 375px, 768px and 1440px widths, confirmed no horizontal overflow, and confirmed that the mobile navbar opens. Four screenshots were saved under `assignment3-assets/`.

- The optional colophon page remains in the repository but is not linked in the customer-facing navigation, per the requested presentation choice.

## 2026-09-24 — Visual refinement

- Asked to refine the style and Coffi name treatment and check whether animations are allowed. Codex reread the Assignment 3 brief: own JavaScript is prohibited; the Bootstrap bundle is allowed; CSS animations are not explicitly addressed. No custom animation was added.

- Codex adjusted the brand palette and wordmark, Bootstrap spacing and image classes, active navigation, contrast, and Bootstrap form controls. The correction stylesheet is 38 lines.

## 2026-09-24 — Menu content and imagery

- Asked for a more visual menu with additional information, optionally using 2GIS and generated imagery, while prioritizing Assignment 3 requirements.
- Codex read the live Coffi 2GIS menu (44 items, updated 8 September 2026), transcribed a selected 20 drinks and their size/price variants, preserved the existing menu sections and table, and added Bootstrap photo columns and category anchor links.
- One conceptual orange-coffee image was generated with the built-in image_gen tool and labelled accordingly; the two existing project photographs were retained with accurate illustrative descriptions. The exact image prompt and source details are in assignment3-assets/menu-sources.md.

## 2026-09-27 - Submission cleanup

- Asked for a minimal PDF naming both teammates, SE-2537, the course, Assignment 3, the Coffi project and its GitHub repository.
- Asked to review all code, shorten long comments, format HTML/CSS for readability and remove files not needed for the current assignment.
- Codex backed up the working files, archived old Assignment 1/2 reports and evidence outside the repository, shortened comments and formatted all six pages and the stylesheet. Semantic regression checks confirmed the formatting-only pass preserved content and attributes.
- Follow-up review corrected the technical page's assignment/version information, replaced an unsupported attributed quote with a project concept, and added a responsive lg alignment example. The placeholder technical button was removed; the earlier demo submit buttons were later made locally usable after the owner approved a quality-first redesign.
- All six pages were checked with a locally installed Nu Html Checker. No source files were uploaded to an external validator. The one-page PDF was rendered and visually inspected.
- A fresh browser visual pass remains pending because the browser tool previously blocked local file navigation. Required screenshots from the earlier visual revision are retained and their date is noted in README.

## 2026-10-05 — Midterm usability redesign

- Asked to make Coffi useful for ordering, reservations and visit planning instead of only presenting a menu.
- Chose a dark coffee-bar direction inspired by modern cafe ordering sites: stronger primary actions, practical visit details and a task-focused menu.
- Added a local order planner with size-aware prices, quantity totals and `localStorage` drafts; added local confirmation states for reservation and feedback forms. No payment, delivery or staff inbox is connected.
- Added `DESIGN.md`, three visitor journeys and prepared JavaScript hooks. Existing project photographs remain the active imagery; the generated menu illustration is no longer used.
