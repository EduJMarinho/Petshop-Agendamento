import { hoursLoad } from "../form/hours-load.js";

import { getSelectedDateElement } from '../form/submit.js';
const selectedDate = getSelectedDateElement();


export function schedulesDay() {
  // Obtem a data do input.
  const date = selectedDate.value
  //Renderiza as horas disponíveis.
  hoursLoad( { date } )
}