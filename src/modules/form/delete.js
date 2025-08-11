function renderBooking(data) {
  const container = document.getElementById(data.period);

  // Evita duplicação
  if (container.querySelector(`[data-id="${data.id}"]`)) {
    return;
  }

  const item = document.createElement("li");
  item.classList.add("agendamento-item");
  item.setAttribute("data-id", data.id);

  item.innerHTML = `
    <strong>${data.hour}</strong> - <span class="name-animal">${data.pet}</span>
    <br><span class="tutor">/ ${data.tutor}</span>
    <br><span class="service">${data.service}</span>
    <br><button class="cancel-item">Remover</button>
  `;

  container.appendChild(item);

  item.querySelector(".cancel-item").addEventListener("click", () => {
    const confirmDelete = confirm("Tem certeza que deseja remover este agendamento?");
    if (!confirmDelete) return;

    item.remove(); // Remove visualmente

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
