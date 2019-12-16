import anime from './anime.es';
import getRandomInt from './random';
import showResult from './showResult';


anime({
    targets: '.anim-elem',
    translateX: [-50, 50],
    easing: 'linear',
    direction: 'alternate',
    duration: 1000,
    loop: true
});


function get_data() {
    fetch('https://gist.githubusercontent.com/isakura313/b705fd423e996a56b35b18b876458f18/raw/48023a7ffa598585f80303557e68b2011f776849/main.json')
        // я переложил информацию в json файл - это показалось мне более логичным,
        // если кто-то захочет замасштабировать эту игру на сервер
        .then(res => res.json())
        .then(data => {
            //асинхронно вызываю функцию основной игры
            read_data(data); //вызов основной функции игры
        })
        .catch(err => {
            console.warn("произошла ошибка");
            console.warn(err.name);
        })
}


get_data(); // логично это обернуть в самовызывающийся модуль, но... для упрощения я не буду этого делать


async function read_data(information) {
        console.table(information);
        console.log(information.symbol_colors);
        var number_of_level = 0; // по дефолту нас будет запускаться уровень номер 0
        var error_sound = new Audio('sounds/error_sound.wav');
        var fail_sound = new Audio("sounds/fail_sound.wav");
        var press_sound = new Audio("sounds/press_sound.wav");
        var succes_sound = new Audio("sounds/succes_sound.wav");
        
        //получаем все звуки, которые нам нужны 
        let modal = document.querySelector(".modal");
        var target_error = document.querySelector(".target_error");
        let error_panel = document.querySelector(".error-panel");
        let promo  = document.querySelector(".promo");
        let begin = document.querySelector(".begin"); // здесь у нас надпись, которая приглашает пользователя нажать enter для начала игры. Потом она у нас должна пропасть
        let progress = document.getElementById("prog"); // здесь прогресс ошибок пользователя
        let buttons = document.querySelector('.buttons'); // элемент в который мы будем писать наши буковки
        let name_level = document.querySelector(".name-level");
        let modal_close = document.querySelector(".modal-close");
        
        
        //теперь нужно отрисовать наши буковки
        
        document.addEventListener('keydown', StartGame, {
            once: true
            //благодаря once у нас отрисовка вызывается только один раз
        });
        
        function StartGame(e) {
        if (e.key == "Enter") {
            error_panel.classList.remove("is-hidden");
            press_sound.play();
           begin.remove();
            mainGame()
        }
    }

        function drawBoard(info) {
            let str_arr = info.level_info[number_of_level].symbols;
            let level_name = info.level_info[number_of_level].name_level;
            name_level.innerHTML = level_name;
            let col_arr = info.symbol_colors;
            
            console.log(str_arr);
            for (let index = 0; index < 20; index++) {
                let rand = getRandomInt(str_arr.length); 
                buttons.insertAdjacentHTML("afterbegin",
                    `<button class='game-button button 
                    is-large ${col_arr[rand]}' id='${str_arr[rand]}'>
                        ${str_arr[rand]}</button>`);
            }

           
        }

        function mainGame() {
            drawBoard(information);
            document.addEventListener('keydown', press); //  я создал отдельную функцию, что бы была возможность ее останавливать
        }
     


    let all_try = 0;
    var errors_count = 0;
    var count_right = 0;

    function press(e) {
        let elements_arr = document.querySelectorAll(".game-button");  // выбираем все созданные кнопки
        if (e.key == elements_arr[0].id) { // здесь можно выбирать и по querySelector, но тогда код будет длиннее
            elements_arr[0].remove();
            count_right++; //  считаем правильные ответы
            press_sound.play();
            all_try++;
        }
        else {
            errors_count++; // считаем ошибки
            error_sound.play();
            progress.value = errors_count;
            if (errors_count > 20) { // если пользователь допустит ошибок больше чем у нас букв, игра закончится
                    number_of_level = 0;
                    mainGame();
                    
            }
        }
        if (count_right == 20) {
            count_right = 0;
            number_of_level++;
            console.log(number_of_level);
            if(number_of_level == 1){
                alert("game0ver");
                modal.classList.add("is-active");
                showResult(target_error, errors_count);
                modal_close.onclick = function(){
                    modal.classList.remove("is-active");
                }
            }
            mainGame();
            let win = confirm("Хотите поиграть еще?");
        }

    }

};



