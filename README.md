# Coffi - Assignment 3

Introduction to Web Technologies | SE-2537

Zhaksylyk Adilet and Samrat Zhasulan

A coffee shop website using Bootstrap 5.3.8. Open `index.html` in a browser; internet access is needed for the Bootstrap CDN. No installation or build step is required.

## Files

- `index.html`, `about.html`, `menu.html`: introduction, cafe information and menu.
- `booking.html`, `feedback.html`: demonstration forms. Submission is disabled because no backend is connected; inputs and reset buttons remain usable.
- `colophon.html`: retained technical page, omitted from visitor navigation.
- `css/bootstrap-custom.css`: brand colors, typography and small corrections.
- `images/`: images used by the pages.
- `assignment3-assets/`: three Home screenshots, a collapsed mobile navbar screenshot, HTML validation results and menu sources.
- `bootstrap-removals.md`: old CSS rules and their Bootstrap replacements.
- `ai-log.md`: recorded assistance and image-generation disclosure.

## Implementation

Bootstrap handles containers, the grid, spacing, forms, buttons and collapsing navigation. The menu keeps its semantic table and adds a responsive photo group. There is no custom JavaScript, inline CSS or hand-built grid.

The menu contains 20 selected drinks from [Coffi on 2GIS](https://2gis.kz/astana/firm/70000001093393499/tab/prices), checked on 24 September 2026. Prices may change. Image provenance and the generation prompt are recorded in `assignment3-assets/menu-sources.md`.

## Checks

All six HTML pages and the custom stylesheet passed the local Nu Html Checker on 27 September 2026. Local regression checks cover IDs, anchor links, image paths, form labels and controls, Bootstrap links and the menu rows. Formatting was checked against a semantic snapshot before the separately documented content fixes.

The four screenshots show the September 24 visual revision at 375, 768 and 1440 px; they predate the September 27 text and form-state corrections. Fresh browser verification remains pending because the browser tool blocked local file navigation.

Assignment 3 requires each team member's own commits, at least four commits across three days, and an individual defense. These requirements are separate from code validation. Earlier assignment reports and sketches remain in Git history.
