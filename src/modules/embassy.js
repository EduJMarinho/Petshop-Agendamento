// Controle do Aside e do Main no app.
document.addEventListener("DOMContentLoaded", () => {
  const btnMedia = document.querySelector(".btn-media");
  const btnDesktop = document.querySelector(".btn-desktop");
  const btnAgend = document.querySelector(".btn-agend");
  const aside = document.getElementById("schedule");
  const main = document.querySelector(".main");
  const buttons = document.querySelectorAll(".btn-agendamento"); // pega todos os botões

  function abrirAgendamento() {
    aside.style.display = "block";
    main.classList.add("embassy");
    buttons.forEach(btn => btn.classList.add("embassy")); // aplica a todos
  }

  function fecharAgendamento() {
    aside.style.display = "none";
    main.classList.remove("embassy");
    buttons.forEach(btn => btn.classList.remove("embassy")); // remove de todos
  }

  btnMedia?.addEventListener("click", abrirAgendamento);
  btnDesktop?.addEventListener("click", abrirAgendamento);
  btnAgend?.addEventListener("click", fecharAgendamento);
});

