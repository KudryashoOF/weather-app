const apiKey = "f3a1cb1b0495490aac361308230803";

// console.log(data.location.name),
// console.log(data.location.country),
// console.log(data.current.temp_c);
// console.log(data.current.condition.text);

// Находим элементы на странице
const header = document.querySelector(".header"); // находим по классу
const form = document.querySelector("#form"); // находим по ID
const input = document.querySelector("#inputCity"); // находим по ID

function removeCard() {
  // Удаляем предыдущие карточки
  const prevCard = document.querySelector(".card");
  if (prevCard) prevCard.remove();
}

function showError(errorMessage) {
  // Отобразить карточку с ошибкой

  const html = `<div class="card">${errorMessage}</div>`;

  // первый аргумент куда втсавляем, второй что втсавляем
  // Отображаем карточку на странице
  header.insertAdjacentHTML("afterend", html);
}

function showCard(name, country, temp, condition) {
  const html = ` <div class="card">
      <h2 class="card-city">${name}<span> ${country}</span></h2>
      <div class="card-weather">
        <div class="card-value">${temp}<sup>°c</sup></div>
        <div><img src="./img/Weather App/8 1.png" alt="Weather" /></div>
      </div>
      <div class="card-desc">${condition}</div>
    </div>`;

  // Отображаем карточку на странице
  // первый аргумент куда втсавляем, второй что втсавляем
  header.insertAdjacentHTML("afterend", html);
}

let city = input.value.trim();

async function getWeather(city) {
  // Адрес запроса
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
  // Проверка на ошибку
}

// Слушаем отправку формы
form.onsubmit = async function (e) {
  // Отменяем отправку форму
  e.preventDefault();

  //   Берем значение из инпута, обрезаем пробелы методом trim()
  let city = input.value.trim();

  //   Получаем данные с сервера
  const data = await getWeather(city);

  if (data.error) {
    // удаляем предыдущую карточку
    removeCard();

    // если есть ошибка - выводим ее
    showError(data.error.message);
  } else {
    // Удаляем предыдущие карточки
    removeCard();

    // если ошибки нет - выводим карточку
    showCard(
      data.location.name,
      data.location.country,
      data.current.temp_c,
      data.current.condition.text
    );
  }
};
