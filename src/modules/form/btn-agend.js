document.addEventListener("DOMContentLoaded", () => {
  const btnAgend = document.querySelector(".btn-agend");
  const aside = document.getElementById("schedule");
  const main = document.querySelector(".main");
  const inputDate = document.getElementById("input");

  // Define data atual
  const today = new Date().toISOString().split("T")[0];
  if (inputDate && !inputDate.value) {
    inputDate.value = today;
    inputDate.min = today;
  }

  // Fecha painel de agendamento
  function fecharAgendamento() {
    aside.style.display = "none";
    main.classList.remove("embassy");
    document.querySelectorAll(".btn-agendamento").forEach(btn => btn.classList.remove("embassy"));
  }

  // Envia agendamento
  btnAgend?.addEventListener("click", (e) => {
    e.preventDefault();

    const tutorValue = document.getElementById("tutor").value;
    const petValue = document.getElementById("pet").value;
    const phoneValue = document.getElementById("phone").value;
    const serviceValue = document.getElementById("service").value;
    const dateValue = document.getElementById("date").value;
    const hourValue = document.getElementById("hour-input").value;

    if (!tutorValue || !petValue || !phoneValue || !serviceValue || !dateValue || !hourValue) {
      alert("Preencha todos os campos antes de agendar.");
      return;
    }

    const period = getPeriod(hourValue);
    if (!period) {
      alert("Horário fora dos períodos disponíveis.");
      return;
    }

    const bookingData = {
      tutor: tutorValue,
      pet: petValue,
      phone: phoneValue,
      service: serviceValue,
      date: dateValue,
      hour: hourValue,
      period: period
    };

    btnAgend.disabled = true;

    fetch("http://localhost:3333/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData)
    })
    .then(response => {
      if (!response.ok) throw new Error("Erro ao salvar no servidor.");
      return response.json();
    })
    .then(data => {
      console.log("Agendamento salvo:", data);
      loadBookingsByDate(data.date);
      fecharAgendamento();
    })
    .catch(error => {
      console.error("Erro:", error);
      alert("Falha ao agendar. Verifique o servidor.");
    })
    .finally(() => {
      btnAgend.disabled = false;
    });
  });
});
