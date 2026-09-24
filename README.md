# Coffi - Web Technologies Assignment 2

Team: Samrat Zhasulan and Zhaksylyk Adilet. Group: SE-2537.

Repository: https://github.com/jasulansam/web

## Open the website

Download and extract the repository, then open `index.html` in a desktop browser. No server or installation is needed. The six existing Assignment 1 pages are retained. Forms are demonstrations without a backend.

## Assignment 2 files

- `css/base.css`: shared palette, typography, navigation and footer.
- `css/zhasulan.css`: index, about and menu pages.
- `css/adilet.css`: booking, feedback and colophon pages.
- `css-checklist.md`: required techniques and source line numbers.
- `assignment2-assets/sketches/booking-paper.png`: supplied booking sketch.
- `assignment2-assets/sketches/feedback-paper.png`: supplied feedback sketch.
- `assignment2-assets/before/`: six unstyled page screenshots.
- `assignment2-assets/after/`: six styled page screenshots.
- `assignment2-assets/validation/`: W3C responses.
- `ai-log.md`: assistance disclosure.

## Verification

All six site HTML files passed W3C Nu without messages. All three stylesheets passed W3C CSS validation with zero errors. The personal CSS files have static CSS-variable checking warnings (29 Adilet, 9 Zhasulan). Browser checks at 1440px verified image loading, absence of horizontal page overflow, required form fields and form reset.

## Submission status

The two supplied paper sketches show names and group, but drawing dates are not visible. Other student-page sketches and pre-CSS drawing timing are not established. Actual individual commits over the required days and the class defense remain separate requirements. AI assistance is disclosed in `ai-log.md`; the course restriction on AI-written submission code still applies.

`report.pdf`, `report.html`, `report-assets/`, `task-a-anatomy.md`, `task-b-written.md` and `tag-checklist.md` are historical Assignment 1 materials. Assignment 2 does not require a written report.

## PDF link sheet
Assignment2_Zhaksylyk_Adilet_SE-2537.pdf contains only the two names and the repository URL.


## Assignment 3 — Bootstrap

The Coffi pages now use Bootstrap 5.3.8 from the official jsDelivr CDN for layout, responsive navigation, grid columns, utilities, buttons and the responsive menu table. `css/bootstrap-custom.css` is a small correction layer for the Coffi palette, typography and image treatment. The public navigation omits the optional colophon page, while `colophon.html` remains available as a technical reference.

- `css/bootstrap-custom.css`: Bootstrap correction layer (kept under the assignment limit).
- `bootstrap-removals.md`: mapping from removed Assignment 2 rules to Bootstrap classes.
- `assignment3-assets/home-375.png`, `home-768.png`, `home-1440.png`: responsive evidence.
- `assignment3-assets/home-nav-collapsed.png`: mobile navbar evidence after opening the toggle.

The pages were checked at 375px, 768px and 1440px with no horizontal overflow. The mobile navbar opens through Bootstrap's collapse component. Assignment 3 does not require a written report.
