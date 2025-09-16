const spider = document.querySelector('.spider');
const venom = document.querySelector('.venom'); // <-- agora é venom
const distanceDisplay = document.getElementById('distance');
const deathsDisplay = document.getElementById('deaths');
const pointsDisplay = document.getElementById('points');
const gameBoard = document.querySelector('.game-board');

let deaths = 0;
let distance = 0;
let points = 0;
let gameOver = false;
let gameStarted = false;

// Criar inimigo voador (só aparece depois da distância 500)
const flyer = document.createElement('img');
flyer.src = './images/abutre.gif'; // substitua pelo seu gif voador
flyer.classList.add('flyer');
flyer.style.position = 'absolute';
flyer.style.width = '120px';
flyer.style.bottom = '150px';
flyer.style.right = '-200px';
flyer.style.display = 'none';
gameBoard.appendChild(flyer);

const jump = () => {
    if (!gameOver && gameStarted) {
        spider.classList.add('jump');
        setTimeout(() => spider.classList.remove('jump'), 500);
    }
};

// Loop principal
const loop = setInterval(() => {
    if (!gameStarted || gameOver) return; // pausa o jogo se não começou ou acabou

    const venomPosition = venom.offsetLeft;
    const spiderPosition = +window.getComputedStyle(spider).bottom.replace('px', '');
    const flyerPosition = flyer.offsetLeft;

    // incrementa devagar (1 ponto a cada 50ms)
    distance += 0.1;
    points += 0.1;
    distanceDisplay.textContent = `Distância: ${Math.floor(distance).toString().padStart(5, '0')}`;
    pointsDisplay.textContent = `Pontos: ${Math.floor(points).toString().padStart(5, '0')}`;

    // faz o flyer aparecer a partir de 500 de distância
    if (distance >= 500 && flyer.style.display === 'none') {
        flyer.style.display = 'block';
        flyer.style.animation = 'flyer-animation 3s infinite linear';
    }

    // Colisão com venom
    if (venomPosition <= 120 && venomPosition > 0 && spiderPosition < 80) {
        handleDeath();
    }

    // Colisão com flyer
    if (flyer.style.display !== 'none' && flyerPosition <= 120 && flyerPosition > 0 && spiderPosition < 150) {
        handleDeath();
    }
}, 50);

function handleDeath() {
    if (gameOver) return; // impede múltiplas mortes

    gameOver = true;
    deaths++;
    deathsDisplay.textContent = `Mortes: ${deaths}`;

    // para animações
    venom.style.animation = 'none';
    venom.style.left = `${venom.offsetLeft}px`;
    flyer.style.animation = 'none';
    flyer.style.right = `${flyer.offsetLeft}px`;

    spider.style.animation = 'none';
    spider.style.bottom = '0px';
    spider.src = './images/aranha.png';
    spider.style.width = '150px';
    spider.style.marginLeft = '20px';

    showRestartButton();
}

function showRestartButton() {
    const btn = document.createElement('button');
    btn.textContent = "Reiniciar";
    btn.style.position = 'absolute';
    btn.style.top = '50%';
    btn.style.left = '50%';
    btn.style.transform = 'translate(-50%, -50%)';
    btn.style.padding = '10px 20px';
    btn.style.fontSize = '20px';
    btn.style.backgroundColor = '#333';
    btn.style.color = '#fff';
    btn.style.border = 'none';
    btn.style.borderRadius = '10px';
    btn.style.cursor = 'pointer';
    btn.style.zIndex = '20';

    btn.addEventListener('click', () => location.reload());
    gameBoard.appendChild(btn);
}

// Controles
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        if (!gameStarted) {
            gameStarted = true;
            venom.style.animation = 'venom-animation 1.5s infinite linear';
        }
        jump();
    }
});

document.addEventListener('touchstart', () => {
    if (!gameStarted) {
        gameStarted = true;
        venom.style.animation = 'venom-animation 1.5s infinite linear';
    }
    jump();
});

// Música de fundo (opcional)
const musicPlaylist = [
    './sounds/music1.mp3',
    './sounds/music2.mp3',
    './sounds/music3.mp3',
];
const bgMusic = document.getElementById('bg-music');
let currentTrack = 0;

function playNextTrack() {
    bgMusic.src = musicPlaylist[currentTrack];
    bgMusic.play().catch((e) => console.log('Erro ao tocar música:', e));
}
bgMusic.addEventListener('ended', () => {
    currentTrack = (currentTrack + 1) % musicPlaylist.length;
    playNextTrack();
});
function startMusic() {
    playNextTrack();
    document.removeEventListener('keydown', startMusic);
    document.removeEventListener('touchstart', startMusic);
}
document.addEventListener('keydown', startMusic);
document.addEventListener('touchstart', startMusic);
