const BASE_URL = "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("token");
}

function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

async function apiRequest(endpoint, method = "GET", data = null, auth = false) {
  const headers = {
    "Content-Type": "application/json"
  };

  if (auth && getToken()) {
    headers["Authorization"] = `Bearer ${getToken()}`;
  }

  const options = {
    method,
    headers
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Request failed");
  }

  return result;
}

function renderNavbar() {
  const nav = document.getElementById("navbar");
  if (!nav) return;

  const user = getUser();

  nav.innerHTML = `
    <nav>
      <h2>SmartDrive Rentals</h2>
      <div class="links">
        <a href="index.html">Home</a>
        <a href="vehicles.html">Vehicles</a>
        ${
          !user
            ? `
              <a href="login.html">Login</a>
              <a href="register.html">Register</a>
            `
            : `
              ${
                user.role === "customer"
                  ? `<a href="customer.html">Dashboard</a>`
                  : user.role === "provider"
                  ? `<a href="provider.html">Dashboard</a>`
                  : `<a href="admin.html">Dashboard</a>`
              }
              <button onclick="logout()">Logout</button>
            `
        }
      </div>
    </nav>
  `;
}