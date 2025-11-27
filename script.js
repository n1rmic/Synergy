const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

// Configurações
const CARD_WIDTH = 345; // 320px (Card) + 25px (Gap)
const AUTOSCROLL_SPEED = 0.8; 
const MANUAL_STEP = CARD_WIDTH;
const TRANSITION_DURATION = 400; // 0.4s (Deve ser igual ao CSS)

let position = 0;
let animationFrameId = null;
let isInteracting = false;
let contentDuplicated = false;

// 1. Duplicação e Posição Inicial
// Verifica se o conteúdo precisa ser duplicado e calcula a largura.
const originalCardCount = track.children.length;
if (originalCardCount > 0 && originalCardCount <= 4) {
    track.innerHTML += track.innerHTML;
    contentDuplicated = true;
}

const totalContentWidth = track.scrollWidth / 2;
// Inicia no meio para permitir rolagem imediata para a esquerda
position = -totalContentWidth; 
track.style.transform = `translateX(${position}px)`;

// 2. Teletransporte (Reseta a posição para simular o loop)
function instantReset() {
    // Se a rolagem automática empurrar para a área duplicada, reseta para o início.
    if (position <= -totalContentWidth * 2) {
        track.style.transition = 'none';
        position += totalContentWidth;
        track.style.transform = `translateX(${position}px)`;
        void track.offsetWidth; 
        track.style.transition = `transform ${TRANSITION_DURATION / 1000}s ease-in-out`;
    }
    // Se a rolagem manual trouxer para o início do conteúdo duplicado (lado esquerdo)
    if (position >= 0) {
        track.style.transition = 'none';
        position -= totalContentWidth;
        track.style.transform = `translateX(${position}px)`;
        void track.offsetWidth; 
        track.style.transition = `transform ${TRANSITION_DURATION / 1000}s ease-in-out`;
    }
}

// 3. Rolagem Automática
function startAutoscroll() {
    if (isInteracting) return;

    position -= AUTOSCROLL_SPEED;
    instantReset();
    track.style.transform = `translateX(${position}px)`;
    
    animationFrameId = requestAnimationFrame(startAutoscroll);
}

// 4. Navegação Manual
function handleManualMove(direction) {
    isInteracting = true; // Pausa a rolagem automática
    cancelAnimationFrame(animationFrameId);

    // Ajusta a posição
    position += direction * MANUAL_STEP;
    
    // Aplica o movimento
    track.style.transform = `translateX(${position}px)`;

    // Usa um timeout para dar tempo da animação acabar antes de resetar ou recomeçar a rolagem.
    setTimeout(() => {
        instantReset();
        isInteracting = false; // Permite a rolagem automática recomeçar
        startAutoscroll();
    }, TRANSITION_DURATION);
}

// Event Listeners
prevBtn.addEventListener('click', () => {
    handleManualMove(1); // Move para a direita (posição aumenta)
});

nextBtn.addEventListener('click', () => {
    handleManualMove(-1); // Move para a esquerda (posição diminui)
});

// Pausar no Mouse
track.addEventListener('mouseenter', () => {
    isInteracting = true;
    cancelAnimationFrame(animationFrameId);
});

track.addEventListener('mouseleave', () => {
    isInteracting = false;
    startAutoscroll();
});

// Inicia o Carrossel
startAutoscroll();