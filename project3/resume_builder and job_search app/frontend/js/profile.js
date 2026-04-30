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

  // ✅ FIX: convert array → string for input
  document.getElementById("education").value =
    (user.education || []).map(e => e.degree).join(", ");

  document.getElementById("experience").value =
    (user.experience || []).map(e => e.role).join(", ");
}

/* ------------------ UPDATE PROFILE ------------------ */
document.getElementById("profileForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // ✅ convert skills to array
  const skills = document.getElementById("skills").value
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  // ✅ FIX: convert string → array
  const educationInput = document.getElementById("education").value;

  const education = educationInput
    .split(",")
    .map(e => e.trim())
    .filter(Boolean)
    .map(e => ({
      degree: e,
      institution: "",
      year: ""
    }));

  // ✅ FIX: convert string → array
  const experienceInput = document.getElementById("experience").value;

  const experience = experienceInput
    .split(",")
    .map(e => e.trim())
    .filter(Boolean)
    .map(e => ({
      role: e,
      company: "",
      years: ""
    }));

  const body = {
    name: document.getElementById("name").value,
    skills,
    education,
    experience
  };

  console.log("Sending body:", body); // 🔍 debug

  const res = await fetch(`${API}/user/me`, {
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