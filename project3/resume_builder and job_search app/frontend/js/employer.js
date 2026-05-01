const API = "http://localhost:5000/api";
const token = localStorage.getItem("token");

// 🔐 protect page
if (!token) {
  window.location.href = "login.html";
}

/* ------------------ USER NAME ------------------ */
const user = JSON.parse(localStorage.getItem("user"));
if (user) {
  document.getElementById("userName").innerText = user.name;
}

/* ------------------ POST / UPDATE JOB ------------------ */
const form = document.getElementById("jobForm");
let editingJobId = null;

if (form) {
 form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const button = form.querySelector("button");
  button.disabled = true;
  button.innerText = "Saving...";

  const title = document.getElementById("title").value.trim();
  const company = document.getElementById("company").value.trim();
  const location = document.getElementById("location").value.trim();
  const description = document.getElementById("description").value.trim();

  const skills = document.getElementById("skills").value
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  try {
    const res = await fetch(`${API}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        company,
        location,
        description,
        skills
      })
    });

    const data = await res.json();

    if (!res.ok) {
      showMessage(data.message || "Error", "danger");
      return;
    }

    // ✅ SUCCESS
    showMessage("Job created successfully!", "success");

    // 🔥 HARD RESET (100% WORKING)
    document.getElementById("title").value = "";
    document.getElementById("company").value = "";
    document.getElementById("location").value = "";
    document.getElementById("description").value = "";
    document.getElementById("skills").value = "";

    // optional
    form.reset();

    fetchMyJobs();

  } catch {
    showMessage("Server error", "danger");
  } finally {
    button.disabled = false;
    button.innerText = "Save Job";
  }
});
}

/* ------------------ FETCH EMPLOYER JOBS ------------------ */
async function fetchMyJobs() {
  const container = document.getElementById("jobList");
  container.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(`${API}/jobs`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (!res.ok) {
      container.innerHTML = "<p>Error loading jobs</p>";
      return;
    }

    const jobs = data.data || [];

    renderJobs(jobs);

    // ✅ FIX: dashboard count
    const totalJobsEl = document.getElementById("totalJobs");
    if (totalJobsEl) {
      totalJobsEl.innerText = jobs.length;
    }

  } catch {
    container.innerHTML = "<p>Server error</p>";
  }
}

/* ------------------ RENDER JOBS ------------------ */
function renderJobs(jobs) {
  const container = document.getElementById("jobList");

  if (!jobs.length) {
    container.innerHTML = "<p>No jobs posted yet</p>";
    return;
  }

  container.innerHTML = jobs.map(job => `
    <div class="col-md-6">
      <div class="card p-3 shadow-sm">

  <h5><i class="fas fa-briefcase me-2 text-primary"></i>${job.title}</h5>

  <p class="text-muted">
    <i class="fas fa-building me-1"></i> ${job.company}
  </p>

  <p>
    <i class="fas fa-map-marker-alt me-1 text-danger"></i> ${job.location}
  </p>

  <div class="d-flex gap-2 mb-2">

    <button class="btn btn-outline-primary btn-sm"
      onclick="viewApplicants('${job._id}')">
      <i class="fas fa-users"></i>
    </button>

    <button class="btn btn-warning btn-sm"
      onclick="editJob('${job._id}')">
      <i class="fas fa-edit"></i>
    </button>

    <button class="btn btn-danger btn-sm"
      onclick="deleteJob('${job._id}')">
      <i class="fas fa-trash"></i>
    </button>

  </div>

  <div id="applicants-${job._id}" class="mt-2"></div>

</div>
    </div>
  `).join("");
}

/* ------------------ EDIT JOB ------------------ */
function editJob(jobId) {
  const job = window.jobsData.find(j => j._id === jobId);
  if (!job) return;

  editingJobId = jobId;

  document.getElementById("title").value = job.title;
  document.getElementById("company").value = job.company;
  document.getElementById("location").value = job.location;
  document.getElementById("description").value = job.description;
  document.getElementById("skills").value = (job.skills || []).join(",");

  window.scrollTo(0, 0);
}

/* ------------------ DELETE JOB ------------------ */
async function deleteJob(jobId) {
  if (!confirm("Delete this job?")) return;

  try {
    const res = await fetch(`${API}/jobs/${jobId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    showMessage(data.message, res.ok ? "success" : "danger");
    fetchMyJobs();

  } catch {
    showMessage("Server error", "danger");
  }
}

/* ------------------ VIEW APPLICANTS ------------------ */
async function viewApplicants(jobId) {
  const container = document.getElementById(`applicants-${jobId}`);
  container.innerHTML = "Loading...";

  try {
    const res = await fetch(`${API}/applications/job/${jobId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (!data.data || !data.data.length) {
      container.innerHTML = "<p>No applicants</p>";
      return;
    }

    container.innerHTML = data.data.map(app => {
      const resumeId = app.resumeId?._id || app.resumeId; // ✅ FIX

      return `
      <div class="border p-2 mb-2">

        <strong>${app.userId?.name || "User"}</strong><br>
        <small>${app.userId?.email || ""}</small><br>

        <span class="badge ${
          app.status === "shortlisted" ? "bg-success" :
          app.status === "rejected" ? "bg-danger" :
          "bg-secondary"
        }">
          ${app.status}
        </span>

        <div class="mt-2">

          <button class="btn btn-primary btn-sm"
            onclick="viewResume('${resumeId}')">
            View Resume
          </button>

          <button class="btn btn-success btn-sm"
            onclick="updateStatus('${app._id}','shortlisted')"
            ${app.status !== "pending" ? "disabled" : ""}>
            Shortlist
          </button>

          <button class="btn btn-danger btn-sm"
            onclick="updateStatus('${app._id}','rejected')"
            ${app.status !== "pending" ? "disabled" : ""}>
            Reject
          </button>

        </div>

      </div>
      `;
    }).join("");

  } catch {
    container.innerHTML = "Error";
  }
}

/* ------------------ UPDATE STATUS ------------------ */
async function updateStatus(appId, status) {
  try {
    const res = await fetch(`${API}/applications/${appId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });

    const data = await res.json();

    showMessage(data.message, res.ok ? "success" : "danger");
    fetchMyJobs();

  } catch {
    showMessage("Server error", "danger");
  }
}

/* ------------------ VIEW RESUME ------------------ */
function viewResume(resumeId) {
  if (!resumeId) {
    showMessage("No resume found", "danger");
    return;
  }

  window.open(`resume-preview.html?id=${resumeId}`, "_blank");
}

/* ------------------ MESSAGE ------------------ */
function showMessage(text, type) {
  const box = document.getElementById("messageBox");

  box.className = `alert alert-${type}`;
  box.innerText = text;
  box.classList.remove("d-none");

  setTimeout(() => {
    box.classList.add("d-none");
  }, 3000);
}

/* ------------------ SECTION SWITCH ------------------ */
function showSection(section) {
  document.getElementById("dashboardSection").classList.add("d-none");
  document.getElementById("postJobSection").classList.add("d-none");
  document.getElementById("jobsSection").classList.add("d-none");

  if (section === "dashboard") {
    document.getElementById("dashboardSection").classList.remove("d-none");
  }

  if (section === "postJob") {
    document.getElementById("postJobSection").classList.remove("d-none");
  }

  if (section === "jobs") {
    document.getElementById("jobsSection").classList.remove("d-none");
    fetchMyJobs();
  }
}

/* ------------------ INIT ------------------ */
fetchMyJobs();