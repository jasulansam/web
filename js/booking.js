"use strict";

(() => {
  const app = window.CoffiApp;
  const form = document.querySelector("#booking-form");
  const status = document.querySelector("#booking-status");
  if (!app || !form || !status) return;
  form.noValidate = true;

  const date = document.querySelector("#book-date");
  const time = document.querySelector("#book-time");
  const guests = document.querySelector("#book-guests");
  const name = document.querySelector("#book-name");
  const phone = document.querySelector("#book-phone");
  const zone = document.querySelector("#book-zone");
  const notes = document.querySelector("#book-notes");
  const validName = (value) => /^(?=(?:.*\p{L}){2})[\p{L}\s'-]+$/u.test(value.trim());
  const normalizePhone = (value) => {
    const digits = value.replace(/\D/g, "");
    return digits.length === 11 && digits.startsWith("8") ? `7${digits.slice(1)}` : digits;
  };
  const validPhone = (value) => /^\+?[\d\s()-]+$/.test(value.trim()) && /^7\d{10}$/.test(normalizePhone(value));
  const phoneError = "Enter 11 digits starting with +7, 7, or 8.";
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  date.min = today.toISOString().slice(0, 10);

  const clearError = (field) => {
    const note = document.getElementById(`${field.id}-error`);
    if (!note) return;
    field.removeAttribute("aria-invalid");
    field.removeAttribute("aria-describedby");
    note.remove();
  };
  const clearErrors = () => form.querySelectorAll("[data-error-for]").forEach((note) => {
    clearError(document.getElementById(note.dataset.errorFor));
  });
  const showError = (field, message) => {
    const note = app.element("small", "state-message is-error p-2 mt-2 d-block", message);
    note.id = `${field.id}-error`;
    note.dataset.errorFor = field.id;
    field.setAttribute("aria-invalid", "true");
    field.setAttribute("aria-describedby", note.id);
    field.closest(".form-field")?.append(note);
    return field;
  };

  phone.addEventListener("blur", () => {
    if (!phone.value || validPhone(phone.value)) return;
    clearError(phone);
    showError(phone, phoneError);
  });

  form.addEventListener("input", (event) => clearError(event.target));
  form.addEventListener("change", (event) => clearError(event.target));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();
    app.hideStatus(status);

    const invalid = [];
    if (!validName(name.value)) invalid.push(showError(name, "Enter at least two letters. Spaces, apostrophes, and hyphens are allowed."));
    if (!validPhone(phone.value)) invalid.push(showError(phone, phoneError));
    if (!date.value || date.value < date.min) invalid.push(showError(date, "Choose today or a future date."));
    if (!time.value) invalid.push(showError(time, "Choose a time."));
    else if (time.value < "07:30" || time.value > "23:00") {
      invalid.push(showError(time, "Choose a time between 07:30 and 23:00."));
    } else if (date.value === date.min && new Date(`${date.value}T${time.value}`) <= new Date()) {
      invalid.push(showError(time, "Choose a time in the future."));
    }
    if (!Number.isInteger(Number(guests.value)) || Number(guests.value) < 1) {
      invalid.push(showError(guests, "Enter at least one guest."));
    }
    if (invalid.length) {
      invalid[0].focus();
      return;
    }

    phone.value = normalizePhone(phone.value);

    const seat = zone.value === "any" ? "no seating preference" : zone.options[zone.selectedIndex].text.toLowerCase();
    const note = notes.value.trim() ? ` Note: ${notes.value.trim()}` : "";
    app.setStatus(
      status,
      "success",
      `Request summary for ${name.value.trim()}: ${date.value} at ${time.value} for ${guests.value} guest(s), ${seat}.${note} Call Coffi to confirm availability.`
    );
  });
})();
