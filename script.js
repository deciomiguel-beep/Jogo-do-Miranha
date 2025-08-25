const spider = document.querySelector('.spider');
const pipe = document.querySelector('.pipe');

const jump = () => {
    spider.classList.add('jump');

    setTimeout(() => {
        spider.classList.remove('jump');
    }, 500);
}

let deaths = 0;
let distance = 0;
let gameOver = false;

const distanceDisplay = document.getElementById('distance');
const deathsDisplay = document.getElementById('deaths');

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const spiderPosition = +window.getComputedStyle(spider).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && spiderPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        spider.style.animation = 'none';
        spider.style.bottom = '0px'; // garante que o Spider pise no chão

spider.src = './images/aranha.png';
spider.style.width = '150px';   // aumentei o tamanho (antes era 75px)
spider.style.marginLeft = '20px'; // ajustei para não ficar muito afastado


        gameOver = true;
        deaths++;
        deathsDisplay.textContent = `Mortes: ${deaths}`;

        clearInterval(loop);
    }
}, 10);

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

document.addEventListener('touchstart', () => {
    jump();
});
