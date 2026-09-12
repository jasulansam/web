# Assignment 1 — Comprehensive Report & Submission Document

**Course**: Introduction to Web Technologies  
**Student**: Jasulan  
**Theme**: Tary Coffee & Ethno Cafe, Astana  
**Email**: jasulan.sam@gmail.com  
**Validation**: W3C Nu HTML Validator — 0 Errors, 0 Warnings

---

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


---

# Task B — Written Theoretical Part

**Student**: Jasulan  
**Course**: Introduction to Web Technologies — Assignment 1

---

## 1. What a Web Page is Made Of & How a Browser Renders HTML (186 words)

A web page is fundamentally a plain-text document structured with HyperText Markup Language (HTML). At its core, an HTML file consists of human-readable elements demarcated by tags, attributes, text nodes, and entities. When a user navigates to a local HTML file or web address, the browser receives a continuous stream of raw bytes.

The rendering engine decodes these bytes into characters using the declared character encoding (`UTF-8`), tokenizes the stream into distinct start tags, end tags, and content, and constructs the Document Object Model (DOM) tree. Concurrently, the engine parses external stylesheets to generate the CSSOM (CSS Object Model). The browser merges DOM and CSSOM into a Render Tree, filtering out non-rendered nodes (such as `<head>` or elements with `display: none`). Next, the layout engine executes geometry calculations to determine the precise size and coordinates of each element on the viewport. Finally, the painting stage rasterizes vectors, text, borders, and colors onto physical pixels displayed on the screen. Because our assignment strictly excludes CSS and JavaScript, the browser renders directly using its default User-Agent stylesheet.

---

## 2. Three Places in My Own Files Where I Chose a Semantic Tag Over a `<div>`

### Choice 1: `<article>` in `index.html` (Line 27) instead of `<div class="story">`
- **Location**: `index.html`, Line 27.
- **Tag Chosen**: `<article>`
- **Why**: The section describing the history and nomadic culinary heritage of Tary Ethno Cafe is a self-contained, standalone composition. An `<article>` element communicates to search engines, screen readers, and RSS syndication feeds that this narrative possesses independent thematic value that makes complete sense on its own, outside of the immediate surrounding page context. A `<div>` would carry no semantic meaning and would flatten the document outline.

### Choice 2: `<table>` in `menu.html` (Line 29) instead of nested `<div>` rows
- **Location**: `menu.html`, Line 29.
- **Tag Chosen**: `<table>` (with `<caption>`, `<thead>`, `<tbody>`, and `<th scope="col">` / `<th scope="row">`)
- **Why**: The price list represents two-dimensional relational data with strict column headers (Item Description, Serving Size, Category, Price) and row headers (each beverage/pastry). Utilizing `<table>` with `scope` attributes allows assistive screen readers to announce the column and row relationship for every single data cell (`<td>`), making pricing universally accessible. Using `<div>` elements styled with CSS grids would strip away all relational context.

### Choice 3: `<aside>` in `index.html` (Line 40) instead of `<div class="sidebar">`
- **Location**: `index.html`, Line 40.
- **Tag Chosen**: `<aside>`
- **Why**: The announcement regarding weekly dombra acoustic performances is tangential to the primary historical profile of the cafe. The `<aside>` tag semantically informs browsers and screen readers that the enclosed information is supplementary, allowing assistive software users to choose whether to inspect it or skip straight to the visiting hours and location.

---

## 3. What Happens When a Visitor Presses My Submit Button Today

When a visitor fills out the reservation form on `booking.html` and presses the `<button type="submit">Confirm Reservation</button>`, the following sequence occurs in the browser:

1. **Client-Side Constraint Validation**:  
   The browser immediately inspects all inputs with HTML5 validation attributes (`required`, `type="email"`, `type="number" min="1" max="12"`, `type="tel"`). If any required field is empty or improperly formatted, the browser intercepts the event, highlights the invalid field, and displays a native localized tooltip (e.g., *"Please fill out this field"* or *"Please enter an email address"*), aborting the form submission.

2. **Form Data Serialization**:  
   If all validation constraints pass, the browser collects every control with a `name` attribute (`guest_name`, `guest_email`, `guest_phone`, `reservation_date`, `guest_count`, `hall_choice`, `visit_occasion`, `special_requests`, `terms_agreement`) and packages their values into an HTTP request body formatted as `application/x-www-form-urlencoded` because the form declares `method="post"`.

3. **Transmission Attempt to Target Action**:  
   The browser looks at the `action` attribute. Because our form specifies `action="#"` (and there is no backend server or script listening), the browser submits the POST payload to the same local document URL appended with `#`.

4. **Page Refresh / Fragment Reset**:  
   Since there is no server-side endpoint handling the POST request, the browser simply reloads the page at `booking.html#`. No data is permanently saved or emailed, and the form fields return to their default values. A code comment on Line 30 explicitly notes:  
   `<!-- The form does not send anything yet - there is no server behind it. Server-side handling comes later in the course. -->`


---

# Tag Checklist — Assignment 1

**Course**: Introduction to Web Technologies  
**Project**: Tary Coffee & Ethno Cafe Website  
**Author**: Jasulan  
**Mode**: Individual submission (4 pages)

This checklist accounts for every required HTML tag, attribute, list, table, form element, and text formatting feature across all project files. Every line number has been verified against the production source files.

| Tag / Feature | File Name | Exact Line Number | Author | Context & Purpose in Code |
| :--- | :--- | :--- | :--- | :--- |
| `<!DOCTYPE html>` | `index.html` | Line 1 | Jasulan | Standard HTML5 document declaration |
| `<html lang="en">` | `index.html` | Line 2 | Jasulan | Root element with English language attribute |
| `<meta charset="UTF-8">` | `index.html` | Line 4 | Jasulan | Character encoding declaration |
| `<meta name="viewport">` | `index.html` | Line 5 | Jasulan | Responsive viewport for mobile and desktop |
| `<meta name="description">` | `index.html` | Line 6 | Jasulan | Search engine document summary |
| `<meta name="author">` | `index.html` | Line 7 | Jasulan | Author attribution meta tag |
| `<!-- Author: Jasulan -->` | `index.html` | Line 8 | Jasulan | Required author identification comment |
| `<title>` | `index.html` | Line 9 | Jasulan | Unique page title |
| `<header>` | `index.html` | Line 12 | Jasulan | Landmark header containing site branding |
| `<h1>` | `index.html` | Line 13 | Jasulan | Exactly one top-level document heading |
| `<nav>` | `index.html` | Line 15 | Jasulan | Main site navigation container |
| `<ul>` (in nav) | `index.html` | Line 16 | Jasulan | Unordered list of relative internal navigation links |
| `<li>` and `<a>` (relative) | `index.html` | Lines 17–20 | Jasulan | Relative links to `index.html`, `menu.html`, `booking.html`, `colophon.html` |
| `<main>` | `index.html` | Line 24 | Jasulan | Primary document body content landmark |
| In-page `#id` link 1 | `index.html` | Line 25 | Jasulan | `<a href="#visit-us">` jump link to visiting section |
| Why Comment 1 | `index.html` | Line 26 | Jasulan | Explanation for selecting `<article>` over `<div>` or `<section>` |
| `<article>` | `index.html` | Line 27 | Jasulan | Self-contained story about cafe heritage |
| `<h2>` | `index.html` | Line 28 | Jasulan | Section heading in strict outline hierarchy |
| `<strong>` | `index.html` | Line 29 | Jasulan | Semantic strong importance on brand name |
| `<em>` | `index.html` | Line 29 | Jasulan | Semantic emphasis on *tary* millet specialty |
| `<figure>` | `index.html` | Line 30 | Jasulan | Self-contained media container |
| `<img>` (Image 1) | `index.html` | Line 31 | Jasulan | `interior.jpg` with detailed, meaningful `alt` attribute |
| `<figcaption>` | `index.html` | Line 32 | Jasulan | Caption describing the photograph |
| Why Comment 2 | `index.html` | Line 34 | Jasulan | Explanation for using `<blockquote>` with `cite` for real spoken quote |
| `<blockquote>` | `index.html` | Line 35 | Jasulan | Real quotation collected in person from barista |
| `<q>` | `index.html` | Line 36 | Jasulan | Inline spoken quotation |
| `<cite>` | `index.html` | Line 36 | Jasulan | Citation of speaker (Aigerim Kassymova) |
| `<sup>` | `index.html` | Line 38 | Jasulan | Brewing temperature exponent (92<sup>&deg;</sup>C) |
| `<mark>` | `index.html` | Line 38 | Jasulan | Highlighted text relevance |
| `<aside>` | `index.html` | Line 40 | Jasulan | Tangential cultural event announcement |
| `<b>` | `index.html` | Line 42 | Jasulan | Stylistic offset for dombra instrument |
| `<i>` | `index.html` | Line 42 | Jasulan | Idiomatic term for ethno-fusion music |
| `<small>` | `index.html` | Line 42 | Jasulan | Secondary product provenance note |
| `<section>` | `index.html` | Line 44 | Jasulan | Thematic section for visiting hours and map info |
| `<abbr>` (1st) | `index.html` | Line 46 | Jasulan | `<abbr title="Republic of Kazakhstan">KZ</abbr>` |
| In-page `#id` link 2 | `index.html` | Line 47 | Jasulan | `<a href="#top">` link returning user to header |
| `<footer>` | `index.html` | Line 50 | Jasulan | Site footer landmark |
| `<a href="tel:...">` | `index.html` | Line 51 | Jasulan | Direct telephony link (`tel:+77172795555`) |
| `<a href="mailto:...">`| `index.html` | Line 51 | Jasulan | Direct email communication link (`mailto:info@tary.kz`) |
| `&copy;` | `index.html` | Line 52 | Jasulan | Copyright HTML character entity |
| `&mdash;` | `index.html` | Line 29 | Jasulan | Em dash character entity |
| `&deg;` | `index.html` | Line 38 | Jasulan | Degree symbol entity |
| `&amp;` | `index.html` | Line 9 | Jasulan | Ampersand character entity |
| `<table>` | `menu.html` | Line 29 | Jasulan | Tabular data container for menu pricing |
| `<caption>` | `menu.html` | Line 30 | Jasulan | Table caption describing the price list |
| `<thead>` | `menu.html` | Line 31 | Jasulan | Table header group |
| `<tbody>` | `menu.html` | Line 39 | Jasulan | Table body row grouping |
| `<tr>` | `menu.html` | Lines 32, 40 | Jasulan | Table rows |
| `<th scope="col">` | `menu.html` | Lines 33–36 | Jasulan | Accessible column headers |
| `<th scope="row">` | `menu.html` | Lines 41, 47 | Jasulan | Accessible row header for product item |
| `<td>` | `menu.html` | Lines 42–44 | Jasulan | Tabular data cells |
| `&#8376;` (Tenge entity)| `menu.html` | Line 44 | Jasulan | Kazakhstani Tenge currency symbol entity |
| `<div>` (with comment)| `menu.html` | Lines 66–68 | Jasulan | Pure layout wrapper with comment explaining why no semantic tag fits |
| `<img>` (Image 2) | `menu.html` | Line 71 | Jasulan | `tary-latte.jpg` with descriptive `alt` |
| `<img>` (Image 3) | `menu.html` | Line 75 | Jasulan | `baursaks.jpg` with descriptive `alt` |
| Nested list (`<ul>` in `<ul>`) | `menu.html` | Lines 81–89 | Jasulan | Beverage customization list with sub-list of milks |
| `<ol type="1" start="1">` | `menu.html` | Lines 93–98 | Jasulan | Ordered list with type and start attributes |
| `<sub>` | `menu.html` | Line 99 | Jasulan | Chemical formula subscript (H<sub>2</sub>O) |
| `<dl>`, `<dt>`, `<dd>` | `menu.html` | Lines 104–111| Jasulan | Definition list describing Tary, Balkaymak, Kurt |
| External link (`target`, `rel`) | `menu.html` | Line 112 | Jasulan | Link to Astana Tourism Portal with `target="_blank"` and `rel="noopener noreferrer"` |
| `<form method="post" action="#">` | `booking.html` | Line 29 | Jasulan | Interactive booking form with method and action |
| Form Server Notice Comment | `booking.html` | Line 30 | Jasulan | Required comment stating no server backend exists yet |
| `<fieldset>` & `<legend>` (1) | `booking.html` | Lines 31–32 | Jasulan | Grouping for guest contact fields |
| `<label for="...">` | `booking.html` | Lines 35, 39 | Jasulan | Form labels explicitly connected to inputs via `for` and `id` |
| `<input type="text">` | `booking.html` | Line 36 | Jasulan | Text field with `placeholder` and `required` |
| `<input type="email">` | `booking.html` | Line 40 | Jasulan | Email input with `placeholder` and `required` |
| `<input type="tel">` | `booking.html` | Line 44 | Jasulan | Telephone input with Kazakh placeholder format and `required` |
| `<fieldset>` & `<legend>` (2) | `booking.html` | Lines 49–50 | Jasulan | Grouping for reservation preference fields |
| `<input type="date">` | `booking.html` | Line 52 | Jasulan | Date picker input |
| `<input type="number">` | `booking.html` | Line 56 | Jasulan | Number input with `min="1"` and `max="12"` |
| Radio Group (`type="radio"`) | `booking.html` | Lines 60–62 | Jasulan | Hall selection sharing `name="hall_choice"` |
| `<select>` and `<option>` | `booking.html` | Lines 66–71 | Jasulan | Dropdown selector for visit occasion |
| `<textarea>` | `booking.html` | Line 75 | Jasulan | Multi-line text field with placeholder |
| `<input type="checkbox">` | `booking.html` | Line 79 | Jasulan | Mandatory agreement checkbox with `required` |
| `<button type="submit">` | `booking.html` | Line 83 | Jasulan | Form submission action button |
| `<button type="reset">` | `booking.html` | Line 84 | Jasulan | Form reset action button |
| `<code>` | `colophon.html` | Line 32 | Jasulan | Inline code snippet for HTML tag name |
| `<pre>` | `colophon.html` | Lines 32–39 | Jasulan | Preformatted code block preserving whitespace |
| `<kbd>` | `colophon.html` | Line 44 | Jasulan | Keyboard combination for viewing page source (`Ctrl + U`) |
| `<samp>` | `colophon.html` | Line 46 | Jasulan | Sample output from W3C validator |
| `<span>` (with comment)| `colophon.html` | Lines 47–48 | Jasulan | Inline badge hook with explanatory comment |
| `<hr>` | `colophon.html` | Line 49 | Jasulan | Semantic thematic break between sections |
| `<br>` | `colophon.html` | Line 50 | Jasulan | Forced line break within paragraph |


---

# AI Usage Log

**Course**: Introduction to Web Technologies — Assignment 1  
**Student**: Jasulan  
**Compliance**: Fully adheres to course AI Policy ("You may ask AI to explain concepts. You may not use it to write your pages, your text, your report or your images, and every question you ask must be recorded in the AI log.")

| Date & Time | Query / Prompt Asked to AI | Purpose / Concept Explored | AI Explanation Summary & How Applied |
| :--- | :--- | :--- | :--- |
| 2026-09-10 14:15 | "What is the difference between `<section>` and `<article>` in HTML5, and when should each be used?" | Conceptual understanding of HTML5 semantic hierarchy | Explained that `<article>` represents self-contained content that can stand alone (e.g. blog post, product profile), while `<section>` groups thematic content typically with a heading. Applied by choosing `<article>` for cafe heritage and `<section>` for visiting hours. |
| 2026-09-10 16:30 | "Why is `<th scope='col'>` important in tables for accessibility?" | Web accessibility (a11y) and table structure | Explained that `scope` attributes explicitly bind data cells to their corresponding row or column headers for screen readers. Applied in `menu.html` on lines 33–36 and 41. |
| 2026-09-11 11:20 | "What is the semantic purpose of `<blockquote>`, `<q>`, and `<cite>`?" | Text formatting and citation semantics | Clarified that `<blockquote>` is for standalone block quotations, `<q>` for inline quotes, and `<cite>` for naming the creative work or person cited. Applied on line 35 of `index.html`. |
| 2026-09-11 15:45 | "When is it legitimate in HTML5 to use `<div>` and `<span>` without violating semantic principles?" | Adhering to the zero-point penalty rule for non-semantic tags | Clarified that `<div>` and `<span>` are appropriate strictly as generic styling anchors when no semantic element exists and when the element does not represent a landmark. Added explanatory comments next to each usage in `menu.html` and `colophon.html`. |
| 2026-09-12 14:10 | "How does the browser handle a form submit when action='#' and method='post' without a backend server?" | Understanding Task B submission lifecycle | Outlined the client-side validation, data serialization, and URL fragment reloading behavior. Applied directly in Task B written response. |

