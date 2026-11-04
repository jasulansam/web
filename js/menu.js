"use strict";

(() => {
  const app = window.CoffiApp;
  const menu = document.querySelector("#price-table-section");
  const form = document.querySelector("#order-form");
  const modal = document.querySelector("#coffi-cart-modal");
  if (!app || !menu || !form || !modal || !window.bootstrap) return;

  const popular = ["cappuccino", "flat-white", "bumble", "berry-lemonade"];
  const categoryNav = document.querySelector("#category-nav");
  const search = document.querySelector("#drink-search");
  const list = document.querySelector("#menu-items");
  const count = document.querySelector("#menu-count");
  const noResults = document.querySelector("#menu-empty");
  const addStatus = document.querySelector("#menu-status");
  const openCart = document.querySelector("#open-cart");
  const cartItems = document.querySelector("#cart-items");
  const cartEmpty = document.querySelector("#cart-empty");
  const cartCount = document.querySelector("#cart-count");
  const cartTotal = document.querySelector("#cart-total");
  const clearCart = document.querySelector("#clear-cart");
  const drinkTemplate = document.querySelector("#drink-card-template");
  const cartTemplate = document.querySelector("#cart-item-template");
  const submit = form.querySelector('[type="submit"]');
  const status = document.querySelector("#order-status");
  const cartKey = "coffi-cart";
  let category = "Popular";
  let query = "";
  let cart = [];

  try {
    const saved = JSON.parse(localStorage.getItem(cartKey) || "[]");
    if (Array.isArray(saved)) {
      saved.forEach((item) => {
        if (!app.findDrink(item.id) || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 8) return;
        const existing = cart.find((entry) => entry.id === item.id);
        if (existing) existing.quantity = Math.min(8, existing.quantity + item.quantity);
        else cart.push({ id: item.id, quantity: item.quantity });
      });
    }
  } catch {
    cart = [];
  }

  const total = () => cart.reduce((sum, item) => sum + app.findDrink(item.id).price * item.quantity, 0);
  const quantity = () => cart.reduce((sum, item) => sum + item.quantity, 0);
  const saveCart = () => localStorage.setItem(cartKey, JSON.stringify(cart));

  const renderDrink = (drink, showImage) => {
    const card = drinkTemplate.content.firstElementChild.cloneNode(true);
    card.querySelector("[data-drink-category]").textContent = drink.category;
    card.querySelector("[data-drink-name]").textContent = drink.name;
    card.querySelector("[data-drink-description]").textContent = drink.description;
    card.querySelector("[data-drink-price]").textContent = `${app.money(drink.price)} ₸`;
    const add = card.querySelector("[data-add-drink]");
    add.dataset.addDrink = drink.id;
    add.setAttribute("aria-label", `Add ${drink.name} to basket`);
    if (showImage && drink.image) {
      const image = card.querySelector("[data-drink-image]");
      image.src = drink.image;
      image.alt = `Concept image of ${drink.name.toLowerCase()}`;
      card.querySelector("[data-image-wrap]").classList.remove("is-hidden");
    }
    return card;
  };

  const renderMenu = () => {
    const matches = app.drinks.filter((drink) => {
      const inCategory = category === "All drinks" || (category === "Popular" ? popular.includes(drink.id) : drink.category === category);
      return inCategory && `${drink.name} ${drink.description}`.toLowerCase().includes(query);
    });
    list.replaceChildren(...matches.map((drink) => renderDrink(drink, category === "Popular")));
    count.textContent = `${matches.length} ${matches.length === 1 ? "drink" : "drinks"}`;
    noResults.classList.toggle("is-hidden", matches.length > 0);
    categoryNav.querySelectorAll("[data-category]").forEach((button) => {
      const active = button.dataset.category === category;
      button.classList.toggle("btn-warning", active);
      button.classList.toggle("btn-outline-light", !active);
      button.setAttribute("aria-pressed", String(active));
    });
  };

  const renderCart = () => {
    cartItems.replaceChildren(...cart.map((item) => {
      const drink = app.findDrink(item.id);
      const line = cartTemplate.content.firstElementChild.cloneNode(true);
      line.dataset.cartId = drink.id;
      line.querySelector("[data-cart-name]").textContent = drink.name;
      line.querySelector("[data-cart-price]").textContent = `${app.money(drink.price)} ₸ each`;
      line.querySelector("[data-cart-quantity]").textContent = item.quantity;
      line.querySelectorAll("[data-cart-action]").forEach((button) => {
        button.setAttribute("aria-label", `${button.textContent.trim()} ${drink.name}`);
      });
      return line;
    }));
    const items = quantity();
    cartCount.textContent = `${items} ${items === 1 ? "item" : "items"}`;
    cartTotal.textContent = `${app.money(total())} ₸`;
    cartEmpty.classList.toggle("is-hidden", cart.length > 0);
    clearCart.disabled = cart.length === 0;
    submit.disabled = cart.length === 0;
    openCart.textContent = `Basket (${items}) · ${app.money(total())} ₸`;
    openCart.setAttribute("aria-label", `Open your basket, ${items} items, ${app.money(total())} tenge`);
  };

  const resetFilters = () => {
    category = "Popular";
    query = "";
    search.value = "";
    app.hideStatus(addStatus);
    renderMenu();
  };

  const modalInstance = window.bootstrap.Modal.getOrCreateInstance(modal);
  openCart.addEventListener("click", () => modalInstance.show());
  categoryNav.addEventListener("click", (event) => {
    if (event.target.closest("#reset-filters")) return resetFilters();
    const button = event.target.closest("[data-category]");
    if (!button) return;
    category = button.dataset.category;
    app.hideStatus(addStatus);
    renderMenu();
  });
  search.addEventListener("input", () => {
    query = search.value.trim().toLowerCase();
    app.hideStatus(addStatus);
    renderMenu();
  });
  list.addEventListener("click", (event) => {
    const button = event.target.closest("[data-add-drink]");
    if (!button) return;
    const drink = app.findDrink(button.dataset.addDrink);
    const item = cart.find((entry) => entry.id === drink.id);
    if (item) item.quantity = Math.min(8, item.quantity + 1);
    else cart.push({ id: drink.id, quantity: 1 });
    saveCart();
    renderCart();
    app.setStatus(addStatus, "success", `${drink.name} added to your basket.`);
  });
  modal.addEventListener("click", (event) => {
    const button = event.target.closest("[data-cart-action]");
    if (!button) return;
    const line = button.closest("[data-cart-id]");
    const item = cart.find((entry) => entry.id === line.dataset.cartId);
    if (button.dataset.cartAction === "increase") item.quantity = Math.min(8, item.quantity + 1);
    if (button.dataset.cartAction === "decrease") item.quantity -= 1;
    if (button.dataset.cartAction === "remove" || item.quantity < 1) cart.splice(cart.indexOf(item), 1);
    saveCart();
    renderCart();
  });
  clearCart.addEventListener("click", () => {
    cart = [];
    saveCart();
    renderCart();
  });

  const legacyCategories = { "#hot-coffee": "Coffee", "#cold-coffee": "Cold coffee", "#tea-more": "Tea & chocolate" };
  document.querySelectorAll('.jump-link a[href^="#hot-coffee"], .jump-link a[href^="#cold-coffee"], .jump-link a[href^="#tea-more"], .jump-link a[href="#customizations"]').forEach((link) => {
    link.classList.replace("btn-outline-dark", "btn-outline-light");
    const target = link.getAttribute("href");
    if (!legacyCategories[target]) return;
    link.href = "#menu-items";
    link.addEventListener("click", (event) => {
      event.preventDefault();
      category = legacyCategories[target];
      query = "";
      search.value = "";
      renderMenu();
      list.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const name = document.querySelector("#order-name");
  const phone = document.querySelector("#order-phone");
  [name, phone].forEach((field) => field.addEventListener("input", () => field.setCustomValidity("")));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    app.hideStatus(status);
    name.setCustomValidity(name.value.trim().length >= 2 ? "" : "Enter your name.");
    phone.setCustomValidity(/^\+?[\d\s()\-]{7,}$/.test(phone.value.trim()) ? "" : "Enter a valid phone number.");
    if (!cart.length) app.setStatus(status, "error", "Add at least one drink before preparing the request.");
    if (!cart.length || !form.reportValidity()) return;
    const order = {
      ...Object.fromEntries(new FormData(form)),
      items: cart.map((item) => ({ ...item, name: app.findDrink(item.id).name, price: app.findDrink(item.id).price })),
      total: total(),
    };
    localStorage.setItem("coffi-order-plan", JSON.stringify(order));
    app.setStatus(status, "success", `Demo request ${app.reference("ORDER")} is saved on this device. No order or payment was sent.`);
  });
  form.addEventListener("reset", () => window.setTimeout(() => app.hideStatus(status)));

  renderMenu();
  renderCart();
})();
