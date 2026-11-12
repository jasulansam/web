/**
 * Coffi Coffee Shop — Assignment 4 jQuery Interactive Script
 * jQuery version: 3.7.1 (loaded via CDN)
 * $(function() { ... }) is the short form of $(document).ready(). It delays script execution
 * until the DOM structure is fully loaded, ensuring DOM elements exist before query/event bindings.
 */

$(function () {
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

  const getDrinkName = (id) => window.CoffiI18n?.drinkName(id) || drinkNames[id] || id;
  const formatMoney = (val) => window.CoffiI18n?.formatMoney(val) || money.format(val);
  const cartText = (key) => window.CoffiI18n?.t(key) || key;
  const formatCartSize = (size) => (size === "ask" ? cartText("askBarista") : `${size} ml`);
  const cartStorageKey = "coffi-cart";

  // ===========================================================================
  // 1. SHOPPING CART (Dynamic DOM creation, Delegation, Effects)
  // ===========================================================================
  const $cart = $("#cart");
  if ($cart.length) {
    let cart = [];
    try {
      const saved = JSON.parse(localStorage.getItem(cartStorageKey));
      if (Array.isArray(saved)) {
        cart = saved.filter(
          (item) => prices[item.id] && Object.hasOwn(prices[item.id], item.size) && Number(item.quantity) > 0,
        );
      }
    } catch {
      // Ignore unavailable storage
    }

    const saveCart = () => localStorage.setItem(cartStorageKey, JSON.stringify(cart));

    /**
     * REWRITE 1: Cart item list rendering from array
     * Replaced: document.createElement, replaceChildren, classList.toggle, textContent
     * With: $cartItems.empty(), .append(), .toggleClass(), .text().
     * Result: Significantly shorter and clearer; eliminates over 40 lines of node creation boilerplate.
     */
    const renderCart = () => {
      const $cartItems = $("#cart-items").empty();
      const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      const total = cart.reduce((sum, item) => sum + prices[item.id][item.size] * item.quantity, 0);

      // Traversal & DOM modification with chaining
      $("#cart-empty").toggleClass("d-none", cart.length > 0);
      $("#cart-count").text(itemCount);
      $("#cart-total").text(`${formatMoney(total)} ₸`);

      // Dynamic markup generation from array with .append()
      cart.forEach((item, index) => {
        const itemHtml = `
          <div class="cart-line border rounded-3 p-3 d-flex flex-wrap align-items-center justify-content-between gap-3" data-index="${index}">
            <div class="cart-line-info">
              <strong class="d-block">${getDrinkName(item.id)}</strong>
              <span class="small text-body-secondary">${formatCartSize(item.size)} · ${formatMoney(prices[item.id][item.size])} ₸</span>
            </div>
            <div class="d-flex align-items-center gap-2">
              <button class="btn btn-outline-secondary btn-sm rounded-circle" type="button" data-cart-action="decrease" data-index="${index}" aria-label="${cartText("cartDecrease")}">−</button>
              <output class="cart-line-quantity fw-semibold">${item.quantity}</output>
              <button class="btn btn-outline-secondary btn-sm rounded-circle" type="button" data-cart-action="increase" data-index="${index}" aria-label="${cartText("cartIncrease")}">+</button>
              <button class="btn btn-link btn-sm cart-remove text-danger" type="button" data-cart-action="remove" data-index="${index}">${cartText("cartRemove")}</button>
            </div>
          </div>`;
        $cartItems.append(itemHtml);
      });
      updateMenuControls();
    };

    /**
     * REWRITE 2: Menu controls injection into pricing table
     * Replaced: document.querySelectorAll + forEach + querySelector
     * With: $("#price-table-section tbody tr").each(), $(this).find(), and .append().
     * Result: Substantially shorter and more expressive, leveraging jQuery traversal.
     */
    const addMenuControls = () => {
      const names = Object.fromEntries(
        Object.entries(drinkNames).map(([id, name]) => [name.toLowerCase(), id]),
      );

      // Filter: :not(:has([data-cart-add])) prevents duplicate injection
      $("#price-table-section tbody tr:not(:has([data-cart-add]))").each(function () {
        const $row = $(this);
        const nameText = $row.find("th[scope='row'] .fw-semibold").text().trim().toLowerCase();
        const id = names[nameText];
        const $priceCell = $row.find("td:last-child");

        if (id && prices[id] && $priceCell.length) {
          let options = "";
          Object.keys(prices[id]).forEach((size) => {
            options += `<option value="${size}">${formatCartSize(size)} · ${formatMoney(prices[id][size])} ₸</option>`;
          });
          const controls = `
            <div class="cart-row-controls d-flex flex-column align-items-stretch gap-2 mt-2">
              <select class="form-select form-select-sm" data-cart-size="${id}">${options}</select>
              <button type="button" class="btn btn-primary btn-sm rounded-pill" data-cart-add="${id}">${cartText("cartAdd")}</button>
            </div>`;
          $priceCell.append(controls);
        }
      });
    };

    const updateMenuControls = () => {
      $("[data-cart-add]").each(function () {
        const id = $(this).data("cart-add");
        $(this).text(cartText("cartAdd")).attr("aria-label", `${cartText("cartAdd")}: ${getDrinkName(id)}`);
      });
      $("[data-cart-size]").each(function () {
        const id = $(this).data("cart-size");
        $(this).find("option").each(function () {
          const size = $(this).val();
          $(this).text(`${formatCartSize(size)} · ${formatMoney(prices[id][size])} ₸`);
        });
      });
    };

    const showCartStatus = (message, success = true) => {
      const $status = $("#cart-status");
      $status
        .removeClass("is-hidden is-error is-success")
        .addClass(`state-message ${success ? "is-success" : "is-error"} p-3 rounded-3 mt-3`)
        .text(message)
        .hide()
        .slideDown(300); // Effect 1: slideDown with duration
    };

    /**
     * DELEGATED EVENT HANDLER:
     * Bound to #cart-items (existing parent) to handle clicks on [data-cart-action] buttons.
     * Binding directly to buttons like $("[data-cart-action]").on() would NOT work for items
     * created later dynamically in renderCart(), because those elements did not exist when listeners were registered.
     */
    $("#cart-items").on("click", "[data-cart-action]", function () {
      const action = $(this).data("cart-action");
      const index = Number($(this).data("index"));
      if (!cart[index]) return;

      if (action === "increase") {
        cart[index].quantity = Math.min(8, cart[index].quantity + 1);
        saveCart();
        renderCart();
      } else if (action === "decrease") {
        cart[index].quantity -= 1;
        if (cart[index].quantity <= 0) {
          cart.splice(index, 1);
        }
        saveCart();
        renderCart();
      } else if (action === "remove") {
        cart.splice(index, 1);
        saveCart();
        // Method chain with traversal, animation effect, duration and callback:
        // Chain 1: (1) Find closest cart item line, (2) animate fade-out over 200ms, (3) execute callback to re-render cart.
        $(this).closest(".cart-line").fadeOut(200, function () {
          renderCart();
        });
      }
    });

    // Delegated add-to-cart click handler from menu table
    $(document).on("click", "[data-cart-add]", function () {
      const id = $(this).data("cart-add");
      // Traversal: from clicked button reach row, then find selected size
      const size = $(this).closest("tr").find(`[data-cart-size="${id}"]`).val();
      const existing = cart.find((item) => item.id === id && item.size === size);

      if (existing) {
        existing.quantity = Math.min(8, existing.quantity + 1);
      } else {
        cart.push({ id, size, quantity: 1 });
      }
      saveCart();
      renderCart();
      showCartStatus(`${getDrinkName(id)} — ${cartText("cartAdded")}`);
    });

    // Clear cart handler
    $("#cart-clear").on("click", function () {
      cart = [];
      localStorage.removeItem(cartStorageKey);
      renderCart();
      // Effect 2: slideUp with duration and callback to empty content
      $("#cart-status").slideUp(200, function () {
        $(this).removeClass("is-success is-error").addClass("is-hidden").empty();
      });
    });

    // Transfer cart to order form
    $("#cart-to-order").on("click", function () {
      if (!cart.length) {
        showCartStatus(cartText("cartEmpty"), false);
        return;
      }
      const first = cart[0];
      const summary = cart
        .map((item) => `${getDrinkName(item.id)} ${formatCartSize(item.size)} × ${item.quantity}`)
        .join(", ");

      const $orderForm = $("#order-form");
      if ($orderForm.length && prices[first.id]) {
        $("#order-drink").val(first.id).trigger("change");
        $("#order-size").val(first.size);
        $("#order-quantity").val(first.quantity).trigger("input");
      }
      const $notes = $("#order-notes");
      if ($notes.length) {
        $notes.val([$notes.val().trim(), `Cart: ${summary}`].filter(Boolean).join("\n"));
      }
      showCartStatus(cartText("cartReady"));
      const target = $("#order-builder")[0];
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    $(window).on("coffi:language", renderCart);
    addMenuControls();
    renderCart();
  }

  // ===========================================================================
  // 2. ORDER BUILDER FORM
  // ===========================================================================
  const $orderForm = $("#order-form");
  if ($orderForm.length) {
    const $drink = $("#order-drink");
    const $size = $("#order-size");
    const $quantity = $("#order-quantity");
    const $total = $("#order-total");
    const $status = $("#order-status");

    const updateSizeOptions = () => {
      const drinkId = $drink.val() || "americano";
      const available = Object.keys(prices[drinkId] || prices.americano);
      const selected = $size.val();
      $size.empty();
      available.forEach((v) => $size.append(`<option value="${v}">${v} ml</option>`));
      $size.val(available.includes(selected) ? selected : available[0]);
    };

    const updateTotal = () => {
      const drinkId = $drink.val();
      const sizeVal = $size.val();
      const unitPrice = prices[drinkId]?.[sizeVal] || 0;
      const count = Math.max(1, Number($quantity.val()) || 1);
      $total.text(`${count} × ${getDrinkName(drinkId)} · ${sizeVal} ml = ${formatMoney(unitPrice * count)} ₸`);
    };

    $drink.on("change", function () {
      updateSizeOptions();
      updateTotal();
    });
    $size.on("change", updateTotal);
    $quantity.on("input", updateTotal);

    $orderForm.on("reset", function () {
      localStorage.removeItem("coffi-order-plan");
      $status.slideUp(200, function () {
        $(this).removeClass("is-success is-error").addClass("is-hidden").text("");
      });
      setTimeout(() => {
        updateSizeOptions();
        updateTotal();
      }, 0);
    });

    // Initial setup
    if (!prices[$drink.val()]) $drink.val("americano");
    updateSizeOptions();
    updateTotal();
    $(window).on("coffi:language", updateTotal);

    // Restore draft
    try {
      const saved = JSON.parse(localStorage.getItem("coffi-order-plan"));
      if (saved?.order_drink && prices[saved.order_drink]) {
        $drink.val(saved.order_drink);
        updateSizeOptions();
        if (Object.hasOwn(prices[saved.order_drink], saved.order_size)) {
          $size.val(saved.order_size);
        }
        $quantity.val(Math.min(8, Math.max(1, saved.order_quantity || 1)));
        $("#order-service").val(saved.order_service || "takeaway");
        $("#order-name").val(saved.order_name || "");
        $("#order-phone").val(saved.order_phone || "");
        $("#order-notes").val(saved.order_notes || "");
        updateTotal();
      }
    } catch {
      // Ignore malformed draft
    }
  }

  // ===========================================================================
  // 3. FORM VALIDATION IN JQUERY (Per-field error class, inline messages, effects)
  // ===========================================================================
  /**
   * REWRITE 3: Form validation with jQuery
   * Why browser validation never replaces server validation:
   * Client-side validation improves user experience by giving instant visual feedback without latency,
   * but malicious users or bots can easily disable JavaScript, alter HTML attributes, or send arbitrary
   * HTTP POST requests directly to server endpoints. Thus, the server MUST always re-validate all inputs.
   */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;

  const validateField = ($field) => {
    const val = ($field.val() || "").trim();
    const type = $field.attr("type");
    const name = $field.attr("name") || "";
    let isValid = true;
    let message = "";

    if ($field.prop("required") && !val) {
      isValid = false;
      message = "This field is required.";
    } else if (val && (type === "email" || name.includes("email"))) {
      if (!emailRegex.test(val)) {
        isValid = false;
        message = "Please enter a valid e-mail address.";
      }
    } else if (val && (type === "tel" || name.includes("phone"))) {
      if (!phoneRegex.test(val)) {
        isValid = false;
        message = "Please enter a valid phone number.";
      }
    } else if (val && type === "number") {
      const num = Number(val);
      const min = Number($field.attr("min"));
      const max = Number($field.attr("max"));
      if (!isNaN(min) && num < min) {
        isValid = false;
        message = `Value must be at least ${min}.`;
      } else if (!isNaN(max) && num > max) {
        isValid = false;
        message = `Value must be no more than ${max}.`;
      }
    } else if ($field.is(":checkbox") && $field.prop("required") && !$field.prop("checked")) {
      isValid = false;
      message = "You must accept this to proceed.";
    }

    // Traversal and DOM manipulation for inline error message
    let $feedback = $field.siblings(".invalid-feedback");
    if (!$feedback.length) {
      $feedback = $('<div class="invalid-feedback d-block"></div>').insertAfter($field);
    }

    if (!isValid) {
      // Chain 2: Add invalid class, set feedback text, and animate slideDown
      $field.addClass("is-invalid").removeClass("is-valid");
      $feedback.text(message).hide().slideDown(150);
    } else {
      // Clear error immediately with chaining
      $field.removeClass("is-invalid");
      $feedback.slideUp(150, function () {
        $(this).remove();
      });
    }
    return isValid;
  };

  // Clear errors dynamically as soon as the visitor fixes a field (input or change event)
  $("form").on("input change", ".form-control, .form-select, .form-check-input", function () {
    const $field = $(this);
    if ($field.hasClass("is-invalid")) {
      validateField($field);
    }
  });

  // Setup generic local form submission with validation
  const setupValidatedForm = (formSelector, statusSelector, getSuccessMsg, storageKey) => {
    const $form = $(formSelector);
    const $status = $(statusSelector);
    if (!$form.length || !$status.length) return;

    $form.on("submit", function (event) {
      /**
       * event.preventDefault():
       * Prevents default browser form submission (which would refresh the page and perform a standard HTTP GET/POST).
       * Without it, our single-page application state, local storage updates, and animated feedback would be lost on reload.
       */
      event.preventDefault();

      let isFormValid = true;
      const $inputs = $form.find("input, select, textarea").not("[type='submit'], [type='reset'], [type='button']");

      $inputs.each(function () {
        const valid = validateField($(this));
        if (!valid) isFormValid = false;
      });

      if (!isFormValid) {
        // Focus first invalid input using :first filter
        $form.find(".is-invalid:first").focus();
        return;
      }

      // Collect data using .val() and .prop()
      const data = {};
      $inputs.each(function () {
        const name = $(this).attr("name");
        if (!name) return;
        if ($(this).is(":checkbox")) {
          data[name] = $(this).prop("checked");
        } else if ($(this).is(":radio")) {
          // Attribute and filter selector: :checked
          const checkedVal = $form.find(`input[name='${name}']:checked`).val();
          if (checkedVal) data[name] = checkedVal;
        } else {
          data[name] = $(this).val().trim();
        }
      });

      if (storageKey) {
        localStorage.setItem(storageKey, JSON.stringify(data));
      }

      // Effect 3: fadeIn for confirmation message
      $status
        .removeClass("is-hidden is-error")
        .addClass("state-message is-success p-3 rounded-3 mt-3")
        .text(getSuccessMsg(data))
        .hide()
        .fadeIn(350);

      // Reset form after successful submission
      $form[0].reset();
      $form.find(".is-invalid, .is-valid").removeClass("is-invalid is-valid");
      $form.find(".invalid-feedback").remove();
    });

    $form.on("reset", function () {
      if (storageKey) localStorage.removeItem(storageKey);
      $status.slideUp(200, function () {
        $(this).removeClass("is-success is-error").addClass("is-hidden").text("");
      });
      $form.find(".is-invalid, .is-valid").removeClass("is-invalid is-valid");
      $form.find(".invalid-feedback").remove();
    });
  };

  // Connect validation to Order Form
  setupValidatedForm(
    "#order-form",
    "#order-status",
    (data) =>
      window.CoffiI18n?.message("orderSaved", data, getDrinkName(data.order_drink)) ||
      `Your ${drinkNames[data.order_drink] || "order"} plan is saved on this device. Call Coffi at +7 (701) 880-41-04 to confirm availability.`,
    "coffi-order-plan",
  );

  // Connect validation to Booking Form
  setupValidatedForm(
    "#booking-form",
    "#booking-status",
    (data) =>
      window.CoffiI18n?.message("bookingSaved", data) ||
      `Thanks, ${data.book_name}. Your request for ${data.book_date} at ${data.book_time} for ${data.book_guests} guest(s) is saved. Call Coffi to confirm availability.`,
    "booking-form",
  );

  // Connect validation to Feedback Form
  setupValidatedForm(
    "#feedback-form",
    "#feedback-status",
    (data) =>
      window.CoffiI18n?.message("feedbackSaved", data) ||
      `Thanks, ${data.client_name}. Your feedback is saved on this device. Thank you for helping Coffi improve!`,
    "feedback-form",
  );

  // Set min/max constraints on dates using .attr()
  const todayIso = new Date().toISOString().slice(0, 10);
  $("#book-date").attr("min", todayIso);
  $("#visit-date").attr("max", todayIso);

  // Ensure initial language application
  if (window.CoffiI18n) {
    window.CoffiI18n.applyLanguage(window.CoffiI18n.language);
  }
});
