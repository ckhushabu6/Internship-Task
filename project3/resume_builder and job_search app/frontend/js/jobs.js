const API = "http://localhost:5000/api";

/* ------------------ FETCH JOBS ------------------ */
async function fetchJobs() {
  const skill = document.getElementById("skillInput")?.value.trim() || "";
  const location = document.getElementById("locationInput")?.value.trim() || "";

  const container = document.getElementById("jobsContainer");
  const emptyState = document.getElementById("emptyState");

  if (!container) return;

  container.innerHTML = "<p>Loading jobs...</p>";
  emptyState?.classList.add("d-none");

  try {
    let url = `${API}/jobs`;

    const params = [];
    if (skill) params.push(`skill=${encodeURIComponent(skill)}`);
    if (location) params.push(`location=${encodeURIComponent(location)}`);

    if (params.length) {
      url += `?${params.join("&")}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      container.innerHTML = "<p>Error loading jobs</p>";
      return;
    }

    renderJobs(data.data);

  } catch (err) {
    container.innerHTML = "<p>Server error</p>";
  }
}

/* ------------------ RENDER JOBS ------------------ */
function renderJobs(jobs) {
  const container = document.getElementById("jobsContainer");
  const emptyState = document.getElementById("emptyState");

  if (!container) return;

  if (!jobs || jobs.length === 0) {
    container.innerHTML = "";
    emptyState?.classList.remove("d-none");
    return;
  }

  container.innerHTML = jobs.map(job => `
    <div class="col-lg-4 col-md-6 col-12">
      <div class="card h-100 shadow-sm p-3">

        <h5>${job.title}</h5>
        <p class="text-muted">${job.company}</p>

        <p><strong>Location:</strong> ${job.location || "N/A"}</p>

        <div class="mb-2">
          ${(job.skills || []).map(skill => `
            <span class="badge bg-primary me-1">${skill}</span>
          `).join("")}
        </div>

        <p class="small text-muted">
          ${job.description?.slice(0, 80) || ""}...
        </p>

        <button 
          class="btn btn-success btn-sm mt-auto apply-btn" 
          data-id="${job._id}"
          onclick="applyJob(this)"
        >
          Apply
        </button>

      </div>
    </div>
  `).join("");
}

/* ------------------ APPLY JOB ------------------ */
async function applyJob(button) {
  const jobId = button.getAttribute("data-id");
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  button.disabled = true;
  button.innerText = "Applying...";

  try {
    const res = await fetch(`${API}/application`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ jobId })
    });

    const data = await res.json();

    if (!res.ok) {
      showMessage(data.message || "Application failed", "danger");
      button.disabled = false;
      button.innerText = "Apply";
      return;
    }

    showMessage("Applied successfully!", "success");

    button.innerText = "Applied";
    button.classList.remove("btn-success");
    button.classList.add("btn-secondary");

  } catch (err) {
    showMessage("Server error", "danger");
    button.disabled = false;
    button.innerText = "Apply";
  }
}

/* ------------------ MESSAGE FUNCTION ------------------ */
function showMessage(text, type) {
  const box = document.getElementById("messageBox");
  if (!box) return;

  box.className = `alert alert-${type} text-center`;
  box.innerText = text;
  box.classList.remove("d-none");

  setTimeout(() => {
    box.classList.add("d-none");
  }, 3000);
}

/* ------------------ AUTO LOAD ------------------ */
fetchJobs();