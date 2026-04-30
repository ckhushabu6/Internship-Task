//const API = "http://localhost:5000/api";

/* ------------------ GET TOKEN ------------------ */
function getToken() {
  return localStorage.getItem("token");
}

/* ------------------ GET USER ------------------ */
function getUser() {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (err) {
    console.error("Invalid user in storage");
    return null;
  }
}

/* ------------------ SAVE USER ------------------ */
function saveAuth(token, user) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

/* ------------------ LOGOUT ------------------ */
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

/* ------------------ ROLE REDIRECT ------------------ */
function redirectByRole() {
  const user = getUser();

  if (!user || !user.role) {
    window.location.href = "login.html";
    return;
  }

  switch (user.role) {
    case "employer":
      window.location.href = "employer.html";
      break;
    case "admin":
      window.location.href = "admin.html";
      break;
    default:
      window.location.href = "dashboard.html";
  }
}

/* ------------------ PROTECT PAGE ------------------ */
function protectPage(role = null) {
  const token = getToken();
  const user = getUser();

  if (!token || !user) {
    window.location.href = "login.html";
    return;
  }

  // role check
  if (role && user.role !== role) {
    showMessage("Unauthorized access", "danger");
    setTimeout(() => redirectByRole(), 1000);
  }
}

/* ------------------ MESSAGE ------------------ */
function showMessage(text, type = "info") {
  if (!text) return;

  let box = document.getElementById("messageBox");

  if (!box) {
    box = document.createElement("div");
    box.id = "messageBox";
    box.style.position = "fixed";
    box.style.top = "10px";
    box.style.left = "50%";
    box.style.transform = "translateX(-50%)";
    box.style.zIndex = "9999";
    document.body.appendChild(box);
  }

  box.className = `alert alert-${type} text-center`;
  box.innerText = text;

  setTimeout(() => {
    box.remove();
  }, 3000);
}