/**
 * old-js-version.js
 * 
 * Contains original plain-JavaScript implementations of 3 features
 * before rewriting with jQuery for Assignment 4.
 * This file is NOT linked to any HTML page and is preserved for comparison during defense.
 */

// =============================================================================
// Feature 1: Dynamic Cart List Rendering (Plain JavaScript)
// =============================================================================
function oldRenderCart(cart, cartItems, cartEmpty, cartCount, cartTotal, prices, getDrinkName, formatCartSize, formatMoney, cartText) {
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
}

// =============================================================================
// Feature 2: Injected Menu Table Controls (Plain JavaScript)
// =============================================================================
function oldAddMenuControls(drinkNames, prices) {
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
}

// =============================================================================
// Feature 3: Form Submission and Local State Storage (Plain JavaScript)
// =============================================================================
function oldSetupLocalForm(formId, statusId, message) {
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
}
