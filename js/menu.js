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
  const requestedDrink = app.findDrink(new URLSearchParams(location.search).get("drink"));
  if (requestedDrink) category = "All drinks";

  const hideAddStatus = () => {
    window.clearTimeout(addStatusTimeout);
    addStatusTimeout = null;
    app.hideStatus(addStatus);
  };
  const showAddStatus = (message, kind = "success") => {
    window.clearTimeout(addStatusTimeout);
    app.setStatus(addStatus, kind, message);
    addStatusTimeout = window.setTimeout(hideAddStatus, 3000);
  };

  const loadCart = () => {
    cart = [];
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
      app.setStatus(addStatus, "error", "The saved basket could not be read. You can still use a new basket on this page.");
    }

  };
  loadCart();

  const total = () => cart.reduce((sum, item) => sum + app.findDrink(item.id).price * item.quantity, 0);
  const quantity = () => cart.reduce((sum, item) => sum + item.quantity, 0);
  const saveCart = () => {
    app.hideStatus(status);
    try {
      localStorage.setItem(cartKey, JSON.stringify(cart));
      return true;
    } catch {
      return false;
    }
  };

  const renderDrink = (drink) => {
    const card = drinkTemplate.content.firstElementChild.cloneNode(true);
    card.id = `drink-${drink.id}`;
    card.dataset.drinkId = drink.id;
    if (requestedDrink?.id === drink.id) card.classList.add("requested-drink");
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
        if (button.dataset.cartAction === "increase") button.disabled = item.quantity >= 8;
      });
      return line;
    }));
    const items = quantity();
    cartCount.textContent = `${items} ${items === 1 ? "item" : "items"}`;
    cartTotal.textContent = `${app.money(total())} ₸`;
    cartEmpty.classList.toggle("is-hidden", cart.length > 0);
    clearCart.disabled = cart.length === 0;
    submit.disabled = cart.length === 0;
    openCart.querySelector("[data-basket-count]").textContent = items;
    openCart.setAttribute("aria-label", `Open your basket, ${items} items, ${app.money(total())} tenge`);
  };

  const resetFilters = () => {
    category = "Popular";
    query = "";
    search.value = "";
    hideAddStatus();
    renderMenu();
  };

  const modalInstance = window.bootstrap.Offcanvas.getOrCreateInstance(modal);
  openCart.addEventListener("click", () => {
    hideAddStatus();
    bootstrap.Toast.getInstance(document.querySelector("#order-saved"))?.hide();
    modalInstance.show();
  });
  if (new URLSearchParams(location.search).get("basket") === "1") {
    modalInstance.show();
  }
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
    if (item?.quantity === 8) {
      showAddStatus(`${drink.name} already has the maximum quantity of 8.`, "error");
      return;
    }
    if (item) item.quantity += 1;
    else cart.push({ id: drink.id, quantity: 1 });
    const saved = saveCart();
    renderCart();
    showAddStatus(
      saved ? `Added to basket: ${drink.name}.` : `Added ${drink.name} for this page, but the basket could not be saved in this browser.`,
      saved ? "success" : "error"
    );
  });
  modal.addEventListener("click", (event) => {
    const button = event.target.closest("[data-cart-action]");
    if (!button) return;
    const line = button.closest("[data-cart-id]");
    const item = cart.find((entry) => entry.id === line.dataset.cartId);
    if (button.dataset.cartAction === "increase") item.quantity = Math.min(8, item.quantity + 1);
    if (button.dataset.cartAction === "decrease") item.quantity -= 1;
    if (button.dataset.cartAction === "remove" || item.quantity < 1) cart.splice(cart.indexOf(item), 1);
    const action = button.dataset.cartAction;
    const drinkId = item.id;
    const saved = saveCart();
    renderCart();
    const updatedLine = [...cartItems.children].find((node) => node.dataset.cartId === drinkId);
    const nextButton = updatedLine?.querySelector(`[data-cart-action="${action}"]:not(:disabled)`)
      || updatedLine?.querySelector("button:not(:disabled)")
      || modal.querySelector('[data-bs-dismiss="offcanvas"]');
    nextButton.focus();
    if (!saved) showAddStatus("The basket changed on this page, but it could not be saved in this browser.", "error");
  });
  clearCart.addEventListener("click", () => {
    cart = [];
    const saved = saveCart();
    renderCart();
    if (!saved) showAddStatus("The basket was cleared on this page, but the change could not be saved in this browser.", "error");
  });

  const name = document.querySelector("#order-name");
  const phone = document.querySelector("#order-phone");
  const validName = (value) => /^(?=(?:.*\p{L}){2})[\p{L}\s'-]+$/u.test(value.trim());
  const normalizePhone = (value) => {
    const digits = value.replace(/\D/g, "");
    return digits.length === 11 && digits.startsWith("8") ? `7${digits.slice(1)}` : digits;
  };
  const validPhone = (value) => /^\+?[\d\s()-]+$/.test(value.trim()) && /^7\d{10}$/.test(normalizePhone(value));
  [name, phone].forEach((field) => field.addEventListener("input", () => field.setCustomValidity("")));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    app.hideStatus(status);
    name.setCustomValidity(validName(name.value) ? "" : "Enter at least two letters. Spaces, apostrophes, and hyphens are allowed.");
    phone.setCustomValidity(validPhone(phone.value) ? "" : "Enter 11 digits starting with +7, 7, or 8.");
    if (!cart.length) app.setStatus(status, "error", "Add at least one drink before preparing the request.");
    if (!cart.length || !form.reportValidity()) return;
    phone.value = normalizePhone(phone.value);
    const order = {
      ...Object.fromEntries(new FormData(form)),
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      items: cart.map((item) => ({ ...item, name: app.findDrink(item.id).name, price: app.findDrink(item.id).price })),
      total: total(),
    };
    try {
      window.CoffiOrders.save(order);
      cart = [];
      const basketSaved = saveCart();
      renderCart();
      hideAddStatus();
      document.querySelector("#order-saved-message").textContent = basketSaved
        ? "You can view your order anytime in Account → My orders."
        : "Your order is saved, but the empty basket could not be saved.";
      document.querySelector("#order-saved-link").href = `account.html#order-${order.id}`;
      modal.addEventListener("hidden.bs.offcanvas", () => {
        openCart.focus();
        bootstrap.Toast.getOrCreateInstance(document.querySelector("#order-saved")).show();
      }, { once: true });
      modalInstance.hide();
    } catch {
      app.setStatus(status, "error", "The request was prepared, but this browser did not allow it to be saved. Nothing was sent or paid for.");
    }
  });
  form.addEventListener("input", () => app.hideStatus(status));
  form.addEventListener("reset", () => window.setTimeout(() => {
    name.setCustomValidity("");
    phone.setCustomValidity("");
    app.hideStatus(status);
  }));

  window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;
    loadCart();
    renderCart();
    modalInstance.hide();
    hideAddStatus();
  });
  window.addEventListener("storage", (event) => {
    if (event.key !== cartKey && event.key !== null) return;
    loadCart();
    renderCart();
    app.hideStatus(status);
  });
  renderMenu();
  renderCart();
  if (requestedDrink) requestAnimationFrame(() => {
    document.querySelector(`#drink-${CSS.escape(requestedDrink.id)}`)?.scrollIntoView({ block: "center" });
  });
})();
