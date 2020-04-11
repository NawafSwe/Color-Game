/*
game mood if it is false  it is difficult and if it is true it is easy so based on that we will decide how many squares we need to do ;;

*/

let gameMood = false;

let squares = document.querySelectorAll('.square');
let target = document.querySelector("#target");
let h1 = document.querySelector('h1');
let message = document.querySelector('#message');
let controller = document.querySelector('#controller');
let picked_color = null;
let list = null;
let easyMode = document.querySelector('#easy');
let difficultMode = document.querySelector('#difficult');
// i will do an event for each them to determine the mode of the game ;;
easyMode.addEventListener('click', function () {
    gameMood = true;
    difficultMode.classList.remove('selected');
    easyMode.classList.add('selected');
    startGame();

});
difficultMode.addEventListener('click', function () {
    //other wise by default it will be in difficult mode ;;
    gameMood = false;
    easyMode.classList.remove('selected');
    difficultMode.classList.add('selected');
    startGame();
});

startGame();


// picking the random color then display it


function alterAllSquares(rgb, num) {
    for (let k = 0; k < num; k++) {
        squares[k].style.backgroundColor = rgb;
    }
    h1.style.backgroundColor = rgb;
    controller.textContent = 'New Game?';

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomColors(num) {
    let list = [];
    for (let k = 0; k < num; k++) {
        list.push(generateRgb());
    }
    return list;

}

function generateRgb() {
    let r = getRandomInt(0, 255);
    let g = getRandomInt(0, 255);
    let b = getRandomInt(0, 255);
    return 'rgb(' + r + ', ' + g + ', ' + b + ')'

}

// by default it will start the game in the hard mode ;;
function startGame() {
    h1.style.backgroundColor = 'steelblue';
    message.textContent = '';
    list = null;
    let random_picked_color = 0;
    if (gameMood === false) {
        // making all squares visible
        makeSquaresVisible();
        list = generateRandomColors(6);
        random_picked_color = getRandomInt(0, 5);
        picked_color = list[random_picked_color];
    } else if (gameMood === true) {
        list = generateRandomColors(3);
        random_picked_color = getRandomInt(0, 2);
        picked_color = list[random_picked_color];
        clear_last_three_squares();
    }
    for (let k = 0; k < list.length; k++) {

        squares[k].style.backgroundColor = list[k];
        squares[k].addEventListener('click', function () {
            console.log(this.style.backgroundColor + "                " + picked_color);
            if (this.style.backgroundColor != picked_color) {
                this.style.backgroundColor = '#232323';
                message.textContent = 'try again!';
            } else {
                if (gameMood === false)
                    alterAllSquares(this.style.backgroundColor, 6);
                else if (gameMood === true)
                    alterAllSquares(this.style.backgroundColor, 3);
                message.textContent = 'correct!';

            }


        });

    }

    squares[random_picked_color].style.backgroundColor;
    target.textContent = picked_color;
}

controller.addEventListener('click', function () {
    // if the user did not like the colors he can change the colors by starting new game ;;
    controller.textContent = 'New Colors?';
    startGame();

});


function clear_last_three_squares() {
    for (let k = 3; k < 6; k++) {
        squares[k].classList.add('hide');
    }

}

function makeSquaresVisible() {
    for (let k = 0; k < squares.length; k++) {
        squares[k].classList.remove('hide')
    }
}




