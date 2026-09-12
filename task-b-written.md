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
