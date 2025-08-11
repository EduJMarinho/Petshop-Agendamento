import { schedulesDay } from "./schedules/load.js";

document.addEventListener("DOMContentLoaded", function (){
  schedulesDay()
})

  // Função que capitaliza a primeira letra de cada palavra
  function firstLetter(texto) {
    return texto
      .split(" ")
      .filter(word => word.trim() !== "")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  // Aplica a capitalização aos campos dentro da div .agendamento-item
  document.addEventListener("DOMContentLoaded", () => {
    const formFields = document.querySelectorAll(".agendamento-item input[type='text'], .agendamento-item textarea");

    formFields.forEach(field => {
      field.addEventListener("blur", () => {
        field.value = firstLetter(field.value);
      });
    });
  });

