const API = "http://localhost:5000/api";

/* ------------------ LOGIN ------------------ */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // clear old errors
    document.getElementById("loginEmailError").innerText = "";
    document.getElementById("loginPasswordError").innerText = "";

    // optional: clear global message
    if (typeof showMessage === "function") showMessage("", ""); 

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    let valid = true;
    if (!email) {
      document.getElementById("loginEmailError").innerText = "Email required";
      valid = false;
    }
    if (!password) {
      document.getElementById("loginPasswordError").innerText = "Password required";
      valid = false;
    }
    if (!valid) return;

    const button = loginForm.querySelector("button[type='submit']") || loginForm.querySelector("button");
    if (button) {
      button.disabled = true;
      button.innerText = "Logging in...";
    }

    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      // safer JSON parse
      let data = {};
      try { data = await res.json(); } catch (_) {}

      if (!res.ok) {
        showMessage(data.message || "Login failed", "danger");
        return;
      }

      if (!data.token || !data.user) {
        showMessage("Invalid server response", "danger");
        return;
      }

      // from main.js
      saveAuth(data.token, data.user);
      redirectByRole();

    } catch (err) {
      showMessage("Server error", "danger");
    } finally {
      if (button) {
        button.disabled = false;
        button.innerText = "Login";
      }
    }
  });
}

/* ------------------ REGISTER ------------------ */
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    document.getElementById("nameError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("passwordError").innerText = "";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = (document.getElementById("role").value || "user").trim();

    let valid = true;

    if (!name) {
      document.getElementById("nameError").innerText = "Name required";
      valid = false;
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      document.getElementById("emailError").innerText = "Valid email required";
      valid = false;
    }

    if (password.length < 6) {
      document.getElementById("passwordError").innerText = "Min 6 characters";
      valid = false;
    }

    if (!valid) return;

    const button = registerForm.querySelector("button[type='submit']") || registerForm.querySelector("button");
    if (button) {
      button.disabled = true;
      button.innerText = "Registering...";
    }

    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role })
      });

      let data = {};
      try { data = await res.json(); } catch (_) {}

      if (!res.ok) {
        showMessage(data.message || "Registration failed", "danger");
        return;
      }

      showMessage("Registration successful! Redirecting...", "success");

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1200);

    } catch (error) {
      showMessage("Server error", "danger");
    } finally {
      if (button) {
        button.disabled = false;
        button.innerText = "Register";
      }
    }
  });
}