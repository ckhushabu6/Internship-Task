const API = "http://localhost:5000/api";
const token = localStorage.getItem("token");

// 🔐 protect page
if (!token) {
  window.location.href = "login.html";
}

/* ------------------ ADD EDUCATION ------------------ */
function addEducation() {
  const container = document.getElementById("educationContainer");
  if (!container) return;

  const div = document.createElement("div");
  div.classList.add("mb-2");

  div.innerHTML = `
    <input type="text" placeholder="Degree" class="form-control mb-1 degree" required>
    <input type="text" placeholder="Institution" class="form-control mb-1 institution" required>
    <input type="text" placeholder="Year" class="form-control mb-1 year">
    <button type="button" class="btn btn-sm btn-danger mt-1" onclick="this.parentElement.remove()">Remove</button>
  `;

  container.appendChild(div);
}

/* ------------------ ADD EXPERIENCE ------------------ */
function addExperience() {
  const container = document.getElementById("experienceContainer");
  if (!container) return;

  const div = document.createElement("div");
  div.classList.add("mb-2");

  div.innerHTML = `
    <input type="text" placeholder="Company" class="form-control mb-1 company" required>
    <input type="text" placeholder="Role" class="form-control mb-1 role" required>
    <input type="text" placeholder="Years" class="form-control mb-1 years">
    <button type="button" class="btn btn-sm btn-danger mt-1" onclick="this.parentElement.remove()">Remove</button>
  `;

  container.appendChild(div);
}

/* ------------------ SUBMIT FORM ------------------ */
const form = document.getElementById("resumeForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector("button");
    submitBtn.disabled = true;
    submitBtn.innerText = "Saving...";

    // collect data
    const personalInfo = {
      fullName: document.getElementById("fullName").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      summary: document.getElementById("summary").value.trim()
    };

    // validation
    if (!personalInfo.fullName || !personalInfo.email) {
      alert("Name and Email are required");
      submitBtn.disabled = false;
      submitBtn.innerText = "Save Resume";
      return;
    }

    // skills clean
    const skills = document.getElementById("skills").value
      .split(",")
      .map(s => s.trim())
      .filter(s => s.length > 0);

    // education
    const education = [];
    document.querySelectorAll("#educationContainer > div").forEach(el => {
      const degree = el.querySelector(".degree").value.trim();
      const institution = el.querySelector(".institution").value.trim();

      if (degree && institution) {
        education.push({
          degree,
          institution,
          year: el.querySelector(".year").value.trim()
        });
      }
    });

    // experience
    const experience = [];
    document.querySelectorAll("#experienceContainer > div").forEach(el => {
      const company = el.querySelector(".company").value.trim();
      const role = el.querySelector(".role").value.trim();

      if (company && role) {
        experience.push({
          company,
          role,
          years: el.querySelector(".years").value.trim()
        });
      }
    });

    try {
      const res = await fetch(`${API}/resume`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          personalInfo,
          skills,
          education,
          experience
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      document.getElementById("successMessage")?.classList.remove("d-none");
      form.reset();

    } catch (err) {
      alert("Server error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerText = "Save Resume";
    }
  });
}

/* ------------------ LOAD PREVIEW ------------------ */
async function loadResumePreview() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  // ✅ GET ID FROM URL
  const params = new URLSearchParams(window.location.search);
  const resumeId = params.get("id");

  try {
    let url;

    // ✅ IF employer opened specific resume
    if (resumeId) {
      url = `${API}/resume/${resumeId}`;
    } else {
      // normal user preview
      url = `${API}/resume`;
    }

    const res = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Failed to load resume");
      return;
    }

    const resume = resumeId ? data.data : data.data[0];

    if (!resume) {
      alert("No resume found");
      return;
    }

    renderResume(resume);

  } catch {
    alert("Server error");
  }
}
/* ------------------ RENDER ------------------ */
function renderResume(resume) {
  const p = resume.personalInfo || {};

  document.getElementById("personalInfo").innerHTML = `
    <h2>${p.fullName || ""}</h2>
    <p>${p.email || ""} ${p.phone ? "| " + p.phone : ""}</p>
    <p>${p.summary || ""}</p>
  `;

  document.getElementById("skillsList").innerHTML =
    (resume.skills || []).map(skill =>
      `<span class="skill-badge">${skill}</span>`
    ).join("");

  document.getElementById("educationList").innerHTML =
    (resume.education || []).map(edu => `
      <div class="mb-2">
        <strong>${edu.degree}</strong> - ${edu.institution}
        <div class="text-muted">${edu.year || ""}</div>
      </div>
    `).join("");

  document.getElementById("experienceList").innerHTML =
    (resume.experience || []).map(exp => `
      <div class="mb-2">
        <strong>${exp.role}</strong> - ${exp.company}
        <div class="text-muted">${exp.years || ""}</div>
      </div>
    `).join("");
}




function downloadPDF() {
  const element = document.getElementById("resumeContent");

  const opt = {
    margin: 0.5,
    filename: "My_Resume.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
  };

  html2pdf().set(opt).from(element).save();
}


function editResume() {
  const params = new URLSearchParams(window.location.search);
  const resumeId = params.get("id");

  if (!resumeId) {
    alert("No resume ID");
    return;
  }

  window.location.href = `resume.html?id=${resumeId}`;
}


async function loadResumeForEdit() {
  const params = new URLSearchParams(window.location.search);
  const resumeId = params.get("id");

  if (!resumeId) return; // normal create mode

  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:5000/api/resume/${resumeId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();
  const r = data.data;

  // fill form
  document.getElementById("fullName").value = r.personalInfo.fullName;
  document.getElementById("email").value = r.personalInfo.email;
  document.getElementById("phone").value = r.personalInfo.phone;
  document.getElementById("summary").value = r.personalInfo.summary;

  document.getElementById("skills").value = r.skills.join(",");

  // education
  r.education.forEach(e => {
    addEducation();
    const last = document.querySelector("#educationContainer > div:last-child");

    last.querySelector(".degree").value = e.degree;
    last.querySelector(".institution").value = e.institution;
    last.querySelector(".year").value = e.year;
  });

  // experience
  r.experience.forEach(e => {
    addExperience();
    const last = document.querySelector("#experienceContainer > div:last-child");

    last.querySelector(".company").value = e.company;
    last.querySelector(".role").value = e.role;
    last.querySelector(".years").value = e.years;
  });
}