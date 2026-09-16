# Task B — Reflective Essays

**Course**: Introduction to Web Technologies / Frontend Fundamentals  
**Project**: Coffi Coffee Shop (Alikhan Bokeikhan St 10, Astana)  
**Team Members**: Samrat Zhasulan & Zhaksylyk Adilet  

---

## Reflective Essay: Samrat Zhasulan (182 words)

A web page is fundamentally a plain-text document structured with HyperText Markup Language (HTML). At its core, an HTML file consists of human-readable elements demarcated by tags, attributes, text nodes, and entities. When a user navigates to a local HTML file or web address, the browser receives a continuous stream of raw bytes.

The rendering engine decodes these bytes into characters using the declared character encoding (`UTF-8`), tokenizes the stream into distinct start tags, end tags, and content, and constructs the Document Object Model (DOM) tree. Concurrently, the engine parses external stylesheets to generate the CSSOM (CSS Object Model). The browser merges DOM and CSSOM into a Render Tree, filtering out non-rendered nodes (such as `<head>` or elements with `display: none`). Next, the layout engine executes geometry calculations to determine the precise size and coordinates of each element on the viewport. Finally, the painting stage rasterizes vectors, text, borders, and colors onto physical pixels displayed on the screen. Because our assignment strictly excludes CSS and JavaScript, the browser renders directly using its default User-Agent stylesheet.

In my codebase, I strictly prioritized semantic markup over generic `<div>` containers:
1. In `menu.html`, I wrapped our pricing data inside an accessible `<table>` with `<thead>` and `<tbody>` instead of styled grid divs, giving assistive screen readers clear tabular data relationships.
2. In `menu.html`, I utilized a definition list (`<dl>`, `<dt>`, `<dd>`) instead of divs to define specialty coffee terms (Single-Origin, Bumble Coffee, Micro-foam) as term-and-description semantic pairs.
3. In `about.html`, I chose `<article>` instead of `<div>` for the community workspace narrative because it forms an independent, self-contained story that can stand on its own.

---

## Reflective Essay: Zhaksylyk Adilet (175 words)

A web page is a structured text document containing semantic tags that define document landmarks, interactive forms, and content hierarchies. When a browser opens our `booking.html` file, it parses the markup from top to bottom, building an in-memory tree representation known as the DOM (Document Object Model). Without external CSS, the browser applies its built-in user-agent style sheet to compute font sizes, element margins, and form control layouts before painting pixels to the display.

In my codebase, I strictly chose semantic elements over non-semantic `<div>` tags:
1. In `booking.html`, I grouped personal contact details and dining preferences inside `<fieldset>` elements with `<legend>` rather than wrapper divs, ensuring screen readers announce logical category contexts.
2. In `feedback.html`, I explicitly connected each `<label for="...">` with its corresponding input `id` instead of using generic divs with text, ensuring clicking labels activates input focus.
3. In `colophon.html`, I used `<pre>` and `<code>` instead of a div container to display sample HTML code while preserving whitespace and formatting.

When a visitor clicks the submit button on `booking.html` today, the browser triggers native client-side constraint validation against attributes like `required`, `type="email"`, `type="number"`, and `type="tel"`. If any input fails validation, the browser blocks submission and displays a native alert. Because no server-side backend script processes the request, the browser attempts an HTTP POST request to `action="#"`, reloading the static page with query fragment without transmitting data over the network.
