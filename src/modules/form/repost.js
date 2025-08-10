// import React, { useEffect } from 'react';

// Gera um ID único para cada agendamento
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

//  Conjunto para controlar IDs já renderizados (não está sendo usado no momento)
const renderedIds = new Set();

// Determina o período do dia com base no horário informado
function getPeriod(hour) {
  const [h, m] = hour.split(":").map(Number);
  const totalMinutes = h * 60 + m;

  if (totalMinutes >= 540 && totalMinutes < 720) return "morning";     // 09:00–11:59
  if (totalMinutes >= 780 && totalMinutes < 1080) return "afternoon";  // 13:00–17:59
  if (totalMinutes >= 1140 && totalMinutes <= 1260) return "night";    // 19:00–21:00
  return null; // Fora dos períodos definidos
}

//  Capitaliza apenas a primeira letra de cada palavra
function capitalizeWords(str) {
  return str
    .toLowerCase()
    .replace(/\b\w+/g, word => word.charAt(0).toUpperCase() + word.slice(1));
}


//  Cria visualmente o agendamento na interface
function renderBooking(data) {
  console.log("Renderizando agendamento:", data);

  if (!data.id || !data.hour || !data.pet || !data.tutor || !data.service || !data.period || !data.phone) {
    console.warn("Dados incompletos para renderização:", data);
    return;
  }

  const container = document.getElementById(data.period);
  if (!container) {
    console.warn("Período inválido:", data.period);
    return;
  }

  if (container.querySelector(`[data-id="${data.id}"]`)) return;

  const item = document.createElement("li");
  item.classList.add("agendamento-item");
  item.setAttribute("data-id", data.id);

  item.innerHTML = `
    <div class="info">
      <span class="hour"><strong>${data.hour}</strong></span>
      <span class="name-animal">${data.pet}</span>
      <span class="tutor">/ ${data.tutor}</span>
      <span class="service">${data.service}</span>
    </div>
    <button class="cancel-item">Remover Agendamento</button>
  `;

  container.appendChild(item);

  item.querySelector(".cancel-item").addEventListener("click", () => {
    const confirmDelete = confirm("Tem certeza que deseja remover este agendamento?");
    if (!confirmDelete) return;

    item.remove();

    fetch(`http://localhost:3333/bookings/${data.id}`, {
      method: "DELETE"
    })
      .then(response => {
        if (!response.ok) throw new Error("Erro ao excluir do servidor.");
        console.log(`Agendamento ${data.id} removido do servidor.`);
      })
      .catch(error => {
        console.error("Erro ao excluir:", error);
        alert("Falha ao remover do servidor.");
      });
  });
}

// 🧹 Limpa os agendamentos da interface
function clearAgenda() {
  ["morning", "afternoon", "night"].forEach(period => {
    const ul = document.getElementById(period);
    ul.innerHTML = "";
  });
}

//  Carrega agendamentos do servidor filtrando pela data
function loadBookingsByDate(selectedDate) {
  fetch("http://localhost:3333/bookings")
    .then(response => {
      if (!response.ok) throw new Error("Erro ao buscar agendamentos.");
      return response.json();
    })
    .then(bookings => {
      clearAgenda();
      bookings
        .filter(b => b.date === selectedDate)
        .forEach(renderBooking);
    })
    .catch(error => {
      console.error("Erro ao carregar do servidor:", error);
    });
}

//  Inicializa a data atual no campo de input
const inputDate = document.getElementById("input");

if (!inputDate.value) {
  const today = new Date().toISOString().split("T")[0];
  inputDate.value = today;
}

loadBookingsByDate(inputDate.value);

inputDate.addEventListener("change", (e) => {
  loadBookingsByDate(e.target.value);
});

//  Evento de criação de novo agendamento
document.querySelector(".btn-agend").addEventListener("click", (e) => {
  e.preventDefault();

  const tutorInput = document.getElementById("tutor");
  const petInput = document.getElementById("pet");
  const phoneInput = document.getElementById("phone");
  const serviceInput = document.getElementById("service");
  const dateInput = document.getElementById("date");
  const hourInput = document.getElementById("hour-input");

  const tutorValue = capitalizeWords(tutorInput.value.trim());
  const petValue = capitalizeWords(petInput.value.trim());
  const phoneValue = phoneInput.value.trim();
  const serviceValue = capitalizeWords(serviceInput.value.trim());
  const dateValue = dateInput.value;
  const hourValue = hourInput.value;

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
    id: generateId(),
    tutor: tutorValue,
    pet: petValue,
    phone: phoneValue,
    service: serviceValue,
    date: dateValue,
    hour: hourValue,
    period: period
  };

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


      // Reinicia a página completamente após o envio
      location.reload();

      loadBookingsByDate(data.date);

      // Limpa o formulário após envio
      tutorInput.value = "";
      petInput.value = "";
      phoneInput.value = "";
      serviceInput.value = "";
      dateInput.value = inputDate.value;
      hourInput.value = "";
    })
    .catch(error => {
      console.error("Erro:", error);
      alert("Falha ao agendar. Verifique o servidor.");
    });
});

useEffect(() => {
  fetch("http://localhost:3000/agendamentos")
    .then(res => res.json())
    .then(data => setAgendamentos(data));
}, []);



