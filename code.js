//нам нужен массив генерации наших буковок
//сегодня мы напишем тлько первый уровень на котором пользователь сможет тренировать свою печать
//  в любое время
//  какие символы используются на первом уровне ? Пробел, j, f, k, d.
//Программа будет создавать массив из рандомно подобранных символов в различных пропорциях

// для начала нам нужна наша формула генереции случайного числа
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }


let colors = ['is-info', 'is-success', 'is-warning', 'is-danger'];

let str_arr = ['j', 'f', 'k', 'd', ' ']; 


let rand_str_arr = []; 

function generete(len){
    //в этот подвезли столько методов генерации массива, что я просто теряюсь
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < getRandomInt(5); j++) {
            rand_str_arr.push(`<button class=button is primary'> ${str_arr[getRandomInt(str_arr.length)]} </button>`);
        }
    }
}
generete(10);
// что-то такое негенерировали. Могу сказать, что не идеальный алгоритм генерации, но на первом время хватит

// теперь нужно отрисовать 
console.log(rand_str_arr);


let buttons = document.querySelector('.buttons');
for (let index = 0; index < rand_str_arr.length; index++) {
    buttons.insertAdjacentHTML("afterbegin",  `<button class=button is primary'> ${str_arr[getRandomInt(str_arr.length)]} </button>` );
    
}







