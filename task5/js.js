// Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

// Заголовок первого input — «номер страницы».
// Заголовок второго input — «лимит».
// Заголовок кнопки — «запрос».
// При клике на кнопку происходит следующее:

// Если число в первом input не попадает в диапазон от 1 до 10 или не является числом —
// выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;

// Если число во втором input не попадает в диапазон от 1 до 10 или не является числом —
// выводить ниже текст «Лимит вне диапазона от 1 до 10»;

// Если и первый, и второй input не в диапазонах или не являются числами —
// выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;

// Если числа попадают в диапазон от 1 до 10 — сделать запрос по
// URL https://picsum.photos/v2/list?page=1&limit=10,
// где GET-параметр page — это число из первого input,
// а GET-параметр limit — это введённое число второго input.

// Пример. Если пользователь ввёл 5 и 7,
// то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
// После получения данных вывести список картинок на экран.

// Если пользователь перезагрузил страницу,
// то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).

let button = document.getElementById("btn");
let buttonClear = document.getElementById("clearBtn");
let inputOne = document.getElementById("input1");
let inputTwo = document.getElementById("input2");
const div = document.getElementById("container");
const fail = document.getElementById("error");
const pics = document.getElementsByTagName("img");





button.addEventListener("click", checkInput);

buttonClear.addEventListener("click", function () {
  while (div.firstChild) {
    div.removeChild(div.firstChild);
    localStorage.clear(); //очищаем из localStorage А
  }
});


let arrayUrl = [];
let storage = JSON.parse(localStorage.getItem("arrayUrl"));
if (storage.length > 0) {
  storage.forEach((el) => (div.innerHTML += `<img src="${el}">`)); //достаем из массива ссылки из локального хранилища(это нужно для перезагрузки страницы) 
}

// ----------------------- это низ, оно нам не надо, выше события, вот это нам надо ---------------------------------------

function checkInput() {
  if ( typeof +inputOne.value === "number" && !isNaN(+inputOne.value) && typeof +inputTwo.value === "number" && !isNaN(+inputTwo.value)) {
    if (+inputOne.value >= 1 && +inputOne.value <= 10) {
      if (+inputTwo.value >= 1 && +inputTwo.value <= 10) {

        fail.style.opacity = '0'; 

        fetch(
          `https://picsum.photos/v2/list?page=${inputOne.value}&limit=${inputTwo.value}`
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            // Объект результата в формате JSON
            // console.log("массив с", inputTwo.value, "объект(ом/ами)", data);

            data.map((element) => {
              // запись отдельного урл
              arrayUrl.push(element.download_url);

              // console.log(typeof (element.download_url))
            });
            localStorage.setItem("arrayUrl", JSON.stringify(arrayUrl)); //сохраняем массив ссылок в локальном хранилищ А
            // возвращение "очищенного" массива
            return arrayUrl;
          })

          .then((arrayUrl) => {
            // по хорошему надо тут уже "очищенный" массив использовать для добавления фото

            arrayUrl.forEach((elementArray) => {
              // console.log(elementArray);

              appendImg(elementArray);
            });
            // let imgBlock = document.querySelectorAll("img");
          });
      } else {
        console.log("Лимит вне диапазона от 1 до 10");
       
        fail.style.opacity = '1';
        fail.innerHTML = "Лимит вне диапазона от 1 до 10";
      }
    }
    else {
      console.log("Номер страницы вне диапазона от 1 до 10");
      fail.innerHTML = "Номер страницы вне диапазона от 1 до 10";
      fail.style.opacity = '1';
    }
  } 
  else {
   fail.style.opacity = '1';
  }
}

function appendImg(elementArray) {
  let img;
  img = document.createElement("img");
  img.src = elementArray;
  div.append(img);
}


