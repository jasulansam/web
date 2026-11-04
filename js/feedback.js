"use strict";

(() => {
  const app = window.CoffiApp;
  const form = document.querySelector("#feedback-form");
  const status = document.querySelector("#feedback-status");
  if (!app || !form || !status) return;
  form.noValidate = true;

  const rating = document.querySelector("#rating-score");
  const visitDate = document.querySelector("#visit-date");
  const comments = document.querySelector("#review-comments");
  const counter = document.querySelector("#comment-counter");
  const name = document.querySelector("#client-name");
  const drink = document.querySelector("#favorite-beverage");
  const list = document.querySelector("#review-list");
  const empty = document.querySelector("#review-empty");
  const count = document.querySelector("#review-count");
  const reviews = [];
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  visitDate.max = today.toISOString().slice(0, 10);

  const clearError = (field) => {
    const note = document.getElementById(`${field.id}-error`);
    if (!note) return;
    field.removeAttribute("aria-invalid");
    if (note.dataset.previousDescription) field.setAttribute("aria-describedby", note.dataset.previousDescription);
    else field.removeAttribute("aria-describedby");
    note.remove();
  };
  const clearErrors = () => form.querySelectorAll("[data-error-for]").forEach((note) => {
    clearError(document.getElementById(note.dataset.errorFor));
  });
  const showError = (field, message) => {
    const note = app.element("small", "state-message is-error p-2 mt-2 d-block", message);
    note.id = `${field.id}-error`;
    note.dataset.errorFor = field.id;
    note.dataset.previousDescription = field.getAttribute("aria-describedby") || "";
    field.setAttribute("aria-invalid", "true");
    field.setAttribute("aria-describedby", [note.id, note.dataset.previousDescription].filter(Boolean).join(" "));
    field.closest(".form-field")?.append(note);
    return field;
  };
  const renderReviews = () => {
    list.replaceChildren(...reviews.map((review) => {
      const column = app.element("div", "col-12 col-md-6");
      const card = app.element("article", "action-card h-100 p-4");
      const heading = app.element("div", "d-flex justify-content-between align-items-start gap-3 mb-2");
      heading.append(
        app.element("h3", "h5 mb-0", review.name || "Guest"),
        app.element("span", "badge text-bg-light", `${review.rating}/5`)
      );
      card.append(heading, app.element("p", "small text-body-secondary mb-2", "Demo preview"));
      if (review.drink) card.append(app.element("p", "small mb-2", `Drink: ${review.drink}`));
      card.append(app.element("p", "mb-0", review.comment));
      column.append(card);
      return column;
    }));
    empty.classList.toggle("is-hidden", reviews.length > 0);
    count.textContent = reviews.length ? `${reviews.length} demo review(s)` : "No reviews added yet";
  };

  comments.addEventListener("input", () => {
    counter.textContent = `${comments.value.length} / 240 characters`;
  });
  form.addEventListener("input", (event) => clearError(event.target));
  form.addEventListener("change", (event) => clearError(event.target));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();
    app.hideStatus(status);

    const invalid = [];
    if (!rating.value) invalid.push(showError(rating, "Choose a rating."));
    if (visitDate.value && visitDate.value > visitDate.max) invalid.push(showError(visitDate, "The visit date cannot be in the future."));
    if (comments.value.trim().length < 10) invalid.push(showError(comments, "Write at least 10 characters."));
    if (name.value.trim() && name.value.trim().length < 2) invalid.push(showError(name, "Use at least two characters, or leave this blank."));

    if (invalid.length) {
      invalid[0].focus();
      return;
    }

    reviews.unshift({
      name: name.value.trim(),
      rating: Number(rating.value),
      drink: drink.value,
      comment: comments.value.trim(),
    });
    renderReviews();
    app.setStatus(status, "success", "Demo preview added below. It is visible only until you reload this page; it was not sent, published, or saved.");
    form.reset();
    counter.textContent = "0 / 240 characters";
  });

  renderReviews();
})();
