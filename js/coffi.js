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
    "hot-chocolate": { 350: 1490 },
    cocoa: { 350: 1390 },
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
    "hot-chocolate": "Hot chocolate",
    cocoa: "Cocoa",
    "orange-juice": "Orange juice",
    "green-smoothie": "Green smoothie",
    "berry-lemonade": "Berry lemonade",
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
      total.textContent = `${count} × ${drinkNames[drink.value]} · ${size.value} ml = ${money.format(unitPrice * count)} ₸`;
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

    orderForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(orderForm));
      localStorage.setItem("coffi-order-plan", JSON.stringify(data));
      status.className = "state-message is-success p-3 rounded-3";
      status.textContent = `Your ${drinkNames[data.order_drink]} plan is saved on this device. Call Coffi at +7 (701) 880-41-04 to confirm availability and pickup time.`;
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
      `Thanks, ${data.book_name}. Your request for ${data.book_date} at ${data.book_time} for ${data.book_guests} guest(s) is saved on this device. Call Coffi to confirm availability; no payment has been taken.`,
  );
  setupLocalForm(
    "#feedback-form",
    "#feedback-status",
    (data) =>
      `Thanks, ${data.client_name}. Your feedback is saved on this device. The live cafe version can connect this form to the team's inbox later.`,
  );
})();
