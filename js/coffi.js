(() => {
  const money = new Intl.NumberFormat("kk-KZ");
  const prices = {
    americano: { 250: 990, 350: 1090, 450: 1190 },
    cappuccino: { 250: 1290, 350: 1390, 450: 1390 },
    latte: { 250: 1290, 350: 1390, 450: 1490 },
    bumble: { 400: 1790 },
    "iced-americano": { 400: 1490 },
    "iced-latte": { 400: 1590 },
    "espresso-tonic": { 400: 1790 },
    "flat-white": { ask: 1290 },
    mocha: { 350: 1490, 450: 1590 },
    raf: { 350: 1790, 450: 1890 },
    "sea-buckthorn-tea": { ask: 1590 },
    "ginger-tea": { ask: 1590 },
    "moroccan-tea": { ask: 1590 },
    "hot-chocolate": { 350: 1490 },
    cocoa: { 350: 1390 },
    "lemon-tart-raf": { ask: 1890 },
    "apple-cinnamon-raf": { ask: 1890 },
    "orange-juice": { 400: 2800 },
    "green-smoothie": { 400: 2800 },
    "berry-lemonade": { 400: 1590 },
  };
  const drinkNames = {
    americano: "Americano",
    cappuccino: "Cappuccino",
    latte: "Latte",
    bumble: "Bumble coffee",
    "iced-americano": "Iced Americano",
    "iced-latte": "Iced latte",
    "espresso-tonic": "Espresso tonic",
    "flat-white": "Flat white",
    mocha: "Mocha",
    raf: "Raf",
    "sea-buckthorn-tea": "Sea buckthorn tea",
    "ginger-tea": "Ginger tea",
    "moroccan-tea": "Moroccan tea",
    "hot-chocolate": "Hot chocolate",
    cocoa: "Cocoa",
    "lemon-tart-raf": "Lemon tart raf",
    "apple-cinnamon-raf": "Apple & cinnamon raf",
    "orange-juice": "Orange juice",
    "green-smoothie": "Green smoothie",
    "berry-lemonade": "Berry lemonade",
  };
  const getDrinkName = (id) =>
    window.CoffiI18n?.drinkName(id) || drinkNames[id] || id;
  const formatMoney = (value) =>
    window.CoffiI18n?.formatMoney(value) || money.format(value);
  const cartStorageKey = "coffi-cart";
  const cartText = (key) => window.CoffiI18n?.t(key) || key;
  const formatCartSize = (size) =>
    size === "ask" ? cartText("askBarista") : `${size} ml`;

  const setupCart = () => {
    const cartPanel = document.querySelector("#cart");
    if (!cartPanel) return;

    const cartItems = document.querySelector("#cart-items");
    const cartEmpty = document.querySelector("#cart-empty");
    const cartTotal = document.querySelector("#cart-total");
    const cartCount = document.querySelector("#cart-count");
    const cartStatus = document.querySelector("#cart-status");
    let cart = [];

    try {
      const saved = JSON.parse(localStorage.getItem(cartStorageKey));
      if (Array.isArray(saved)) {
        cart = saved.filter(
          (item) =>
            prices[item.id] &&
            Object.hasOwn(prices[item.id], item.size) &&
            Number(item.quantity) > 0,
        );
      }
    } catch {
      // Ignore an unavailable or malformed local cart.
    }

    const saveCart = () => {
      localStorage.setItem(cartStorageKey, JSON.stringify(cart));
    };

    const updateMenuControls = () => {
      document.querySelectorAll("[data-cart-add]").forEach((button) => {
        const id = button.dataset.cartAdd;
        button.textContent = cartText("cartAdd");
        button.setAttribute(
          "aria-label",
          `${cartText("cartAdd")}: ${getDrinkName(id)}`,
        );
      });
      document.querySelectorAll("[data-cart-size]").forEach((select) => {
        const id = select.dataset.cartSize;
        [...select.options].forEach((option) => {
          const price = prices[id][option.value];
          option.textContent = `${formatCartSize(option.value)} · ${formatMoney(price)} ₸`;
        });
        select.setAttribute(
          "aria-label",
          `${cartText("cartSizeLabel")}: ${getDrinkName(id)}`,
        );
      });
    };

    const render = () => {
      cartItems.replaceChildren();
      const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      const total = cart.reduce(
        (sum, item) => sum + prices[item.id][item.size] * item.quantity,
        0,
      );
      cartEmpty.classList.toggle("d-none", cart.length > 0);
      cartCount.textContent = itemCount;
      cartTotal.textContent = `${formatMoney(total)} ₸`;

      cart.forEach((item, index) => {
        const line = document.createElement("div");
        line.className =
          "cart-line border rounded-3 p-3 d-flex flex-wrap align-items-center justify-content-between gap-3";

        const info = document.createElement("div");
        info.className = "cart-line-info";
        const name = document.createElement("strong");
        name.className = "d-block";
        name.textContent = getDrinkName(item.id);
        const details = document.createElement("span");
        details.className = "small text-body-secondary";
        details.textContent = `${formatCartSize(item.size)} · ${formatMoney(prices[item.id][item.size])} ₸`;
        info.append(name, details);

        const controls = document.createElement("div");
        controls.className = "d-flex align-items-center gap-2";
        const decrease = document.createElement("button");
        decrease.className = "btn btn-outline-secondary btn-sm rounded-circle";
        decrease.type = "button";
        decrease.dataset.cartAction = "decrease";
        decrease.dataset.cartIndex = index;
        decrease.setAttribute("aria-label", cartText("cartDecrease"));
        decrease.textContent = "−";
        const quantity = document.createElement("output");
        quantity.className = "cart-line-quantity fw-semibold";
        quantity.textContent = item.quantity;
        const increase = document.createElement("button");
        increase.className = "btn btn-outline-secondary btn-sm rounded-circle";
        increase.type = "button";
        increase.dataset.cartAction = "increase";
        increase.dataset.cartIndex = index;
        increase.setAttribute("aria-label", cartText("cartIncrease"));
        increase.textContent = "+";
        const remove = document.createElement("button");
        remove.className = "btn btn-link btn-sm cart-remove";
        remove.type = "button";
        remove.dataset.cartAction = "remove";
        remove.dataset.cartIndex = index;
        remove.textContent = cartText("cartRemove");
        controls.append(decrease, quantity, increase, remove);
        line.append(info, controls);
        cartItems.append(line);
      });
      updateMenuControls();
    };

    const addMenuControls = () => {
      const names = Object.fromEntries(
        Object.entries(drinkNames).map(([id, name]) => [
          name.toLowerCase(),
          id,
        ]),
      );
      document
        .querySelectorAll("#price-table-section tbody tr")
        .forEach((row) => {
          const nameElement = row.querySelector("th[scope='row'] .fw-semibold");
          const priceCell = row.querySelector("td:last-child");
          if (!nameElement || !priceCell) return;
          const id = names[nameElement.textContent.trim().toLowerCase()];
          if (!id || row.querySelector("[data-cart-add]")) return;

          const controls = document.createElement("div");
          controls.className =
            "cart-row-controls d-flex flex-column align-items-stretch gap-2 mt-2";
          const select = document.createElement("select");
          select.className = "form-select form-select-sm";
          select.dataset.cartSize = id;
          Object.keys(prices[id]).forEach((size) => {
            const option = new Option("", size);
            select.append(option);
          });
          const button = document.createElement("button");
          button.type = "button";
          button.className = "btn btn-primary btn-sm rounded-pill";
          button.dataset.cartAdd = id;
          controls.append(select, button);
          priceCell.append(controls);
        });
      updateMenuControls();
    };

    const showCartStatus = (message, success = true) => {
      cartStatus.className = `state-message ${success ? "is-success" : "is-error"} p-3 rounded-3 mt-3`;
      cartStatus.textContent = message;
    };

    cartPanel.addEventListener("click", (event) => {
      const action = event.target.closest("[data-cart-action]");
      if (!action) return;
      const index = Number(action.dataset.cartIndex);
      if (!cart[index]) return;
      if (action.dataset.cartAction === "increase") {
        cart[index].quantity = Math.min(8, cart[index].quantity + 1);
      } else if (action.dataset.cartAction === "decrease") {
        cart[index].quantity -= 1;
        if (cart[index].quantity <= 0) cart.splice(index, 1);
      } else if (action.dataset.cartAction === "remove") {
        cart.splice(index, 1);
      }
      saveCart();
      render();
    });

    document.addEventListener("click", (event) => {
      const addButton = event.target.closest("[data-cart-add]");
      if (!addButton) return;
      const id = addButton.dataset.cartAdd;
      const row = addButton.closest("tr");
      const size = row.querySelector(`[data-cart-size="${id}"]`).value;
      const existing = cart.find(
        (item) => item.id === id && item.size === size,
      );
      if (existing) {
        existing.quantity = Math.min(8, existing.quantity + 1);
      } else {
        cart.push({ id, size, quantity: 1 });
      }
      saveCart();
      render();
      showCartStatus(`${getDrinkName(id)} — ${cartText("cartAdded")}`);
    });

    document.querySelector("#cart-clear").addEventListener("click", () => {
      cart = [];
      localStorage.removeItem(cartStorageKey);
      render();
      cartStatus.className = "state-message is-hidden p-3 rounded-3 mt-3";
      cartStatus.textContent = "";
    });

    document.querySelector("#cart-to-order").addEventListener("click", () => {
      if (!cart.length) {
        showCartStatus(cartText("cartEmpty"), false);
        return;
      }
      const orderForm = document.querySelector("#order-form");
      const notes = document.querySelector("#order-notes");
      const first = cart[0];
      const summary = cart
        .map(
          (item) =>
            `${getDrinkName(item.id)} ${formatCartSize(item.size)} × ${item.quantity}`,
        )
        .join(", ");
      if (orderForm && prices[first.id]) {
        const drink = orderForm.querySelector("#order-drink");
        const size = orderForm.querySelector("#order-size");
        const quantity = orderForm.querySelector("#order-quantity");
        const supported = [...drink.options].some(
          (option) => option.value === first.id,
        );
        if (supported) {
          drink.value = first.id;
          drink.dispatchEvent(new Event("change", { bubbles: true }));
          size.value = first.size;
          quantity.value = first.quantity;
          quantity.dispatchEvent(new Event("input", { bubbles: true }));
        }
      }
      if (notes) {
        notes.value = [notes.value, `Cart: ${summary}`]
          .filter(Boolean)
          .join("\n");
      }
      showCartStatus(cartText("cartReady"));
      document.querySelector("#order-builder")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    window.addEventListener("coffi:language", render);
    addMenuControls();
    render();
  };

  const orderForm = document.querySelector("#order-form");
  if (orderForm) {
    const drink = orderForm.querySelector("#order-drink");
    const size = orderForm.querySelector("#order-size");
    const quantity = orderForm.querySelector("#order-quantity");
    const total = document.querySelector("#order-total");
    const status = orderForm.querySelector("#order-status");

    const updateSizeOptions = () => {
      const available = Object.keys(prices[drink.value]);
      const selected = size.value;
      size.replaceChildren(
        ...available.map((value) => new Option(`${value} ml`, value)),
      );
      size.value = available.includes(selected) ? selected : available[0];
    };

    const updateTotal = () => {
      const unitPrice = prices[drink.value][size.value] || 0;
      const count = Math.max(1, Number(quantity.value) || 1);
      total.textContent = `${count} × ${getDrinkName(drink.value)} · ${size.value} ml = ${formatMoney(unitPrice * count)} ₸`;
    };

    drink.addEventListener("change", () => {
      updateSizeOptions();
      updateTotal();
    });
    size.addEventListener("change", updateTotal);
    quantity.addEventListener("input", updateTotal);
    orderForm.addEventListener("reset", () => {
      localStorage.removeItem("coffi-order-plan");
      status.className = "state-message is-hidden p-3 rounded-3";
      status.textContent = "";
      window.setTimeout(() => {
        updateSizeOptions();
        updateTotal();
      });
    });
    if (!prices[drink.value]) drink.value = "americano";
    updateSizeOptions();
    updateTotal();
    window.addEventListener("coffi:language", updateTotal);

    orderForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(orderForm));
      localStorage.setItem("coffi-order-plan", JSON.stringify(data));
      status.className = "state-message is-success p-3 rounded-3";
      status.textContent =
        window.CoffiI18n?.message(
          "orderSaved",
          data,
          getDrinkName(data.order_drink),
        ) ||
        `Your ${drinkNames[data.order_drink]} plan is saved on this device. Call Coffi at +7 (701) 880-41-04 to confirm availability and pickup time.`;
    });

    try {
      const saved = JSON.parse(localStorage.getItem("coffi-order-plan"));
      if (saved?.order_drink && prices[saved.order_drink]) {
        drink.value = saved.order_drink;
        updateSizeOptions();
        if (Object.hasOwn(prices[drink.value], saved.order_size)) {
          size.value = saved.order_size;
        }
        quantity.value = Math.min(8, Math.max(1, saved.order_quantity || 1));
        orderForm.querySelector("#order-service").value =
          saved.order_service || "takeaway";
        orderForm.querySelector("#order-name").value = saved.order_name || "";
        orderForm.querySelector("#order-phone").value = saved.order_phone || "";
        orderForm.querySelector("#order-notes").value = saved.order_notes || "";
        updateTotal();
      }
    } catch {
      // Ignore an unavailable or malformed local draft.
    }
  }

  const setupLocalForm = (formId, statusId, message) => {
    const form = document.querySelector(formId);
    const status = document.querySelector(statusId);
    if (!form || !status) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      localStorage.setItem(formId.slice(1), JSON.stringify(data));
      status.className = "state-message is-success p-3 rounded-3";
      status.textContent = message(data);
    });

    form.addEventListener("reset", () => {
      localStorage.removeItem(formId.slice(1));
      status.className = "state-message is-hidden p-3 rounded-3";
      status.textContent = "";
    });

    try {
      const saved = JSON.parse(localStorage.getItem(formId.slice(1)));
      if (saved) {
        Object.entries(saved).forEach(([name, value]) => {
          const controls = form.elements.namedItem(name);
          if (!controls) return;
          if (controls instanceof RadioNodeList) {
            controls.value = value;
          } else if (controls.type === "checkbox") {
            controls.checked = Boolean(value);
          } else {
            controls.value = value;
          }
        });
        if (formId === "#feedback-form") {
          const visitDate = form.elements.namedItem("visit_date");
          if (visitDate.value > localToday) visitDate.value = localToday;
        }
      }
    } catch {
      // Ignore an unavailable or malformed local draft.
    }
  };

  const today = new Date();
  const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000,
  )
    .toISOString()
    .slice(0, 10);
  const bookingDate = document.querySelector("#book-date");
  if (bookingDate) bookingDate.min = localToday;

  const feedbackDate = document.querySelector("#visit-date");
  if (feedbackDate) feedbackDate.max = localToday;

  setupLocalForm(
    "#booking-form",
    "#booking-status",
    (data) =>
      window.CoffiI18n?.message("bookingSaved", data) ||
      `Thanks, ${data.book_name}. Your request for ${data.book_date} at ${data.book_time} for ${data.book_guests} guest(s) is saved on this device. Call Coffi to confirm availability; no payment has been taken.`,
  );
  setupLocalForm(
    "#feedback-form",
    "#feedback-status",
    (data) =>
      window.CoffiI18n?.message("feedbackSaved", data) ||
      `Thanks, ${data.client_name}. Your feedback is saved on this device. The live cafe version can connect this form to the team's inbox later.`,
  );
  setupCart();
  if (window.CoffiI18n) {
    window.CoffiI18n.applyLanguage(window.CoffiI18n.language);
  }
})();
