document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const responseBox = document.getElementById("contactResponse");

  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const subject = document.getElementById("contactSubject").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !subject || !message) {
      responseBox.innerHTML = `
        <div class="error-message">Please fill in all fields.</div>
      `;
      return;
    }

    const contactData = {
      name,
      email,
      subject,
      message,
      sentAt: new Date().toLocaleString()
    };

    const oldMessages = JSON.parse(localStorage.getItem("contactMessages")) || [];
    oldMessages.push(contactData);
    localStorage.setItem("contactMessages", JSON.stringify(oldMessages));

    responseBox.innerHTML = `
      <div class="success-message">
        Thank you, <strong>${name}</strong>. Your message has been sent successfully.
      </div>
    `;

    contactForm.reset();
  });
});