const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');


const SCROLL_SPEED = 0.5;
const CARD_WIDTH = 320 + 25;


let position = 0;
let isHovered = false;
let animationId;

const originalItemsHTML = track.innerHTML;
track.innerHTML += originalItemsHTML;


const numOriginalItems = track.children.length / 2;
const totalWidth = numOriginalItems * CARD_WIDTH;


function animate() {
    if (!isHovered) {
        position -= SCROLL_SPEED;
    }

    updatePosition();
    animationId = requestAnimationFrame(animate);
}

function updatePosition() {

    if (position <= -totalWidth) {
        position += totalWidth;
    }


    if (position > 0) {
        position -= totalWidth;
    }

    track.style.transform = `translateX(${position}px)`;
}


prevBtn.addEventListener('click', () => {
    position += CARD_WIDTH; //direita
    updatePosition();
});

nextBtn.addEventListener('click', () => {
    position -= CARD_WIDTH; // esquerda
});

// Eventos de Mouse (Pausar quando passar o mouse)
track.addEventListener('mouseenter', () => {
    isHovered = true;
    track.style.cursor = 'grab';
});

track.addEventListener('mouseleave', () => {
    isHovered = false;
    track.style.cursor = 'default';
});

animate();