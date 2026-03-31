function showMessage(message, type = "success") {
  const box = document.getElementById("message");
  box.innerHTML = `<div class="message ${type}">${message}</div>`;
}

function setupRegister() {
  const form = document.getElementById("registerForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      full_name: document.getElementById("full_name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      phone: document.getElementById("phone").value,
      role: document.getElementById("role").value
    };

    try {
      const result = await apiRequest("/auth/register", "POST", payload);
      showMessage(result.message, "success");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1000);
    } catch (error) {
      showMessage(error.message, "error");
    }
  });
}

function setupLogin() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    };

    try {
      const result = await apiRequest("/auth/login", "POST", payload);

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      showMessage("Login successful", "success");

      setTimeout(() => {
        if (result.user.role === "customer") {
          window.location.href = "customer.html";
        } else if (result.user.role === "provider") {
          window.location.href = "provider.html";
        } else {
          window.location.href = "admin.html";
        }
      }, 700);
    } catch (error) {
      showMessage(error.message, "error");
    }
  });
}