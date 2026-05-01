protectPage("user");

const API = "http://localhost:5000/api";
const token = localStorage.getItem("token");

/* ------------------ LOAD APPLICATIONS ------------------ */
async function loadApplications() {
  const container = document.getElementById("applicationsList");

  container.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(`${API}/applications/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (!res.ok) {
      container.innerHTML = "<p>Error loading applications</p>";
      return;
    }

    if (!data.data || data.data.length === 0) {
      container.innerHTML = "<p>No applications yet</p>";
      return;
    }

    renderApplications(data.data);

  } catch (err) {
    container.innerHTML = "<p>Server error</p>";
  }
}

/* ------------------ RENDER ------------------ */
function renderApplications(apps) {
  const container = document.getElementById("applicationsList");

  container.innerHTML = apps.map(app => `
    <div class="card p-3 mb-3 shadow-sm">

      <h5>${app.jobId?.title || "Job"}</h5>
      <p class="text-muted">${app.jobId?.company || ""}</p>

      <p><strong>Location:</strong> ${app.jobId?.location || "N/A"}</p>

      <!-- STATUS -->
      <span class="badge ${
        app.status === "shortlisted" ? "bg-success" :
        app.status === "rejected" ? "bg-danger" :
        "bg-secondary"
      }">
        ${app.status}
      </span>

      <!-- VIEW RESUME -->
      <div class="mt-2">
        <button class="btn btn-sm btn-outline-primary"
          onclick="viewResume('${app.resumeId}')">
          View Resume
        </button>
      </div>

    </div>
  `).join("");
}

/* ------------------ VIEW RESUME ------------------ */
function viewResume(resumeId) {
  window.location.href = `resume-preview.html?id=${resumeId}`;
}

/* ------------------ INIT ------------------ */
loadApplications();