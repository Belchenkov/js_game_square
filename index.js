const $start = document.querySelector("#start");
const $game = document.querySelector("#game");
const $time = document.querySelector("#time");
const $result = document.querySelector("#result");
const $timeHeader = document.querySelector("#time-header");
const $resultHeader = document.querySelector("#result-header");
const $gameTime = document.querySelector("#game-time");

const colors = [
    '#CB356B',
    '#BD3F32',
    '#3A1C71',
    '#D76D77',
    '#283c86',
    '#45a247',
    '#8e44ad',
    '#155799',
    '#159957',
    '#000046',
    '#1CB5E0',
    '#2F80ED'
];
let score = 0;
let isGameStarted = false;

// Events
$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime);

// Run Game
function startGame() {
    score = 0;
    isGameStarted = true;
    $game.style.backgroundColor = '#fff';

    hide($start);
    setGameTime();

    $gameTime.setAttribute('disabled', 'true');

    const interval = setInterval(function () {
        let time = parseFloat($time.textContent);

        if (time <= 0) {
            clearInterval(interval);
            endGame();
        } else {
            $time.textContent = (time - 0.1).toFixed(1);
        }
    }, 100);

    renderBox();
}

// Set Game Time
function setGameTime() {
    const time = +$gameTime.value;
    $time.textContent = time.toFixed(1);

    show($timeHeader);
    hide($resultHeader);
}

function setGameScore() {
    $result.textContent = score.toString();
}

// Finish Game
function endGame() {
    isGameStarted = false;
    show($start);
    $game.style.backgroundColor = '#ccc';
    $game.innerHTML = '';
    $timeHeader.classList.add('hide');
    show($resultHeader);
    $gameTime.removeAttribute('disabled');
    setGameScore();
}

// Click Square
function handleBoxClick(event) {
    if (!isGameStarted) {
        return;
    }

    if (event.target.dataset.box) {
        score++;
        renderBox();
    }
}

// Paint Square
function renderBox() {
    $game.innerHTML = '';

    const box = document.createElement('div');
    const boxSize = getRandom(30, 100);
    const gameSize = $game.getBoundingClientRect();
    const maxTop = gameSize.height - boxSize;
    const maxLeft = gameSize.width - boxSize;
    const randomColorIndex = getRandom(0, colors.length);

    box.style.height = box.style.width = boxSize + 'px';
    box.style.position = 'absolute';
    box.style.backgroundColor = colors[randomColorIndex];
    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.left = getRandom(0, maxLeft) + 'px';
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', 'true');

    $game.insertAdjacentElement('afterbegin', box);
}

// Generate Random Number
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function show($el) {
    $el.classList.remove('hide');
}

function hide($el) {
    $el.classList.add('hide');
}
