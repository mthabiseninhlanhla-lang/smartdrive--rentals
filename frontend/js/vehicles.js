const vehicles = [
  {
    name: "Toyota Starlet",
    type: "Hatchback",
    price: 450,
    transmission: "Manual",
    seats: 5,
    fuel: "Petrol",
    image: "images/Toyota Starlet.jpg"
  },
  {
    name: "Volkswagen Polo Vivo",
    type: "Hatchback",
    price: 480,
    transmission: "Manual",
    seats: 5,
    fuel: "Petrol",
    image: "images/VW Polo.webp"
  },
  {
    name: "Suzuki Swift",
    type: "Compact",
    price: 460,
    transmission: "Automatic",
    seats: 5,
    fuel: "Petrol",
    image: "images/Suzuki Starlet.webp"
  },
  {
    name: "Hyundai Grand i10",
    type: "Compact",
    price: 430,
    transmission: "Manual",
    seats: 5,
    fuel: "Petrol",
    image: "images/Hyundai i10.webp"
  },
  {
    name: "Renault Kwid",
    type: "Compact",
    price: 390,
    transmission: "Manual",
    seats: 5,
    fuel: "Petrol",
    image: "images/renault-kwid-main.jpg"
  },
  {
    name: "Toyota Corolla Quest",
    type: "Sedan",
    price: 620,
    transmission: "Automatic",
    seats: 5,
    fuel: "Petrol",
    image: "images/Corolla Quest.jpg"
  },
  {
    name: "Volkswagen Jetta",
    type: "Sedan",
    price: 680,
    transmission: "Automatic",
    seats: 5,
    fuel: "Petrol",
    image: "images/Jetta.webp"
  },
  {
    name: "Honda Civic Sedan",
    type: "Sedan",
    price: 720,
    transmission: "Automatic",
    seats: 5,
    fuel: "Petrol",
    image: "images/Honda Civic Sedan.webp"
  },
  {
    name: "Toyota Corolla Cross",
    type: "SUV",
    price: 890,
    transmission: "Automatic",
    seats: 5,
    fuel: "Hybrid",
    image: "images/Toyota Cross.jpg"
  },
  {
    name: "Hyundai Creta",
    type: "SUV",
    price: 850,
    transmission: "Automatic",
    seats: 5,
    fuel: "Petrol",
    image: "images/Hyundai Creta.jpg"
  },
  {
    name: "Kia Sonet",
    type: "SUV",
    price: 780,
    transmission: "Automatic",
    seats: 5,
    fuel: "Petrol",
    image: "images/Kia Sonet.jpg"
  },
  {
    name: "Nissan X-Trail",
    type: "SUV",
    price: 980,
    transmission: "Automatic",
    seats: 7,
    fuel: "Petrol",
    image: "images/Nissan-X-trail-.jpg"
  },
  {
    name: "Toyota Fortuner",
    type: "4x4 SUV",
    price: 1400,
    transmission: "Automatic",
    seats: 7,
    fuel: "Diesel",
    image: "images/Toyota Fortuner.jpg"
  },
  {
    name: "Ford Everest",
    type: "4x4 SUV",
    price: 1450,
    transmission: "Automatic",
    seats: 7,
    fuel: "Diesel",
    image: "images/Toyota Everest.webp"
  },
  {
    name: "Isuzu MU-X",
    type: "4x4 SUV",
    price: 1380,
    transmission: "Automatic",
    seats: 7,
    fuel: "Diesel",
    image: "images/Isuzu MU X.webp"
  },
  {
    name: "Mercedes-Benz C-Class",
    type: "Luxury Sedan",
    price: 1600,
    transmission: "Automatic",
    seats: 5,
    fuel: "Petrol",
    image: "images/Mercedes C Class.jpg"
  },
  {
    name: "BMW 3 Series",
    type: "Luxury Sedan",
    price: 1550,
    transmission: "Automatic",
    seats: 5,
    fuel: "Petrol",
    image: "images/BMW 3 Series.webp"
  },
  {
    name: "Audi A4",
    type: "Luxury Sedan",
    price: 1580,
    transmission: "Automatic",
    seats: 5,
    fuel: "Petrol",
    image: "images/Audi A4.webp"
  },
  {
    name: "Toyota Hilux",
    type: "Pickup",
    price: 1250,
    transmission: "Manual",
    seats: 5,
    fuel: "Diesel",
    image: "images/Toyot Hilux.webp"
  },
  {
    name: "Ford Ranger",
    type: "Pickup",
    price: 1320,
    transmission: "Automatic",
    seats: 5,
    fuel: "Diesel",
    image: "images/Ford Ranger.avif"
  },
  {
    name: "Isuzu D-Max",
    type: "Pickup",
    price: 1290,
    transmission: "Manual",
    seats: 5,
    fuel: "Diesel",
    image: "images/Isuzu D Max.webp"
  },
  {
    name: "Toyota Quantum",
    type: "Minibus",
    price: 1500,
    transmission: "Manual",
    seats: 14,
    fuel: "Diesel",
    image: "images/Quantam.jpg"
  },
  {
    name: "Hyundai Staria",
    type: "Minibus",
    price: 1480,
    transmission: "Automatic",
    seats: 9,
    fuel: "Diesel",
    image: "images/Hyundai Staria.webp"
  },
  {
  name: "Volkswagen Kombi",
  type: "Minibus",
  price: 1350,
  transmission: "Manual",
  seats: 9,
  fuel: "Diesel",
  image: "images/VW Kombi.jfif"
}
];

const vehicleList = document.getElementById("vehicleList");
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const priceFilter = document.getElementById("priceFilter");
const resultsCount = document.getElementById("resultsCount");

function renderVehicles(vehicleArray) {
  vehicleList.innerHTML = "";

  if (vehicleArray.length === 0) {
    vehicleList.innerHTML = `
      <div class="empty-state">
        <h3>No vehicles found</h3>
        <p>Try changing your search or filter options.</p>
      </div>
    `;
    resultsCount.textContent = "Showing 0 vehicles";
    return;
  }

  vehicleArray.forEach(vehicle => {
    const card = document.createElement("div");
    card.className = "vehicle-card";

    card.innerHTML = `
      <img src="${vehicle.image}" alt="${vehicle.name}" />
      <div class="vehicle-content">
        <div class="vehicle-top">
          <h3 class="vehicle-name">${vehicle.name}</h3>
        </div>
        <span class="vehicle-type">${vehicle.type}</span>
        <div class="vehicle-specs">
          <p><strong>Transmission:</strong> ${vehicle.transmission}</p>
          <p><strong>Seats:</strong> ${vehicle.seats}</p>
          <p><strong>Fuel:</strong> ${vehicle.fuel}</p>
          <p><strong>Availability:</strong> In Stock</p>
        </div>
        <div class="vehicle-price">R${vehicle.price} <span>/ day</span></div>
        <div class="vehicle-actions">
          <a href="booking.html" class="btn btn-primary">Book Now</a>
          <a href="contact.html" class="btn btn-secondary">Enquire</a>
        </div>
      </div>
    `;

    vehicleList.appendChild(card);
  });

  resultsCount.textContent = `Showing ${vehicleArray.length} vehicle${vehicleArray.length > 1 ? "s" : ""}`;
}

function filterVehicles() {
  const searchValue = searchInput.value.toLowerCase().trim();
  const typeValue = typeFilter.value;
  const priceValue = priceFilter.value;

  const filtered = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchValue);
    const matchesType = typeValue === "all" || vehicle.type === typeValue;
    const matchesPrice = priceValue === "all" || vehicle.price <= Number(priceValue);

    return matchesSearch && matchesType && matchesPrice;
  });

  renderVehicles(filtered);
}

searchInput.addEventListener("input", filterVehicles);
typeFilter.addEventListener("change", filterVehicles);
priceFilter.addEventListener("change", filterVehicles);

renderVehicles(vehicles);