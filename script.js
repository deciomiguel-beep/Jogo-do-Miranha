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
points += 1; // Pontos aumentam com o tempo
distanceDisplay.textContent = `Distância: ${distance.toString().padStart(5, '0')}`;
pointsDisplay.textContent = `Pontos: ${points.toString().padStart(5, '0')}`;
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

// Playlist de músicas
const musicPlaylist = [
'./sounds/music1.mp3',
'./sounds/music2.mp3',
'./sounds/music3.mp3',
'./sounds/music3.mp3',
];

const bgMusic = document.getElementById('bg-music');
let currentTrack = 0;

// Função para carregar e tocar a próxima música
function playNextTrack() {
    bgMusic.src = musicPlaylist[currentTrack];
    bgMusic.play().catch((e) => console.log('Erro ao tocar música:', e));
}

// Quando a música termina, toca a próxima
bgMusic.addEventListener('ended', () => {
    currentTrack = (currentTrack + 1) % musicPlaylist.length; // Loop infinito
    playNextTrack();
});

// Inicia a música na primeira interação do usuário
function startMusic() {
    playNextTrack();
    document.removeEventListener('keydown', startMusic);
    document.removeEventListener('touchstart', startMusic);
}

document.addEventListener('keydown', startMusic);
document.addEventListener('touchstart', startMusic);

let points = 0;
const pointsDisplay = document.getElementById('points');
