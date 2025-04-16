const form = document.querySelector("#form");

const dayInput = document.querySelector("#dayInput");
const monthInput = document.querySelector("#monthInput");
const yearInput = document.querySelector("#yearInput");
const btn = document.querySelector(".btn");

const yearAge = document.querySelector('.year-age');
const monthAge = document.querySelector('.month-age');
const dayAge = document.querySelector('.day-age');


const today = new Date();

let dayToday = today.getDate();
let monthToday = today.getMonth() + 1;
let yearToday = today.getFullYear();

  // Проверка високосного года
  function isLeapYear(yearInput) {
    return (yearInput % 4 === 0 && yearInput % 100 !== 0) || yearInput % 400 === 0;
  }
  const monthDays = [
    31,
    isLeapYear(yearToday) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ]

function validateInputs() {
  const dayInputValue = dayInput.value.trim();  
  const monthInputValue = monthInput.value.trim();
  const yearInputValue = yearInput.value.trim();
  let success = true;  

    if (dayInputValue === "") {
    success = false;
    setError(dayInput, "This file is required");
  } else if (!(dayInputValue > 0 && dayInputValue <= 31)) {
    success = false;
    setError(dayInput, "Must be a valid day");
  } else {
    setSuccess(dayInput);
  };

  if (monthInputValue === "") {
    success = false;
    setError(monthInput, "This file is required");
  } else if (!(monthInputValue > 0 && monthInputValue <= 12)) {
    success = false;
    setError(monthInput, "Must be a valid month");
  } else {
    setSuccess(monthInput);
  };

  if (yearInputValue === "") {
    success = false;
    setError(yearInput, "This file is required");
  } else if (!(yearInputValue > 0 && yearInputValue <= 2025)) {
    success = false;
    setError(yearInput, "Must be in the past");
  } else {
    setSuccess(yearInput);
  };
  return success;
};

function setError(element, message) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector(".error");

  errorElement.innerText = message;
  inputGroup.classList.add("error");
  inputGroup.classList.remove("success");
}

function setSuccess(element) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector(".error");

  errorElement.innerText = "";
  inputGroup.classList.add("success");
  inputGroup.classList.remove("error");
}

function handleSubmit(event) {
  event.preventDefault();
  if (validateInputs()) {
    if (dayInput.value > dayToday) {
      dayToday = dayToday + monthDays[monthToday - 1];
      monthToday = monthToday - 1;
    }
    if(monthInput.value > monthToday) {
      monthToday = monthToday + 12;
      yearToday = yearToday - 1;
    }
    const d = dayToday - dayInput.value;
    console.log(typeof(dayInput.value));    
    const m = monthToday - monthInput.value;
    const y = yearToday - yearInput.value;

    dayAge.innerHTML = d;
    monthAge.innerHTML = m;
    yearAge.innerHTML = y;
  }
}

/**
 * the way we calculat age:
 * days: current day - birth day
 * 10 - 7 = 3
 * month: current month - birth month
 * 5 - 3 = 2
 * year: current year - birth year
 * 2023-2000 = 23
 * 10.5.2023 - 7.3.2000 = 3.2.23
 * Все это относится к этому
 *  const d = dayToday - dayInput.value;
    const m = monthToday - monthInput.value;
    const y = yearToday - yearInput.value;
 * 
Проверки для двух случаев:
1. День рождения больше текущего дня
2. Месяц рождения больше текущего месяца 3:46
 * 
10 - 15 = -5 сегодняшний день меньше дня рождения
5 - 3 = 2 тогда месяц будет вычисляться так (5-1) - 3 = 1
      dayToday = dayToday + monthDays[monthToday - 1];
      monthToday = monthToday - 1;
      Если день рождения больше чем сегодняшний день
1-текущий день + количество дней в текущем месяце Количество дней в массивах текущих месяцев, которые мы создали. 
2 - уменьшить текущий месяц на 1

Если сегодняшний месяц меньше месяца дня рождения
5 - 7 = -2
      monthToday = monthToday + 12;
      yearToday = yearToday - 1;
      (12 + 5) - 7 = 10
      (2023 - 1) - 2000 = 22

      Если месяц рождения больше чем сегодняшний месяц
1 - добавить 12 к текущему месяцу 
2 - уменьшить текущий год на 1
 */

form.addEventListener('submit', handleSubmit)





