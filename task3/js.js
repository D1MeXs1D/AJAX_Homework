let sbmt = document.getElementById("sbmt");
let hght = document.getElementById("hght");
let wght = document.getElementById("wght");
const div = document.getElementById("container");

sbmt.addEventListener("click", function () {
  // проверка на числовое преобразование
  if (
    typeof +hght.value === "number" &&
    !isNaN(+hght.value) &&
    typeof +wght.value === "number" &&
    !isNaN(+wght.value)
  ) {
    if (
      +hght.value >= 100 &&
      +hght.value <= 300 &&
      +wght.value >= 100 &&
      +wght.value <= 300
    ) {
      console.log(+hght.value, +wght.value, "this is goog");

      // Делаем запрос за данными
      fetch(`https://picsum.photos/${hght.value}/${wght.value}`)
        .then((response) => {
          console.log(typeof response);
          return response;
        })
        .then((data) => {
          // Объект результата в формате JSON
          div.innerHTML = `<img src="${data.url}">`;
        });
      // .catch(() => { console.log('error') });
    } else {
      // написать добавление элемента с сообщением об ошибке "число вне лимита"
      console.log(+hght.value, +wght.value, "this is fail");
    }
  }

  // вывод сообщения о ошибке
  else {
    // написать добавление элемента с сообщением об ошибке "неправильно введены данные"
    console.log("this is fail");
  }
});
