"use strict";

(() => {
  const app = window.CoffiApp;
  const registerForm = document.querySelector("#register-form");
  const loginForm = document.querySelector("#login-form");
  const sessionPanel = document.querySelector("#account-session");
  if (!app || !registerForm || !loginForm || !sessionPanel) return;

  const accountKey = "coffi-demo-account";
  const sessionKey = "coffi-demo-session";
  const pendingOrderKey = "coffi-pending-order";
  const savedOrderNoticeKey = "coffi-order-saved-notice";
  const registerStatus = document.querySelector("#register-status");
  const loginStatus = document.querySelector("#login-status");
  const registerName = document.querySelector("#register-name");
  const registerEmail = document.querySelector("#register-email");
  const registerPhone = document.querySelector("#register-phone");
  const registerPassword = document.querySelector("#register-password");
  const registerConfirm = document.querySelector("#register-confirm");
  const loginEmail = document.querySelector("#login-email");
  const loginPassword = document.querySelector("#login-password");
  const logout = document.querySelector("#account-logout");
  const registerSubmit = registerForm.querySelector('[type="submit"]');
  const loginSubmit = loginForm.querySelector('[type="submit"]');

  const loginPanel = document.querySelector("#login-panel");
  const registerPanel = document.querySelector("#register-panel");
  loginForm.noValidate = true;
  const showForm = (mode, focus = true) => {
    loginPanel.classList.toggle("is-hidden", mode !== "login");
    registerPanel.classList.toggle("is-hidden", mode !== "register");
    if (focus) (mode === "login" ? loginEmail : registerName).focus();
  };
  document.querySelector("#show-register").addEventListener("click", () => showForm("register"));
  document.querySelector("#show-login").addEventListener("click", () => showForm("login"));

  const bytesToBase64 = (bytes) => btoa(String.fromCharCode(...bytes));
  const base64ToBytes = (value) => Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
  const normalizeEmail = (value) => value.trim().toLowerCase();
  const normalizePhone = app.normalizeKzPhone;
  const validPassword = (value) => value.length >= 8 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value);
  const validName = (value) => {
    const trimmed = value.trim();
    const letters = trimmed.match(/\p{L}/gu) || [];
    return letters.length >= 2 && /^[\p{L}\p{M}\s'-]+$/u.test(trimmed);
  };

  const createPasswordDigest = async (password, salt) => {
    const key = await crypto.subtle.importKey(
      "raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]
    );
    return new Uint8Array(await crypto.subtle.deriveBits(
      { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" }, key, 256
    ));
  };

  const equalBytes = (left, right) => {
    if (left.length !== right.length) return false;
    let difference = 0;
    for (let index = 0; index < left.length; index += 1) difference |= left[index] ^ right[index];
    return difference === 0;
  };

  const readAccount = () => {
    const saved = localStorage.getItem(accountKey);
    if (!saved) return null;
    const account = JSON.parse(saved);
    if (!account?.name || !account?.email || !account?.phone || !account?.salt || !account?.passwordDigest) {
      throw new Error("The saved account is incomplete.");
    }
    return account;
  };

  const updateSessionPanel = () => {
    try {
      const account = readAccount();
      const signedInEmail = sessionStorage.getItem(sessionKey);
      const signedIn = account && signedInEmail === account.email;
      window.dispatchEvent(new Event("coffi-session-change"));
      sessionPanel.classList.toggle("is-hidden", !signedIn);
      if (!signedIn) { showForm("login", false); return; }
      loginPanel.classList.add("is-hidden");
      registerPanel.classList.add("is-hidden");
      document.querySelector("#account-session-name").textContent = account.name;
      document.querySelector("#account-session-email").textContent = account.email;
    } catch {
      sessionPanel.classList.add("is-hidden");
      app.setStatus(loginStatus, "error", "The saved account could not be read. Browser storage may be unavailable.");
    }
  };

  const finishPendingOrder = () => {
    try {
      const pending = sessionStorage.getItem(pendingOrderKey);
      if (!pending) return;
      const account = readAccount();
      if (!account || sessionStorage.getItem(sessionKey) !== account.email) return;
      const order = JSON.parse(pending);
      const existingOrders = window.CoffiOrders.read();
      if (!existingOrders.some((saved) => saved.id === order.id)) {
        window.CoffiOrders.save(order);
      }
      sessionStorage.setItem(savedOrderNoticeKey, order.id);
      sessionStorage.removeItem(pendingOrderKey);
      window.location.replace("menu.html");
    } catch {
      app.setStatus(loginStatus, "error", "You are signed in, but this order could not be saved. It is still on this tab; try again after checking browser storage.");
    }
  };

  const clearValidity = (field) => field.setCustomValidity("");
  [registerName, registerEmail, registerPhone, registerPassword, registerConfirm].forEach((field) => {
    field.addEventListener("input", () => clearValidity(field));
  });
  app.bindKzPhoneInput(registerPhone);
  registerPassword.addEventListener("input", () => clearValidity(registerConfirm));
  [loginEmail, loginPassword].forEach((field) => {
    field.addEventListener("input", () => {
      clearValidity(field);
      app.hideStatus(loginStatus);
    });
  });

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    app.hideStatus(registerStatus);

    const name = registerName.value.trim();
    const email = normalizeEmail(registerEmail.value);
    const phone = normalizePhone(registerPhone.value);
    registerName.setCustomValidity(validName(name) ? "" : "Use letters, spaces, apostrophes or hyphens, with at least two characters.");
    registerPhone.setCustomValidity(phone ? "" : "Enter a complete Kazakhstan phone number.");
    registerPassword.setCustomValidity(validPassword(registerPassword.value) ? "" : "Use at least 8 characters with uppercase and lowercase English letters and a number.");
    registerConfirm.setCustomValidity(registerConfirm.value === registerPassword.value ? "" : "The passwords do not match.");
    if (!registerForm.reportValidity()) return;

    registerSubmit.disabled = true;
    try {
      if (!window.crypto?.subtle) throw new Error("Password protection is unavailable.");
      const existingAccount = readAccount();
      if (existingAccount) {
        app.setStatus(registerStatus, "error", "A account already exists in this browser. Sign in with that account.");
        loginEmail.value = existingAccount.email;
        showForm("login");
        app.setStatus(loginStatus, "error", "An account already exists. Sign in below.");
        return;
      }
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const digest = await createPasswordDigest(registerPassword.value, salt);
      const account = {
        name,
        email,
        phone,
        salt: bytesToBase64(salt),
        passwordDigest: bytesToBase64(digest),
      };
      localStorage.setItem(accountKey, JSON.stringify(account));
      try {
        sessionStorage.setItem(sessionKey, email);
      } catch {
        registerForm.reset();
        app.setStatus(registerStatus, "error", "Account created, but this tab could not save the sign-in session. Try signing in when session storage is available.");
        return;
      }
      registerForm.reset();
      loginEmail.value = email;
      app.setStatus(registerStatus, "success", "Account created. You are signed in on this tab.");
      updateSessionPanel();
      finishPendingOrder();
    } catch {
      app.setStatus(registerStatus, "error", "The account could not be saved. Check that browser storage is enabled and try again.");
    } finally {
      registerSubmit.disabled = false;
    }
  });

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    app.hideStatus(loginStatus);
    if (!loginEmail.value.trim() || !loginPassword.value) {
      app.setStatus(loginStatus, "error", "Enter your email and password to sign in.");
      (loginEmail.value.trim() ? loginPassword : loginEmail).focus();
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail.value.trim())) {
      app.setStatus(loginStatus, "error", "Enter a valid email address.");
      loginEmail.focus();
      return;
    }

    loginSubmit.disabled = true;
    try {
      if (!window.crypto?.subtle) throw new Error("Password protection is unavailable.");
      const account = readAccount();
      if (!account) {
        app.setStatus(loginStatus, "error", "No account exists in this browser. Create one first.");
        return;
      }
      const enteredDigest = await createPasswordDigest(loginPassword.value, base64ToBytes(account.salt));
      const passwordMatches = equalBytes(enteredDigest, base64ToBytes(account.passwordDigest));
      if (normalizeEmail(loginEmail.value) !== account.email || !passwordMatches) {
        app.setStatus(loginStatus, "error", "Email or password is incorrect.");
        return;
      }
      sessionStorage.setItem(sessionKey, account.email);
      loginPassword.value = "";
      app.setStatus(loginStatus, "success", "Signed in successfully on this tab.");
      updateSessionPanel();
      finishPendingOrder();
    } catch {
      app.setStatus(loginStatus, "error", "The account could not be read. Check browser storage and try again.");
    } finally {
      loginSubmit.disabled = false;
    }
  });

  logout.addEventListener("click", () => {
    try {
      sessionStorage.removeItem(sessionKey);
      window.dispatchEvent(new Event("coffi-session-change"));
      app.hideStatus(registerStatus);
      sessionPanel.classList.add("is-hidden");
      showForm("login");
      app.setStatus(loginStatus, "success", "You signed out. The account remains in this browser.");
    } catch {
      app.setStatus(loginStatus, "error", "The sign-out action could not be completed in this browser.");
    }
  });

  window.addEventListener("pageshow", () => {
    updateSessionPanel();
    finishPendingOrder();
  });
  updateSessionPanel();
})();
