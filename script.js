const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let isPaused = false;
let position = 0;
const speed = 0.8; // velocidade suave

// 🔁 DUPLICA o conteúdo do carrossel para criar loop infinito
track.innerHTML += track.innerHTML;

// Calcula largura total de uma “metade”
const totalWidth = track.scrollWidth / 2;

function moveCarousel() {
  if (!isPaused) {
    position -= speed;
    if (Math.abs(position) >= totalWidth) {
      position = 0; // volta ao início suavemente
    }
    track.style.transform = `translateX(${position}px)`;
  }
  requestAnimationFrame(moveCarousel);
}

// ✋ Pausar quando o usuário clicar e segurar
track.addEventListener('mousedown', () => isPaused = true);
track.addEventListener('mouseup', () => isPaused = false);
track.addEventListener('mouseleave', () => isPaused = false);

// ⏩ Botões manuais
prevBtn.addEventListener('click', () => {
  isPaused = true;
  position += 320;
  track.style.transform = `translateX(${position}px)`;
});

nextBtn.addEventListener('click', () => {
  isPaused = true;
  position -= 320;
  track.style.transform = `translateX(${position}px)`;
});

// ▶️ Inicia o movimento
moveCarousel();
