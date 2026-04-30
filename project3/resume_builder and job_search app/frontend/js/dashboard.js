const API = "http://localhost:5000/api";
const token = localStorage.getItem("token");

protectPage("user");

/* ------------------ PROFILE ------------------ */
function loadUserProfile() {
  const user = getUser();

  if (!user) return;

  document.getElementById("profileBox").innerHTML = `
    <div class="card p-3">
      <h5>${user.name}</h5>
      <p>${user.email}</p>
      <span class="badge bg-info">${user.role}</span>
    </div>
  `;
}

/* ------------------ RESUMES ------------------ */
async function loadResumes() {
  try {
    const res = await fetch(`${API}/resume`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();

    const container = document.getElementById("resumeList");

    if (!data.data || data.data.length === 0) {
      container.innerHTML = "<p>No resumes created</p>";
      return;
    }

   container.innerHTML = data.data.map(r => `
  <div class="card p-3 mb-2 cursor-pointer" 
       onclick="openResume('${r._id}')"
       style="cursor:pointer">

    <strong>${r.personalInfo?.fullName || "No Name"}</strong>
    <p>${r.personalInfo?.email || ""}</p>

    <small class="text-muted">Click to view full resume</small>
      </div>
    `).join("");

  } catch (err) {
    console.error(err);
  }
}

function openResume(id) {
  window.location.href = `resume-preview.html?id=${id}`;
}

/* ------------------ APPLICATIONS ------------------ */
async function loadApplications() {
  try {
    const res = await fetch(`${API}/applications/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();

    const container = document.getElementById("applicationList");

    if (!data.data || data.data.length === 0) {
      container.innerHTML = "<p>No applications yet</p>";
      return;
    }

    container.innerHTML = data.data.map(app => `
      <div class="card p-2 mb-2">
        <h6>${app.jobId?.title || "No Title"}</h6>
        <p>${app.jobId?.company || ""}</p>
        <span class="badge bg-success">${app.status}</span>
      </div>
    `).join("");

  } catch (err) {
    console.error(err);
  }
}

/* ------------------ LOAD ALL ------------------ */
loadUserProfile();
loadResumes();
loadApplications();