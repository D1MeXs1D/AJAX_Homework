// /* Этап 1. Подготовка данных */
// const parser = new DOMParser();
// const xmlString = `
//   <list>
//   <student>
//     <name lang="en">
//       <first>Ivan</first>
//       <second>Ivanov</second>
//     </name>
//     <age>35</age>
//     <prof>teacher</prof>
//   </student>
  
//   <student>
//     <name lang="ru">
//       <first>Петр</first>
//       <second>Петров</second>
//     </name>
//     <age>58</age>
//     <prof>driver</prof>
//   </student>
// </list>
  
// `;



// /* Этап 2. Получение данных */
// // Парсинг XML
// const xmlDOM = parser.parseFromString(xmlString, "text/xml");

// // Получение всех DOM-нод
// // tag list
// const listNode = xmlDOM.querySelector("list");
// // tag student
// const studentNode = listNode.querySelector("student");
// // tag name
// const nameNode =studentNode.querySelector("name");
// const nameAttr = nameNode.getAttribute('lang');

// // tag first
// const firstNode = nameNode.querySelector("first");
// // tag second
// const secondNode = nameNode.querySelector("second");
// // tag age
// const ageNode = studentNode.querySelector("age");
// // tag prof
// const profNode = studentNode.querySelector("prof");


// // tag list
// const listTwoNode = xmlDOM.querySelector("list");
// // tag student
// const studentTwoNode = listTwoNode.querySelector("student");
// // tag name
// const nameTwoNode =studentTwoNode.querySelector("name");
// const nameTwoAttr = nameTwoNode.getAttribute('lang');
// // tag first
// const firstTwoNode = nameTwoNode.querySelector("first");
// // tag second
// const secondTwoNode = nameTwoNode.querySelector("second");
// // tag age
// const ageTwoNode = studentTwoNode.querySelector("age");
// // tag prof
// const profTwoNode = studentTwoNode.querySelector("prof");

// /* Этап 3. Запись данных в результирующий объект */
// const result = {
//     list: [
//         { name:firstNode.textContent, age: ageNode.textContent,   prof: profNode.textContent ,lang: nameAttr},
//         { name:firstTwoNode.textContent, age: ageTwoNode.textContent,   prof: profTwoNode.textContent ,lang: nameTwoAttr}
//       ]
// };
// console.log(result);


const parser = new DOMParser();

const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const xmlDOM = parser.parseFromString(xmlString, "text/xml");
const students = xmlDOM.querySelectorAll("student");

let listStudent = [];
students.forEach(item => {
   const name = item.querySelector("name");
  const lang = name.getAttribute('lang');
  
  listStudent.push({
    name: `${item.querySelector('first').textContent} ${item.querySelector('second').textContent}`,
    age: `${item.querySelector('age').textContent}`,
    prof: `${item.querySelector('prof').textContent}`,
    lang: 'lang',
  })
});

console.log("list", listStudent);