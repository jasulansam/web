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
  const reviewKey = "coffi-reviews";
  const samples = [
    { name: "Dana", rating: 5, drink: "Cappuccino", comment: "A smooth cappuccino and a quiet corner to catch up on reading.", sample: true },
    { name: "Arman", rating: 4, drink: "Bumble coffee", comment: "The orange and coffee combination is refreshing. A nice choice for a quick break.", sample: true },
    { name: "Aigerim", rating: 5, drink: "Flat white", comment: "A lovely place to sit with a flat white and work through my notes.", sample: true },
  ];
  let reviews = [];
  let storageReadable = true;
  try {
    const saved = JSON.parse(localStorage.getItem(reviewKey) || "[]");
    if (!Array.isArray(saved) || !saved.every((review) => review && typeof review.comment === "string" && typeof review.name === "string" && Number.isInteger(review.rating) && review.rating >= 1 && review.rating <= 5)) throw new Error("Invalid reviews");
    reviews = saved;
  } catch {
    storageReadable = false;
    app.setStatus(status, "error", "Saved reviews could not be read. New reviews can be previewed for this visit.");
  }
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
  const browser = document.querySelector("#review-browser");
  const previous = document.querySelector("#reviews-prev");
  const next = document.querySelector("#reviews-next");
  const toggle = document.querySelector("#reviews-toggle");
  const position = document.querySelector("#reviews-position");
  const desktop = matchMedia("(min-width: 1200px)");
  const tablet = matchMedia("(min-width: 768px)");
  let firstReview = 0;
  let showAll = false;
  const updateReviewView = () => {
    const cards = [...list.children];
    const visibleCount = Math.min(cards.length, desktop.matches ? 3 : tablet.matches ? 2 : 1);
    firstReview = cards.length ? firstReview % cards.length : 0;
    const visible = Array.from({ length: visibleCount }, (_, offset) => (firstReview + offset) % cards.length);
    browser.classList.toggle("show-all", showAll);
    browser.setAttribute("aria-roledescription", showAll ? "review list" : "carousel");
    cards.forEach((card, index) => {
      card.classList.toggle("is-hidden", !showAll && !visible.includes(index));
      card.style.order = showAll ? "" : String((index - firstReview + cards.length) % cards.length);
    });
    const canMove = !showAll && cards.length > 1;
    previous.classList.toggle("is-hidden", showAll);
    next.classList.toggle("is-hidden", showAll);
    previous.disabled = next.disabled = !canMove;
    position.textContent = showAll ? `All ${cards.length} reviews` : `${firstReview + 1} / ${cards.length}`;
    toggle.textContent = showAll ? "Back to carousel" : "View all reviews";
    toggle.setAttribute("aria-expanded", String(showAll));
  };
  previous.addEventListener("click", () => {
    firstReview = (firstReview - 1 + list.children.length) % list.children.length;
    updateReviewView();
  });
  next.addEventListener("click", () => {
    firstReview = (firstReview + 1) % list.children.length;
    updateReviewView();
  });
  toggle.addEventListener("click", () => { showAll = !showAll; updateReviewView(); });
  desktop.addEventListener("change", updateReviewView);
  tablet.addEventListener("change", updateReviewView);

  const renderReviews = () => {
    list.replaceChildren(...[...reviews, ...samples].map((review) => {
      const column = app.element("div", "col-12 col-md-6 col-xl-4");
      const card = app.element("article", "action-card review-card h-100 p-4");
      const heading = app.element("div", "d-flex justify-content-between align-items-start gap-3 mb-2");
      const identity = app.element("div", "d-flex align-items-center gap-2");
      const avatar = app.element("span", "review-avatar", (review.name || "Guest").slice(0, 1).toUpperCase());
      avatar.setAttribute("aria-hidden", "true");
      identity.append(avatar, app.element("h3", "h6 mb-0", review.name || "Guest"));
      heading.append(identity, app.element("span", "review-source", review.sample ? "Sample" : "Your review"));
      const stars = app.element("p", "review-stars my-3", "★".repeat(review.rating) + "☆".repeat(5 - review.rating));
      stars.setAttribute("aria-label", `${review.rating} out of 5 stars`);
      card.append(heading, stars);
      if (review.visitDate) card.append(app.element("p", "small text-body-secondary mb-2", `Visited: ${review.visitDate}`));
      if (review.drink) card.append(app.element("p", "small mb-2", `Drink: ${review.drink}`));
      card.append(app.element("p", "mb-0", review.comment));
      column.append(card);
      return column;
    }));
    empty.classList.add("is-hidden");
    count.textContent = `${samples.length} samples${reviews.length ? ` · ${reviews.length} of your reviews` : ""}`;
    updateReviewView();
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

    firstReview = 0;
    reviews.unshift({
      name: name.value.trim(),
      visitDate: visitDate.value,
      rating: Number(rating.value),
      drink: drink.value,
      comment: comments.value.trim(),
    });
    renderReviews();
    let saved = false;
    try {
      if (storageReadable) {
        localStorage.setItem(reviewKey, JSON.stringify(reviews));
        saved = true;
      }
    } catch { /* Keep the new review visible even if storage is full or blocked. */ }
    app.setStatus(status, saved ? "success" : "error", saved
      ? "Your review is saved on this browser and appears below."
      : "Your review appears below for this visit, but could not be saved.");
    const link = app.element("a", "d-block mt-2 fw-semibold", "View your review ↓");
    link.href = "#review-list";
    status.append(link);
    form.reset();
    counter.textContent = "0 / 240 characters";
  });

  renderReviews();
})();
