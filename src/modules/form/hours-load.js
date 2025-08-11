import dayjs from "dayjs";
import { openingHours } from "../../utils/opening-hours.js"

const hours = document.getElementById("hours")

export function hoursLoad({ date }) {
  const opening = openingHours.map((hour) => {
    // Recupera somente a hora, desestruturando a const com um array, pegando apenas o primeiro elemento que é a hora sem os zeros.
    const [scheduleHour] = hour.split(":");

    //Adiciona a hora e verifica se esta no passado.
    const isHourPast = dayjs(date).add(scheduleHour, "hour").isAfter(dayjs())

    // Define se o horário esta disponível.
    return {
      hour,
    }
  })
}