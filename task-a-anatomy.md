# Task A — Anatomy of Coffi Web Architecture & Semantic Planning

**Course**: Introduction to Web Technologies / Frontend Fundamentals  
**Project**: Coffi Coffee Shop (Alikhan Bokeikhan St 10, Astana)  
**Team Members**: Samrat Zhasulan & Zhaksylyk Adilet  
**Target Website**: Coffi Coffee Shop Website (`index.html`)

---

## 1. Head Elements and Metadata Inspection
- **DOCTYPE**: `<!DOCTYPE html>` (HTML5 standard doctype triggering standard rendering mode)
- **Language**: `lang="en"` declared in `<html lang="en">` (specifies English language for speech synthesizers)
- **Charset**: Standard HTML5 Unicode `<meta charset="UTF-8">`
- **Viewport**: `<meta name="viewport" content="width=device-width, initial-scale=1.0">` (responsive viewport scaling)
- **Title**: `Coffi Coffee Shop Astana - Neighborhood Specialty Coffee`
- **Three Key Meta Tags**:
  1. `<meta name="description" content="Welcome to Coffi, a cozy neighborhood coffee shop on Alikhan Bokeikhan Street 10 in Astana, serving artisan espresso and fresh pastries.">`
  2. `<meta name="author" content="Samrat Zhasulan">`
  3. `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

---

## 2. Semantic vs. Non-Semantic Tag Frequency Analysis

| Element Type | Tag Name | Occurrence Count | Implementation Purpose in Coffi |
| :--- | :--- | :--- | :--- |
| Semantic Header | `<header>` | 6 | Present on all 6 pages for branding and page title |
| Semantic Navigation | `<nav>` | 6 | Encapsulates site navigation `<ul>` on every page |
| Sectional Grouping | `<section>` | 7 | Thematic sectioning for visiting hours, categories, standards |
| Independent Article | `<article>` | 5 | Self-contained stories, bean sourcing, and code skeleton |
| Complementary Aside | `<aside>` | 2 | Peripheral info: visiting hours and breakfast pairing special |
| Data Tables | `<table>` | 1 | Relational pricing table in `menu.html` with caption, thead, tbody |
| Generic Containers | `<div>` | 1 | Strictly limited to 1 instance on `menu.html:61` (legal tax note) |

---

## 3. Three Core Architectural Principles of Coffi

### Principle 1: Semantic Navigation Landmarks Over Generic Containers
- **Implementation**: Instead of generic unsemantic wrapper divs, our Coffi site strictly encapsulates navigation links inside a semantic `<nav>` tag containing a structured `<ul>` list across all 6 pages (`index.html`, `about.html`, `menu.html`, `booking.html`, `feedback.html`, `colophon.html`).
- **Benefit**: Screen readers and search engine crawlers immediately identify navigation landmarks and jump directly between pages.

### Principle 2: Explicit Form Accessibility and Grouping
- **Implementation**: In both `booking.html` and `feedback.html`, every input (`text`, `email`, `tel`, `date`, `number`, `radio`, `checkbox`, `textarea`) has a unique `id` explicitly bound to a `<label for="...">`, and inputs are categorized into `<fieldset>` elements with `<legend>`.
- **Benefit**: Tapping or clicking any label immediately activates input focus, and assistive tools read field legends before requesting input.

### Principle 3: Accessible Tabular Structure for Menu Data
- **Implementation**: In `menu.html`, the beverage and pastry price list is structured in a true HTML5 `<table>`, featuring `<caption>`, `<thead>`, `<tbody>`, and accessible `<th scope="col">` and `<th scope="row">` headers.
- **Benefit**: Search engine bots and accessibility tools extract relational rows and columns, linking every drink name to its volume and price in tenge.
