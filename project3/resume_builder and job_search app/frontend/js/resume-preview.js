const API = "http://localhost:5000/api";
const token = localStorage.getItem("token");

const params = new URLSearchParams(window.location.search);
const resumeId = params.get("id");

if (!resumeId) {
  alert("No resume ID");
}

/* ------------------ LOAD RESUME ------------------ */
async function loadResume() {
  const res = await fetch(`${API}/resume/${resumeId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();

  if (!res.ok) {
    alert("Failed to load resume");
    return;
  }

  renderResume(data.data);
}

/* ------------------ RENDER ------------------ */
function renderResume(r) {
  const p = r.personalInfo;

  document.getElementById("resumeContainer").innerHTML = `
    <div class="resume-box p-4 shadow">

      <h2>${p.fullName}</h2>
      <p>${p.email} | ${p.phone || ""}</p>

      <hr>

      <h5>Summary</h5>
      <p>${p.summary || ""}</p>

      <h5>Skills</h5>
      <p>${(r.skills || []).join(", ")}</p>

      <h5>Education</h5>
      ${(r.education || []).map(e => `
        <div>
          <strong>${e.degree}</strong> - ${e.institution}
          <div>${e.year}</div>
        </div>
      `).join("")}

      <h5>Experience</h5>
      ${(r.experience || []).map(e => `
        <div>
          <strong>${e.role}</strong> - ${e.company}
          <div>${e.years}</div>
        </div>
      `).join("")}

    </div>
  `;
}

loadResume();