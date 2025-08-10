function loadBookings() {
  fetch("http://localhost:3333/bookings")
    .then(response => {
      if (!response.ok) throw new Error("Erro ao buscar agendamentos.");
      return response.json();
    })
    .then(bookings => {
      bookings.forEach(data => {
        const booking = document.createElement("div");
        booking.classList.add("booking");

        booking.innerHTML = `
          <p class="tutor">Tutor: ${data.tutor}</p>
          <p class="pet">Pet: ${data.pet}</p>
          <p class="phone">Phone: ${data.phone}</p>
          <p class="service">Service: ${data.service}</p>
          <p class="date">Date: ${data.date}</p>
          <p class="hour">Hour: ${data.hour}</p>
        `;

        const container = document.getElementById(data.period);
        if (container) container.appendChild(booking);
      });
    })
    .catch(error => {
      console.error("Erro ao carregar agendamentos:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  loadBookings();
});
