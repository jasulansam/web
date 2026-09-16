# Task A — Anatomy of a Real Web Page (Reference Audit: coffeeboom.kz)

**Course**: Introduction to Web Technologies / Frontend Fundamentals  
**Project**: Coffi Coffee Shop (Alikhan Bokeikhan St 10, Astana)  
**Team Members**: Zamrat Zhasulan & Zhaksylyk Adilet  
**Audited Competitor Website**: Coffee Boom Kazakhstan (`https://coffeeboom.kz`)

---

## 1. Head Elements and Metadata Inspection
- **DOCTYPE**: `<!DOCTYPE html>` (HTML5 doctype)
- **Language**: `lang="kk"` declared in `<html class="html" lang="kk">`
- **Charset**: Legacy HTTP-EQUIV syntax `<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>`
- **Viewport**: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- **Title**: `Coffee Boom — Қазақстан, Ресей және Өзбекстандағы кофеханалар желісі.`
- **Three Key Meta Tags**:
  1. `<meta name="Description" content="Coffee Boom — 2010 жылдан бері жұмыс істеп келе жатқан, 130-дан астам кофеханасы бар халықаралық желі...">`
  2. `<meta name="theme-color" content="whitesmoke">`
  3. `<meta property="og:image" content="https://coffeeboom.kz/wa-data/public/wcms/images/07/04/00/461/461.0x0.png">`

---

## 2. Semantic vs. Non-Semantic Tag Frequency Analysis

| Element Type | Tag Name | Occurrence Count | Status / Evaluation |
| :--- | :--- | :--- | :--- |
| Semantic Header | `<header>` | 1 | Present for top branding |
| Semantic Navigation | `<nav>` | 0 | **Severe issue**: Main menu wrapped only in generic divs |
| Sectional Grouping | `<section>` | 0 | No thematic sectioning used |
| Independent Article | `<article>` | 0 | News and promo cards use plain divs |
| Complementary Aside | `<aside>` | 0 | No peripheral landmarks |
| Data Tables | `<table>` | 0 | No structured tables for branch or menu pricing |
| Generic Containers | `<div>` | 570 | **Excessive div-soup** throughout entire layout |

---

## 3. Three Structural Mistakes and Our Solutions

### Mistake 1: Extreme "Div-Soup" and Missing Navigation Landmarks
- **Found on Competitor Site**: On `coffeeboom.kz`, the entire main navigation containing 20+ links is coded as `<div class="menu-item">` without any semantic `<nav>` or `<ul>` list. Screen readers cannot locate the navigation landmark.
- **Our Solution in Coffi**: Across all 6 pages (`index.html`, `about.html`, `menu.html`, `booking.html`, `feedback.html`, `colophon.html`), site navigation is strictly encapsulated in a semantic `<nav>` tag containing an unordered `<ul>` list of relative links.

### Mistake 2: Missing `<label>` Connections in Forms
- **Found on Competitor Site**: The feedback and franchise forms use input placeholders without associated `<label for="...">` tags. Visually impaired users using screen readers cannot determine what data is required.
- **Our Solution in Coffi**: In `booking.html` and `feedback.html`, every input (`text`, `email`, `tel`, `date`, `number`, `radio`, `checkbox`, `textarea`) has a unique `id` explicitly bound to a `<label for="...">`, and inputs are categorized into `<fieldset>` elements with `<legend>`.

### Mistake 3: Tabular Pricing Replaced by Floating Divs
- **Found on Competitor Site**: Menu drinks and branch addresses are rendered using floating CSS flexbox divs without any table hierarchy. Search engine bots and accessibility tools cannot extract relational rows and columns.
- **Our Solution in Coffi**: In `menu.html`, the beverage and pastry price list is structured in a true HTML5 `<table>`, featuring `<caption>`, `<thead>`, `<tbody>`, and accessible `<th scope="col">` and `<th scope="row">` headers.
