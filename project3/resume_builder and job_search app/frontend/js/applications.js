protectPage("user");

const API = "http://localhost:5000/api";
const token = localStorage.getItem("token");

async function loadApplications() {
  const res = await fetch(`${API}/application/my`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();

  const container = document.getElementById("applicationsList");

  if (!data.data.length) {
    container.innerHTML = "<p>No applications yet</p>";
    return;
  }

  container.innerHTML = data.data.map(app => `
    <div class="card p-3 mb-2">
      <h5>${app.jobId.title}</h5>
      <p>${app.jobId.company}</p>
      <span class="badge bg-info">${app.status}</span>
    </div>
  `).join("");
}

loadApplications();