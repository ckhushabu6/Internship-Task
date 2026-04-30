const API = "http://localhost:5000/api";
const token = localStorage.getItem("token");

// 🔐 protect page
if (!token) {
  window.location.href = "login.html";
}

/* ------------------ POST JOB ------------------ */
const form = document.getElementById("jobForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

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
        showMessage(data.message, "danger");
        return;
      }

      showMessage("Job posted successfully!", "success");

      form.reset();
      fetchMyJobs();

    } catch (err) {
      showMessage("Server error", "danger");
    }
  });
}

/* ------------------ FETCH EMPLOYER JOBS ------------------ */
async function fetchMyJobs() {
  const container = document.getElementById("jobList");
  container.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(`${API}/jobs/my-jobs`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

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
  const container = document.getElementById("jobList");

  if (!jobs.length) {
    container.innerHTML = "<p>No jobs posted yet</p>";
    return;
  }

  container.innerHTML = jobs.map(job => `
    <div class="col-md-6">
      <div class="card p-3 shadow-sm">

        <h5>${job.title}</h5>
        <p>${job.company}</p>

        <button class="btn btn-outline-primary btn-sm"
          onclick="viewApplicants('${job._id}')">
          View Applicants
        </button>

        <div id="applicants-${job._id}" class="mt-2"></div>

      </div>
    </div>
  `).join("");
}

/* ------------------ VIEW APPLICANTS ------------------ */
async function viewApplicants(jobId) {
  const container = document.getElementById(`applicants-${jobId}`);
  container.innerHTML = "Loading applicants...";

  try {
    const res = await fetch(`${API}/application/job/${jobId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (!res.ok) {
      container.innerHTML = "Error loading applicants";
      return;
    }

    if (!data.data.length) {
      container.innerHTML = "<p>No applicants yet</p>";
      return;
    }

    container.innerHTML = data.data.map(app => `
      <div class="border p-2 mb-1">
        <strong>${app.userId?.name || "User"}</strong><br>
        <small>${app.userId?.email || ""}</small>
      </div>
    `).join("");

  } catch (err) {
    container.innerHTML = "Server error";
  }
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

/* ------------------ LOAD ON PAGE ------------------ */
fetchMyJobs();