function providerMessage(message, type = "success") {
  document.getElementById("providerMessage").innerHTML =
    `<div class="message ${type}">${message}</div>`;
}

async function loadMyVehicles() {
  const container = document.getElementById("myVehicles");

  try {
    const vehicles = await apiRequest("/vehicles/mine", "GET", null, true);

    if (!vehicles.length) {
      container.innerHTML = "<p>No vehicles added yet.</p>";
      return;
    }

    container.innerHTML = vehicles
      .map(
        (v) => `
          <div class="card">
            <h3>${v.brand} ${v.model}</h3>
            <p><strong>Year:</strong> ${v.year}</p>
            <p><strong>Location:</strong> ${v.location}</p>
            <p><strong>Price/Day:</strong> ${v.price_per_day}</p>
          </div>
        `
      )
      .join("");
  } catch (error) {
    container.innerHTML = `<div class="message error">${error.message}</div>`;
  }
}

function setupProviderPage() {
  const user = getUser();
  if (!user || user.role !== "provider") {
    window.location.href = "login.html";
    return;
  }

  loadMyVehicles();

  const form = document.getElementById("vehicleForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      brand: document.getElementById("brand").value,
      model: document.getElementById("model").value,
      year: Number(document.getElementById("year").value),
      price_per_day: Number(document.getElementById("price_per_day").value),
      location: document.getElementById("location").value
    };

    try {
      const result = await apiRequest("/vehicles", "POST", payload, true);
      providerMessage(result.message, "success");
      form.reset();
      loadMyVehicles();
    } catch (error) {
      providerMessage(error.message, "error");
    }
  });
}