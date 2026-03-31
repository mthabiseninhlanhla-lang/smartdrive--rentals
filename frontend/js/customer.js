async function loadCustomerBookings() {
  const user = getUser();
  if (!user || user.role !== "customer") {
    window.location.href = "login.html";
    return;
  }

  const container = document.getElementById("bookingList");

  try {
    const bookings = await apiRequest("/bookings/customer", "GET", null, true);

    if (!bookings.length) {
      container.innerHTML = `<div class="card">No bookings found.</div>`;
      return;
    }

    container.innerHTML = bookings
      .map(
        (booking) => `
          <div class="card">
            <h3>${booking.brand} ${booking.model}</h3>
            <p><strong>Status:</strong> ${booking.status}</p>
            <p><strong>Start:</strong> ${booking.start_date?.slice(0, 10)}</p>
            <p><strong>End:</strong> ${booking.end_date?.slice(0, 10)}</p>
            <p><strong>Total:</strong> ${booking.total_price}</p>
          </div>
        `
      )
      .join("");
  } catch (error) {
    container.innerHTML = `<div class="message error">${error.message}</div>`;
  }
}