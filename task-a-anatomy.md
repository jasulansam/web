# Task A — Anatomy of a Real Web Page

**Student**: Jasulan  
**Course**: Introduction to Web Technologies — Assignment 1  
**Analyzed Website**: Costa Coffee Kazakhstan (`https://costacoffee.kz`) & Starbucks Kazakhstan (`https://starbucks.com.kz`)

---

## 1. Technical Document Header & Metadata
- **Doctype**: `<!DOCTYPE html>` (HTML5 standard doctype)
- **Language (`lang`)**: `<html lang="ru">` (declared for the Russian localization in Kazakhstan)
- **Character Encoding (`charset`)**: `<meta charset="utf-8">`
- **Viewport**: `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">`
- **Document Title**: `<title>Costa Coffee Kazakhstan — Свежий кофе, десерты и кофейни в Алматы и Астане</title>`
- **Three Meta Tags**:
  1. `<meta name="description" content="Официальный сайт кофеен Costa Coffee в Казахстане. Меню, адреса кофеен в Алматы и Астане, программа лояльности.">`
  2. `<meta name="robots" content="index, follow">`
  3. `<meta property="og:type" content="website">`

---

## 2. Semantic vs. Generic Markup Analysis
- **Semantic Tags Used**:
  The audited site makes minimal use of standard HTML5 semantic landmarks:
  - `<header>` is present for the top brand bar.
  - `<nav>` is used inside the header for primary links.
  - `<footer>` is used at the bottom for legal disclaimers and social links.
- **Where `<div>` is Overused Instead of Semantics**:
  - The main page content is wrapped in `<div id="content" class="main-wrapper">` instead of `<main>`.
  - Every individual coffee bean highlight, seasonal drink promo, and news article is coded as `<div class="card">` or `<div class="news-item">` instead of `<article>`.
  - The promotional sidebar for loyalty points is coded as `<div class="sidebar-banner">` rather than `<aside>`.
  - Beverage images and their captions are nested inside `<div class="img-box">` and `<div class="label">` instead of the semantic `<figure>` and `<figcaption>`.

---

## 3. Forms and Tables Implementation
- **Forms**:
  The feedback form uses `<form action="/api/feedback" method="POST">`, but lacks `<fieldset>` and `<legend>`. Inputs rely entirely on visual `placeholder` text without associated `<label for="...">` elements, severely degrading accessibility for screen readers.
- **Tables**:
  The nutritional and pricing information is implemented entirely using nested `<div>` elements styled with CSS Flexbox (`<div class="row">` / `<div class="col">`) rather than a semantic `<table>` with `<caption>`, `<thead>`, `<tbody>`, and `<th scope="col">`. Consequently, tabular data cannot be parsed relationally by search engines or assistive technology.

---

## 4. Three Structural Mistakes Found and How Avoided in My Project

### Mistake 1: "Div Soup" and Lack of Landmark Semantics
- **Found on Competitor Site**: The entire central body of the website is wrapped in generic `<div>` tags with arbitrary CSS class names (`container`, `wrapper`, `card-list`), without `<main>`, `<article>`, or `<section>`.
- **How I Avoided It**: In my project (`index.html`, `menu.html`, `booking.html`, `colophon.html`), I used `<main>` on every page to define the primary landmark. Each independent narrative is encapsulated in `<article>`, and thematic groups are in `<section>` with hierarchical headings (`<h2>`, `<h3>`). `<div>` was only used once in `menu.html` purely as a generic container with an explicit explanatory comment.

### Mistake 2: Missing `<label>` Associations and Fieldset Grouping in Forms
- **Found on Competitor Site**: Inputs had only `placeholder` attributes and had no `<label>` tags linked with `for` and `id`. There were no `<fieldset>` containers, making it confusing to distinguish contact details from feedback text.
- **How I Avoided It**: In `booking.html`, every input (`text`, `email`, `tel`, `date`, `number`, `radio`, `checkbox`, `textarea`) has a distinct `id` linked directly to a `<label for="...">`. Furthermore, the form is divided into two logical sections using `<fieldset>` and `<legend>` ("Guest Contact Information" and "Reservation Specifics").

### Mistake 3: Replacing Tabular Data with Flexbox `<div>` Tags
- **Found on Competitor Site**: Product pricing and nutrition tables were simulated using CSS divs, with zero semantic table headers or scopes.
- **How I Avoided It**: In `menu.html`, the price list is built with a genuine `<table>`, featuring an explanatory `<caption>`, a clear `<thead>` with `<th scope="col">`, and a `<tbody>` with `<th scope="row">` for each product. This ensures 100% accessible relational data even without styling.

---

## 5. Hand-Drawn Page Structure Diagram (Sketch)
*Note: As required by the assignment, this diagram was sketched by hand on paper, signed, dated, and photographed. The structural wireframe template below illustrates the hand-drawn layout.*

```
+-------------------------------------------------------------+
| HEADER: <header>                                            |
|   <h1> Tary Coffee & Ethno Cafe                             |
|   <p> Preserving ancestral culinary heritage...             |
|   <nav>                                                     |
|     [Home]  |  [Menu]  |  [Reservations]  |  [Colophon]     |
+-------------------------------------------------------------+
| MAIN: <main>                                                |
|                                                             |
|   +-------------------------------------------------------+ |
|   | ARTICLE: <article> (Our Gastronomic Heritage)         | |
|   |   <h2> Heading                                        | |
|   |   <p> Text with <strong>, <em>, <sup>, <mark>         | |
|   |   <figure>                                            | |
|   |     [img: interior.jpg]                               | |
|   |     <figcaption> Caption </figcaption>                | |
|   |   </figure>                                           | |
|   |   <blockquote cite="...">                             | |
|   |     <q>Quote...</q> - <cite>Aigerim Kassymova</cite>  | |
|   |   </blockquote>                                       | |
|   +-------------------------------------------------------+ |
|                                                             |
|   +-------------------------------------------------------+ |
|   | ASIDE: <aside> (Weekly Cultural Highlights)           | |
|   |   <h2> Cultural Highlights </h2>                      | |
|   |   <p> <b>dombra</b> and <i>ethno-fusion</i> </p>      | |
|   +-------------------------------------------------------+ |
|                                                             |
|   +-------------------------------------------------------+ |
|   | SECTION: <section id="visit-us">                      | |
|   |   <h2> Visiting Hours & Location </h2>                | |
|   |   <p> Address, <abbr>KZ</abbr>, opening hours </p>    | |
|   |   <a href="#top"> Back to top </a>                    | |
|   +-------------------------------------------------------+ |
+-------------------------------------------------------------+
| FOOTER: <footer>                                            |
|   <p> Telephone: <a href="tel:...">, Email: <a href="mailto:..."> |
|   <p> &copy; 2026 Tary Ethno Cafe. All rights reserved.    |
+-------------------------------------------------------------+
```
