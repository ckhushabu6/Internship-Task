const API = "http://localhost:5000/api";
const token = localStorage.getItem("token");

/* ---------------- USERS ---------------- */
async function loadUsers() {
  const res = await fetch(`${API}/admin/users`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();

  document.getElementById("users").innerHTML =
    data.data.map(u => `
      <div class="border p-2 mb-1">
        ${u.name} - ${u.email} (${u.role})
      </div>
    `).join("");
}

/* ---------------- JOBS ---------------- */
async function loadJobs() {
  const res = await fetch(`${API}/admin/jobs`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();

  document.getElementById("jobs").innerHTML =
    data.data.map(j => `
      <div class="border p-2 mb-1">
        ${j.title} - ${j.company}
      </div>
    `).join("");
}

loadUsers();
loadJobs();