"use strict";

(() => {
  const app = window.CoffiApp;
  if (!app) return;
  const key = "coffi-orders";
  const validOrder = (order) => order && typeof order.id === "string" &&
    typeof order.order_name === "string" && typeof order.order_phone === "string" &&
    Number.isFinite(order.total) && order.total >= 0 && Array.isArray(order.items) && order.items.length > 0 &&
    order.items.every((item) => item && typeof item.name === "string" && Number.isInteger(item.quantity) &&
      item.quantity > 0 && Number.isFinite(item.price) && item.price >= 0);

  const read = () => {
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      const orders = JSON.parse(saved);
      if (!Array.isArray(orders) || !orders.every(validOrder)) throw new Error("Invalid saved history");
      return orders;
    }
    // Preserve the single order saved by the earlier site version.
    const old = JSON.parse(localStorage.getItem("coffi-order-plan") || "null");
    if (!old) return [];
    const migrated = { ...old, id: "previous-order", createdAt: null };
    if (!validOrder(migrated)) throw new Error("Invalid previous order");
    return [migrated];
  };
  const save = (order) => {
    if (!validOrder(order)) throw new Error("Invalid order");
    const orders = read();
    localStorage.setItem(key, JSON.stringify([order, ...orders]));
  };
  window.CoffiOrders = Object.freeze({ read, save });

  const list = document.querySelector("#orders-list");
  if (!list) return;
  const status = document.querySelector("#orders-status");
  const empty = document.querySelector("#orders-empty");
  const render = () => {
    try {
      const orders = read();
      app.hideStatus(status);
      empty.classList.toggle("is-hidden", orders.length > 0);
      list.replaceChildren(...orders.map((order) => {
        const card = app.element("article", "action-card p-4");
        card.id = `order-${order.id}`;
        const date = order.createdAt ? new Date(order.createdAt) : null;
        const dateLabel = date && !Number.isNaN(date.getTime()) ? date.toLocaleString() : "Previously saved order";
        card.append(app.element("h2", "h5", `Order ${order.id.slice(0, 8)}`),
          app.element("p", "small text-body-secondary", `${dateLabel} · Saved locally`),
          app.element("p", "fw-semibold", `Total: ${app.money(order.total)} ₸`));
        const details = app.element("details");
        details.append(app.element("summary", "fw-semibold", "View order details"));
        const items = app.element("ul", "mt-3");
        order.items.forEach((item) => items.append(app.element("li", "mb-2",
          `${item.name} × ${item.quantity} · ${app.money(item.price)} ₸ each · ${app.money(item.price * item.quantity)} ₸`)));
        details.append(items,
          app.element("p", "mb-1", `Name: ${order.order_name}`),
          app.element("p", "mb-1", `Phone: ${order.order_phone}`),
          app.element("p", "mb-1", `Visit: ${order.order_service === "cafe" ? "In the cafe" : "Takeaway"}`));
        if (order.order_notes) details.append(app.element("p", "mb-1 text-break", `Notes: ${order.order_notes}`));
        const contact = app.element("a", "d-inline-block mt-3", "Call Coffi to confirm");
        contact.href = "tel:+77018804104";
        details.append(contact);
        if (location.hash === `#${card.id}`) details.open = true;
        card.append(details);
        return card;
      }));
      const selected = [...list.children].find((card) => `#${card.id}` === location.hash);
      if (selected) selected.scrollIntoView();
    } catch {
      list.replaceChildren();
      empty.classList.add("is-hidden");
      app.setStatus(status, "error", "Saved orders could not be read. Browser storage may be unavailable or damaged. Your stored history has not been changed.");
    }
  };
  window.addEventListener("hashchange", render);
  window.addEventListener("storage", (event) => {
    if (event.key === key || event.key === null) render();
  });
  render();
})();
