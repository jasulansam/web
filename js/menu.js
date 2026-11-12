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
  let addStatusTimeout;

  const hideAddStatus = () => {
    window.clearTimeout(addStatusTimeout);
    addStatusTimeout = null;
    app.hideStatus(addStatus);
  };
  const showAddStatus = (message) => {
    window.clearTimeout(addStatusTimeout);
    app.setStatus(addStatus, "success", message);
    addStatusTimeout = window.setTimeout(hideAddStatus, 3000);
  };

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

  const renderDrink = (drink) => {
    const card = drinkTemplate.content.firstElementChild.cloneNode(true);
    card.querySelector("[data-drink-category]").textContent = drink.category;
    card.querySelector("[data-drink-name]").textContent = drink.name;
    card.querySelector("[data-drink-description]").textContent = drink.description;
    card.querySelector("[data-drink-price]").textContent = `${app.money(drink.price)} ₸`;
    const add = card.querySelector("[data-add-drink]");
    add.dataset.addDrink = drink.id;
    add.setAttribute("aria-label", `Add ${drink.name} to basket`);
    if (drink.image) {
      const image = card.querySelector("[data-drink-image]");
      image.src = drink.image;
      image.alt = `Illustrative photo for ${drink.name.toLowerCase()}`;
      image.style.objectPosition = drink.imagePosition || "50% 50%";
      card.querySelector("[data-image-wrap]").classList.remove("is-hidden");
    }
    return card;
  };

  const renderMenu = () => {
    const matches = app.drinks.filter((drink) => {
      const inCategory = category === "All drinks" || (category === "Popular" ? popular.includes(drink.id) : drink.category === category);
      return inCategory && `${drink.name} ${drink.description}`.toLowerCase().includes(query);
    });
    list.replaceChildren(...matches.map(renderDrink));
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
    hideAddStatus();
    renderMenu();
  };

  const modalInstance = window.bootstrap.Modal.getOrCreateInstance(modal);
  openCart.addEventListener("click", () => modalInstance.show());
  categoryNav.addEventListener("click", (event) => {
    if (event.target.closest("#reset-filters")) return resetFilters();
    const button = event.target.closest("[data-category]");
    if (!button) return;
    category = button.dataset.category;
    hideAddStatus();
    renderMenu();
  });
  search.addEventListener("input", () => {
    query = search.value.trim().toLowerCase();
    hideAddStatus();
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
    showAddStatus(`Added to basket: ${drink.name}.`);
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

  const name = document.querySelector("#order-name");
  const phone = document.querySelector("#order-phone");

  name.addEventListener("input", () => {
    name.value = name.value.replace(/[^A-Za-zА-Яа-яЁё\s'-]/g, "");
  });

  phone.addEventListener("input", () => {
    phone.value = phone.value.replace(/[^0-9]/g, "");
  });
  [name, phone].forEach((field) => field.addEventListener("input", () => field.setCustomValidity("")));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    app.hideStatus(status);
    name.setCustomValidity(/^[A-Za-zА-Яа-яЁё\s'-]{2,}$/.test(name.value.trim()) ? "" : "Enter your name using letters only.");
    phone.setCustomValidity(/^7\d{10}$/.test(phone.value) ? "" : "Phone number must start with 7.");
    if (!cart.length) app.setStatus(status, "error", "Add at least one drink before preparing the request.");
    if (!cart.length || !form.reportValidity()) return;
    const order = {
      ...Object.fromEntries(new FormData(form)),
      items: cart.map((item) => ({ ...item, name: app.findDrink(item.id).name, price: app.findDrink(item.id).price })),
      total: total(),
    };
    localStorage.setItem("coffi-order-plan", JSON.stringify(order));
    app.setStatus(status, "success", `Thank you! Your ${app.reference("ORDER")} has been successfully placed and payment is confirmed.`);
  });
  form.addEventListener("reset", () => window.setTimeout(() => app.hideStatus(status)));

  renderMenu();
  renderCart();
})();
