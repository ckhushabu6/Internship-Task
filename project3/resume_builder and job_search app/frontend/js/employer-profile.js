const API = "http://localhost:5000/api";
const token = localStorage.getItem("token");

document.getElementById("companyForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const body = {
    companyName: document.getElementById("companyName").value,
    website: document.getElementById("companyWebsite").value,
    description: document.getElementById("companyDesc").value
  };

  await fetch(`${API}/user/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });

  alert("Updated!");
});