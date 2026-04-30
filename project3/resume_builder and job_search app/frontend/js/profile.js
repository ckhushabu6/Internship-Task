const API = "http://localhost:5000/api";
const token = localStorage.getItem("token");

if (!token) window.location.href = "login.html";

/* ------------------ LOAD PROFILE ------------------ */
async function loadProfile() {
  const res = await fetch(`${API}/user/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();

  const user = data.data;

  document.getElementById("name").value = user.name || "";
  document.getElementById("email").value = user.email || "";
  document.getElementById("skills").value = (user.skills || []).join(",");
  document.getElementById("education").value = user.education || "";
  document.getElementById("experience").value = user.experience || "";
}

/* ------------------ UPDATE PROFILE ------------------ */
document.getElementById("profileForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const body = {
    name: document.getElementById("name").value,
    skills: document.getElementById("skills").value.split(",").map(s => s.trim()),
    education: document.getElementById("education").value,
    experience: document.getElementById("experience").value
  };

  const res = await fetch(`${API}/user/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();

  showMessage(data.message, res.ok ? "success" : "danger");
});

/* ------------------ MESSAGE ------------------ */
function showMessage(msg, type) {
  const box = document.getElementById("messageBox");
  box.className = `alert alert-${type}`;
  box.innerText = msg;
  box.classList.remove("d-none");
}

loadProfile();