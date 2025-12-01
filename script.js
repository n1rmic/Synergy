const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

const CARD_WIDTH = 345;
const AUTOSCROLL_SPEED = 0.8;
const MANUAL_STEP = CARD_WIDTH;
const TRANSITION_DURATION = 400;

let position = 0;
let animationFrameId = null;
let isInteracting = false;
let contentDuplicated = false;


const originalCardCount = track.children.length;
if (originalCardCount > 0 && originalCardCount <= 4) {
    track.innerHTML += track.innerHTML;
    contentDuplicated = true;
}

const totalContentWidth = track.scrollWidth / 2;

position = -totalContentWidth;
track.style.transform = `translateX(${position}px)`;


function instantReset() {

    if (position <= -totalContentWidth * 2) {
        track.style.transition = 'none';
        position += totalContentWidth;
        track.style.transform = `translateX(${position}px)`;
        void track.offsetWidth;
        track.style.transition = `transform ${TRANSITION_DURATION / 1000}s ease-in-out`;
    }

    if (position >= 0) {
        track.style.transition = 'none';
        position -= totalContentWidth;
        track.style.transform = `translateX(${position}px)`;
        void track.offsetWidth;
        track.style.transition = `transform ${TRANSITION_DURATION / 1000}s ease-in-out`;
    }
}


function startAutoscroll() {
    if (isInteracting) return;

    position -= AUTOSCROLL_SPEED;
    instantReset();
    track.style.transform = `translateX(${position}px)`;

    animationFrameId = requestAnimationFrame(startAutoscroll);
}

function handleManualMove(direction) {
    isInteracting = true;
    cancelAnimationFrame(animationFrameId);


    position += direction * MANUAL_STEP;


    track.style.transform = `translateX(${position}px)`;


    setTimeout(() => {
        instantReset();
        isInteracting = false;
        startAutoscroll();
    }, TRANSITION_DURATION);
}


prevBtn.addEventListener('click', () => {
    handleManualMove(1);
});

nextBtn.addEventListener('click', () => {
    handleManualMove(-1);
});


track.addEventListener('mouseenter', () => {
    isInteracting = true;
    cancelAnimationFrame(animationFrameId);
});

track.addEventListener('mouseleave', () => {
    isInteracting = false;
    startAutoscroll();
});


startAutoscroll();