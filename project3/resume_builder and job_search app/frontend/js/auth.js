const API = "http://localhost:5000/api";

/* ------------------ LOGIN ------------------ */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    let valid = true;

    // validation
    if (!email) {
      document.getElementById("loginEmailError").innerText = "Email required";
      valid = false;
    }

    if (!password) {
      document.getElementById("loginPasswordError").innerText = "Password required";
      valid = false;
    }

    if (!valid) return;

    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      // store token
      localStorage.setItem("token", data.token);

      // redirect
      window.location.href = "dashboard.html";

    } catch (error) {
      alert("Server error");
    }
  });
}


/* ------------------ REGISTER ------------------ */
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    let valid = true;

    if (!name) {
      document.getElementById("nameError").innerText = "Name required";
      valid = false;
    }

    if (!email) {
      document.getElementById("emailError").innerText = "Email required";
      valid = false;
    }

    if (password.length < 6) {
      document.getElementById("passwordError").innerText = "Min 6 characters";
      valid = false;
    }

    if (!valid) return;

    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password, role })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Registration successful!");

      // redirect to login
      window.location.href = "login.html";

    } catch (error) {
      alert("Server error");
    }
  });
}