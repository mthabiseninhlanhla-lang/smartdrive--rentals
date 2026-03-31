function showSelectedCar() {
  const selectedCarDetails = document.getElementById("selectedCarDetails");
  if (!selectedCarDetails) return;

  const selectedCar = JSON.parse(localStorage.getItem("selectedCar"));

  if (!selectedCar) {
    selectedCarDetails.innerHTML = `
      <p>No car selected yet.</p>
      <p><a href="vehicles.html">Go to Cars Page</a></p>
    `;
    return;
  }

  selectedCarDetails.innerHTML = `
    <img 
      src="${selectedCar.image}" 
      alt="${selectedCar.brand} ${selectedCar.model}" 
      style="width:100%; max-height:220px; object-fit:cover; border-radius:10px; margin-bottom:15px;"
    >
    <h3>${selectedCar.brand} ${selectedCar.model}</h3>
    <p><strong>Category:</strong> ${selectedCar.category}</p>
    <p><strong>Year:</strong> ${selectedCar.year}</p>
    <p><strong>Location:</strong> ${selectedCar.location}</p>
    <p><strong>Price per day:</strong> $${selectedCar.price}</p>
  `;
}

function setupBookingForm() {
  const form = document.getElementById("bookingForm");
  const bookingMessage = document.getElementById("bookingMessage");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const selectedCar = JSON.parse(localStorage.getItem("selectedCar"));

    if (!selectedCar) {
      bookingMessage.innerHTML = `
        <div class="error-message">Please select a car first.</div>
      `;
      return;
    }

    const customerName = document.getElementById("customerName").value.trim();
    const customerEmail = document.getElementById("customerEmail").value.trim();
    const customerPhone = document.getElementById("customerPhone").value.trim();
    const pickupDate = document.getElementById("pickupDate").value;
    const returnDate = document.getElementById("returnDate").value;
    const pickupLocation = document.getElementById("pickupLocation").value.trim();
    const notes = document.getElementById("notes").value.trim();

    if (
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !pickupDate ||
      !returnDate ||
      !pickupLocation
    ) {
      bookingMessage.innerHTML = `
        <div class="error-message">Please fill in all required fields.</div>
      `;
      return;
    }

    if (returnDate < pickupDate) {
      bookingMessage.innerHTML = `
        <div class="error-message">Return date cannot be earlier than pickup date.</div>
      `;
      return;
    }

    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diffTime = end - start;
    const rentalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    const totalPrice = rentalDays * selectedCar.price;

    const bookingData = {
      customerName,
      customerEmail,
      customerPhone,
      pickupDate,
      returnDate,
      pickupLocation,
      notes,
      rentalDays,
      totalPrice,
      car: selectedCar,
      bookedAt: new Date().toLocaleString()
    };

    const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    allBookings.push(bookingData);
    localStorage.setItem("bookings", JSON.stringify(allBookings));
    localStorage.setItem("latestBooking", JSON.stringify(bookingData));

    bookingMessage.innerHTML = `
      <div class="success-message">
        Booking successful for <strong>${selectedCar.brand} ${selectedCar.model}</strong>.<br>
        Rental Days: <strong>${rentalDays}</strong><br>
        Total Price: <strong>$${totalPrice}</strong>
      </div>
    `;

    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  showSelectedCar();
  setupBookingForm();
});