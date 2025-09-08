const spider = document.querySelector('.spider');
const pipe = document.querySelector('.pipe');

const distanceDisplay = document.getElementById('distance');
const deathsDisplay = document.getElementById('deaths');

let deaths = 0;
let distance = 0;
let gameOver = false;

const jump = () => {
    if (!gameOver) {
        spider.classList.add('jump');

        setTimeout(() => {
            spider.classList.remove('jump');
        }, 500);
    }
};

// Loop principal do jogo
const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const spiderPosition = +window.getComputedStyle(spider).bottom.replace('px', '');

    // Incrementa a distância se o jogo não acabou
    if (!gameOver) {
        distance += 1;
        distanceDisplay.textContent = `Distância: ${distance.toString().padStart(5, '0')}`;
    }

    // Detecta colisão
    if (pipePosition <= 120 && pipePosition > 0 && spiderPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        spider.style.animation = 'none';
        spider.style.bottom = '0px';

        spider.src = './images/aranha.png';
        spider.style.width = '150px';
        spider.style.marginLeft = '20px';

        gameOver = true;
        deaths++;
        deathsDisplay.textContent = `Mortes: ${deaths}`;
    }
}, 10);

// Controles
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }

    if (event.code === 'Enter' && gameOver) {
        location.reload(); // reinicia o jogo
    }
});

document.addEventListener('touchstart', () => {
    jump();
});
