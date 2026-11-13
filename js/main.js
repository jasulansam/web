"use strict";

(() => {
  const drinks = [
    { id: "americano", name: "Americano", category: "Coffee", description: "Espresso with hot water.", price: 990, image: "images/menu-americano.jpg" },
    { id: "cappuccino", name: "Cappuccino", category: "Coffee", description: "Coffee with steamed milk and foam.", price: 1290, image: "images/campaign-cappuccino.webp" },
    { id: "latte", name: "Latte", category: "Coffee", description: "A milk-forward coffee classic.", price: 1290, image: "images/menu-latte.jpg" },
    { id: "flat-white", name: "Flat white", category: "Coffee", description: "A smooth, coffee-forward milk drink.", price: 1290, image: "images/campaign-flatwhite.webp" },
    { id: "mocha", name: "Mocha", category: "Coffee", description: "Coffee with a chocolate note.", price: 1490, image: "images/menu-mocha.jpg" },
    { id: "raf", name: "Raf", category: "Coffee", description: "A creamy coffee option.", price: 1790, image: "images/menu-raf.jpg" },
    { id: "bumble", name: "Bumble coffee", category: "Cold coffee", description: "An orange-and-coffee combination over ice.", price: 1790, image: "images/campaign-bumble.webp" },
    { id: "iced-americano", name: "Iced Americano", category: "Cold coffee", description: "A chilled black coffee.", price: 1490, image: "images/menu-iced-americano.jpg" },
    { id: "iced-latte", name: "Iced latte", category: "Cold coffee", description: "Coffee and milk served cold.", price: 1590, image: "images/menu-iced-latte.jpg" },
    { id: "espresso-tonic", name: "Espresso tonic", category: "Cold coffee", description: "A sparkling, bittersweet coffee option.", price: 1790, image: "images/coffee-cappuccino-generated-optimized.webp" },
    { id: "sea-buckthorn-tea", name: "Sea buckthorn tea", category: "Tea & chocolate", description: "A fruity tea option.", price: 1590, image: "images/menu-sea-buckthorn-tea.jpg" },
    { id: "ginger-tea", name: "Ginger tea", category: "Tea & chocolate", description: "A warming ginger option.", price: 1590, image: "images/menu-matcha.jpg" },
    { id: "moroccan-tea", name: "Moroccan tea", category: "Tea & chocolate", description: "One of the published hot tea choices.", price: 1590, image: "images/menu-moroccan-tea.jpg" },
    { id: "hot-chocolate", name: "Hot chocolate", category: "Tea & chocolate", description: "A warm chocolate drink.", price: 1490, image: "images/menu-hot-chocolate.jpg" },
    { id: "cocoa", name: "Cocoa", category: "Tea & chocolate", description: "A comforting cocoa drink.", price: 1390, image: "images/menu-cocoa.jpg" },
    { id: "lemon-tart-raf", name: "Lemon tart raf", category: "Fresh & specials", description: "A signature flavoured raf.", price: 1890, image: "images/menu-espresso-tonic.jpg" },
    { id: "apple-cinnamon-raf", name: "Apple & cinnamon raf", category: "Fresh & specials", description: "A signature flavoured raf.", price: 1890, image: "images/menu-cinnamon-drink.jpg" },
    { id: "orange-juice", name: "Orange juice", category: "Fresh & specials", description: "Fresh juice from the published menu.", price: 2800, image: "images/menu-bumble.jpg" },
    { id: "green-smoothie", name: "Green smoothie", category: "Fresh & specials", description: "Ask the barista about the ingredients.", price: 2800, image: "images/menu-green-smoothie.jpg" },
    { id: "berry-lemonade", name: "Berry lemonade", category: "Fresh & specials", description: "A fruity cold drink.", price: 1590, image: "images/campaign-lemonade.webp" },
  ];

  const element = (tag, className = "", text = "") => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  const money = (value) => new Intl.NumberFormat("kk-KZ").format(value);
  const reference = (prefix) => `${prefix}-${Math.floor(Math.random() * 9000) + 1000}`;
  const today = () => new Date().toISOString().slice(0, 10);
  const findDrink = (id) => drinks.find((drink) => drink.id === id);
  const setStatus = (node, kind, message) => {
    node.classList.remove("is-hidden", "is-error", "is-success");
    node.classList.add("state-message", `is-${kind}`, "p-3", "rounded-3");
    node.textContent = message;
  };
  const hideStatus = (node) => {
    node.classList.remove("is-error", "is-success");
    node.classList.add("state-message", "is-hidden", "p-3", "rounded-3");
    node.textContent = "";
  };

  const updateBasketBadge = () => {
    let items = 0;
    try {
      const cart = JSON.parse(localStorage.getItem("coffi-cart") || "[]");
      if (Array.isArray(cart)) items = cart.reduce((sum, item) =>
        sum + (item && findDrink(item.id) && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 8 ? item.quantity : 0), 0);
    } catch { /* An unavailable basket is shown as empty until Menu is opened. */ }
    document.querySelectorAll("[data-basket-count]").forEach((badge) => {
      badge.textContent = items;
      badge.closest("a, button").setAttribute("aria-label", `Open your basket, ${items} items`);
    });
  };
  updateBasketBadge();
  window.addEventListener("pageshow", updateBasketBadge);
  window.addEventListener("storage", updateBasketBadge);
  // Restore a clean navigation state when returning from the browser's page cache.
  window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;
    const navigation = document.querySelector("#siteNav");
    if (navigation && window.bootstrap) bootstrap.Collapse.getInstance(navigation)?.hide();
  });
  const header = document.querySelector(".site-header");
  if (header) {
    const updateHeaderHeight = () => document.documentElement.style.setProperty(
      "--header-height", `${header.getBoundingClientRect().height}px`
    );
    const updateHeaderShadow = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    new ResizeObserver(updateHeaderHeight).observe(header);
    window.addEventListener("scroll", updateHeaderShadow, { passive: true });
    window.addEventListener("pageshow", updateHeaderShadow);
    updateHeaderHeight();
    updateHeaderShadow();
  }

  const navigationLinks = document.querySelector(".site-header .navbar-nav");
  if (navigationLinks) {
    const indicator = element("span", "nav-indicator");
    indicator.setAttribute("aria-hidden", "true");
    navigationLinks.prepend(indicator);
    const activeLink = navigationLinks.querySelector('[aria-current="page"]');
    const moveIndicator = (link) => {
      if (!link || !link.getClientRects().length) return;
      const container = navigationLinks.getBoundingClientRect();
      const target = link.getBoundingClientRect();
      indicator.style.width = `${target.width}px`;
      indicator.style.height = `${target.height}px`;
      indicator.style.transform = `translate(${target.left - container.left}px, ${target.top - container.top}px)`;
    };
    moveIndicator(activeLink);
    navigationLinks.classList.add("has-nav-indicator");
    requestAnimationFrame(() => navigationLinks.classList.add("nav-indicator-ready"));
    navigationLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("pointerenter", (event) => { if (event.pointerType !== "touch") moveIndicator(link); });
      link.addEventListener("focus", () => moveIndicator(link));
    });
    navigationLinks.addEventListener("pointerleave", () => moveIndicator(activeLink));
    navigationLinks.addEventListener("focusout", (event) => {
      if (!navigationLinks.contains(event.relatedTarget)) moveIndicator(activeLink);
    });
    new ResizeObserver(() => moveIndicator(activeLink)).observe(navigationLinks);
  }

  const recommendations = document.querySelector("#home-recommendations");
  if (recommendations) {
    ["cappuccino", "bumble", "flat-white", "berry-lemonade"].forEach((id) => {
      const drink = findDrink(id);
      const card = element("article", "recommendation-card");
      const image = element("img");
      image.src = drink.image;
      image.alt = drink.name;
      image.width = 600; image.height = 450; image.loading = "lazy";
      const imageLink = element("a", "recommendation-image-link");
      imageLink.href = `menu.html?drink=${encodeURIComponent(drink.id)}#drink-${drink.id}`;
      imageLink.setAttribute("aria-label", `View ${drink.name} in the menu`);
      imageLink.append(image);
      const heading = element("div", "recommendation-heading");
      const title = element("h3", "h4 mb-0");
      const titleLink = element("a", "recommendation-link", drink.name);
      titleLink.href = imageLink.href;
      const priceLink = element("a", "recommendation-link fw-semibold", `${money(drink.price)} ₸`);
      priceLink.href = imageLink.href;
      priceLink.setAttribute("aria-label", `View ${drink.name}, ${money(drink.price)} tenge, in the menu`);
      title.append(titleLink);
      heading.append(title, priceLink);
      card.append(imageLink, heading, element("p", "text-body-secondary mb-0", drink.description));
      recommendations.append(card);
    });
    document.querySelector('.home-suggestions .text-body-secondary').textContent = 'Four different tastes. Where will you start?';
    const cards = [...recommendations.children];
    const desktop = matchMedia('(min-width: 1200px)');
    const tablet = matchMedia('(min-width: 768px)');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let first = 0;
    let animation;
    const render = (direction = 0) => {
      const opacity = animation?.playState === "running" ? getComputedStyle(recommendations).opacity : "0.75";
      animation?.cancel();
      const count = desktop.matches ? 3 : tablet.matches ? 2 : 1;
      cards.forEach((card, index) => {
        const order = (index - first + cards.length) % cards.length;
        card.hidden = order >= count;
        card.style.order = order;
      });
      document.querySelector('#drinks-position').textContent = `${first + 1} / ${cards.length}`;
      if (direction && !reduced.matches) animation = recommendations.animate([
        { opacity },
        { opacity: 1 }
      ], { duration: 180, easing: 'ease-out' });
    };
    [-1, 1].forEach(direction => document.querySelector(direction < 0 ? '#drinks-prev' : '#drinks-next').addEventListener('click', () => {
      first = (first + direction + cards.length) % cards.length;
      render(direction);
    }));
    desktop.addEventListener('change', () => render());
    tablet.addEventListener('change', () => render());
    reduced.addEventListener('change', () => render());
    window.addEventListener('pagehide', () => animation?.cancel());
    render();
  }
  const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
  if (!motionPreference.matches && "IntersectionObserver" in window) {
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        // Do not move controls while the visitor is scrolling or clicking.
        entry.target.classList.add("section-appearing");
        entry.target.addEventListener("animationend", () => entry.target.classList.remove("section-appearing"), { once: true });
        reveal.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(".home-page main > section:not(.home-suggestions), .home-page main > article, .home-page main > aside").forEach((section) => reveal.observe(section));
    motionPreference.addEventListener("change", () => {
      if (motionPreference.matches) reveal.disconnect();
    });
  }

  window.CoffiApp = Object.freeze({ drinks, element, money, reference, today, findDrink, setStatus, hideStatus });
})();
