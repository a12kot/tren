

//  какие символы используются на первом уровне ? Пробел, j, f, k, d.
//Программа будет создавать массив из рандомно подобранных символов в различных пропорциях

// для начала нам нужна наша формула генереции случайного числа
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


let colors = ['is-info', 'is-success', 'is-warning', 'is-danger', 'is-link'];
//цвета фреймворка bulma, в которые мы будем красить наши кнопки
//при каждой генерации мы будем назначать каждому символу свой цвет, что бы пользователь при печати не путался
let str_arr = ['j', 'f', 'k', 'd', ' '];

let begin = document.querySelector(".begin"); // здесь у нас надпись, которая приглашает пользователя нажать enter для начала игры. Потом она у нас должна пропасть
let progress = document.getElementById("prog"); // здесь прогресс ошибок пользователя

//теперь нужно отрисовать наши буковки

function drawBoard() {
    let buttons = document.querySelector('.buttons');
    for (let index = 0; index < 20; index++) { // в идеале этот показатель пользователь должен иметь возможность изменить. Разберем это во второй части нашей статьи
        let rand = getRandomInt(colors.length); // здесь у нас массив буковок и цифр одинаковый по длине, поэтому я выбрал цвета
        buttons.insertAdjacentHTML("afterbegin",
            `<button class='game-button button is-large ${colors[rand]}' id='${str_arr[rand]}'>${str_arr[rand]}</button>`);
    }
}

document.addEventListener('keydown', StartGame, {
    once: true
    //благодаря once у нас отрисовка вызывается только один раз
});

function StartGame(e) {
    if (e.key == "Enter") {
        drawBoard(); //отрисовка
        begin.style.display = "none";
        mainGame(); // игра началась
    }
}

function mainGame() {
    document.addEventListener('keydown', press); //  я создал отдельную функцию, что бы была возможность ее останавливать
}


var count_right = 0;

var errors_count = 0;

function press(e) {

    let elements_arr = document.querySelectorAll(".game-button");  // выбираем все созданные кнопки
    var i = 0; // нам потребуется индивидуальный счетчик на каждую букву

    if (e.key == elements_arr[0].id) {
        elements_arr[0].remove();
        count_right++;
    } else {
        errors_count++;
        progress.value = errors_count;
        if (errors_count > 20) {
            let loose = confirm("Game over! Хотите еще раз поиграть?");
            console.log(loose);
            if (loose) {
                document.location.reload();
            } else {
                
            }
        }
    }
    if (count_right == 20) {
        alert("Вы выйграли!");
        let win = confirm("Хотите поиграть еще?");
        if(win){
            document.location.reload();
        }
    }
}



