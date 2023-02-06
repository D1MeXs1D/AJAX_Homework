// Напишите код приложения, интерфейс которого представляет собой input и кнопку. 
// В input можно ввести любое число. 
// При клике на кнопку происходит следующее:
// Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
// Если число попадает в диапазон от 1 до 10 
// — сделать запрос c помощью XHR по URL
//  https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.

const button = document.getElementById('btn');
const buttonClear = document.getElementById('btn-clear');
const input = document.getElementById('inpt');
const message = document.getElementById('message');
const forImg = document.getElementById('forImg');







button.addEventListener('click', checkValue);



function checkValue () {
    if (input.value > 0 && input.value <=10) {
        // положительное событие
        console.log(input.value);
        message.classList.remove('popUp');
        message.classList.add('noActive');
        // иничиализация адреса
        xhr.open('GET', `https://picsum.photos/v2/list?limit=${input.value}`);
        // Отправляем запрос
        xhr.send();
        
    }

    else {
        // отрицательнео событие
        message.classList.add('popUp');
        message.classList.remove('noActive');
   
    }
}


// Создаем экзепляр класса XMLHttpRequest
let xhr = new XMLHttpRequest();
// Инициализируем запрос
// xhr.open('GET', `https://picsum.photos/v2/list?limit=${input.value}`);

// Добавляем обрабочик ответа сервера
xhr.onload = function() {
  if (xhr.status != 200) { // HTTP ошибка?
    // Если статус не 200 (указывает, что запрос выполнен успешно),
    // то обрабатываем отдельно
    console.log('Статус ответа: ', xhr.status);
  } else {
    // Ответ мы получаем в формате JSON, поэтому его надо распарсить
    // console.log('Ответ сервера JSON', xhr.response);

    // Парсим и выводим ответ сервера
    let x = JSON.parse(xhr.response);
    // console.log(x);
    let img;

    x.forEach(element => {
       img = document.createElement('img');
       img.className = "image";
       img.src = element.download_url;
      
       console.log(element);
       forImg.append(img);
       
    });
  }
};

// Добавляем обрабочик процесса загрузки
xhr.onprogress = function(event) {
  // Выведем прогресс загрузки
  console.log(`Загружено ${event.loaded} из ${event.total}`)
};

// Добавляем обрабочик ошибки
xhr.onerror = function() {
  // обработаем ошибку, не связанную с HTTP (например, нет соединения)
  console.log('Ошибка! Статус ответа: ', xhr.status);
};


buttonClear.addEventListener('click', function () {
    while (forImg.firstChild) {
        forImg.removeChild(forImg.firstChild);
    }
 });

