const $start = document.querySelector("#start");
const $game = document.querySelector("#game");

let score = 0;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);

// Run Game
function startGame() {
    $game.style.backgroundColor = '#fff';
    $start.classList.add('hide');
    renderBox();
}

// Click Square
function handleBoxClick(event) {
    if (event.target.dataset.box) {
        score++;
        renderBox();
    }
}

// Paint Square
function renderBox() {
    $game.innerHTML = '';

    const box = document.createElement('div');

    box.style.height = box.style.width = '50px';
    box.style.position = 'absolute';
    box.style.backgroundColor = '#000';
    box.style.top = '50px';
    box.style.left = '70px';
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', 'true');

    $game.insertAdjacentElement('afterbegin', box);
}
