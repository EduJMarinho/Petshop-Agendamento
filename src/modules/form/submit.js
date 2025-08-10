import dayjs from "dayjs";

export function getSelectedDateElement() {
  return document.getElementById("date");
}
const form = document.querySelector("form")
form.onsubmit = (event =>{
event.preventDefault()
})

document.addEventListener("DOMContentLoaded", () => {
  const selectedDate = document.getElementById("date");
  const selectedDateInput = document.getElementById("input");
  const selectedHourInput = document.getElementById("hour-input");

  // Constante de Data atual.
  const inputToday = dayjs(new Date()).format("YYYY-MM-DD");

  // Carrega a data atual no Main.
  if (selectedDate) {
    selectedDate.value = inputToday;
    // Define a data mínima com a atual no main.
    selectedDate.min = inputToday;
  }

  // Carrega a data atual no Aside.
  if (selectedDateInput) {
    selectedDateInput.value = inputToday;
    // Define a data mínima com a atual no aside.
    selectedDateInput.min = inputToday;
  }

  // Carrega a hora atual no input
  if (selectedHourInput) {
    selectedHourInput.value = dayjs().format("HH:mm");
  }

  const btnAgendar = document.getElementById("btnAgendar");
  const btnFechar = document.getElementById("fechar");
  const aside = document.getElementById("schedule");
  const main = document.getElementById("conteudo");

  if (btnAgendar && aside && main) {
    btnAgendar.addEventListener("click", () => {
      aside.style.display = "block";
      main.classList.add("embassy");
    });
  }

  
  if (btnFechar && aside && main) {
    btnFechar.addEventListener("click", () => {
      aside.style.display = "none";
      main.classList.remove("embassy");
    });
  }
});

