# Assignment 3 CSS cleanup

| Assignment 2 rule removed from active pages | Bootstrap replacement |
|---|---|
| Hand-built navigation flex layout | `navbar`, `navbar-expand-lg`, `navbar-nav`, `navbar-toggler`, `collapse` |
| Manual page width and spacing | `container`, `container-fluid`, `py-5`, `p-4`, `m-5`, `gap-*` |
| Manual form two-column Grid | `row`, `col-12`, `col-lg-4`, `col-lg-8` |
| Manual table striping and overflow | `table`, `table-striped`, `table-hover`, `table-responsive` |
| Manual buttons | `btn`, `btn-primary`, `btn-outline-secondary`, `btn-sm` |
| Manual footer alignment | `d-flex`, `flex-column`, `flex-md-row`, `justify-content-between` |

The remaining `css/bootstrap-custom.css` is a correction layer for Coffi colors, fonts, image fitting, borders and small project-specific details. Bootstrap 5.3.8 is loaded from the official jsDelivr CDN on every page.
