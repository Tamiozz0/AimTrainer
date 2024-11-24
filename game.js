const area = document.getElementById('area');
const displayScore = document.getElementById('score');
const displayTime = document.getElementById('time');

const params = new URLSearchParams(window.location.search);

let score = 0;
let timeLeft = params.get('tempo');
let difficult = params.get(`dificuldade`);
let interval;

let difficultSize = 75;
switch (difficult) {
  case 'easy':
    difficultSize = 100;
    break;
  case 'medium':
    difficultSize = 50;
    break;
  case 'hard':
    difficultSize = 25;
    break;
}

function randomPosition() {
  const aw = area.clientWidth;
  const ah = area.clientHeight;

  const x = Math.random() * (aw - difficultSize);
  const y = Math.random() * (ah - difficultSize);

  return { x, y };
}

function definirQuad() {
  const validacao = document.querySelector('.hit_box');
  if (validacao) validacao.remove();

  const hit_box = document.createElement('div');
  hit_box.classList.add('hit_box');

  const { x, y } = randomPosition();
  hit_box.style = `
    width: ${difficultSize}px; 
    height: ${difficultSize}px; 
    left: ${x}px; 
    top: ${y}px;
  `;

  hit_box.addEventListener('click', () => {
    score++;
    displayScore.textContent = score;
    hit_box.remove();
  });

  area.appendChild(hit_box);
}

function game() {
  interval = setInterval(() => {
    if (timeLeft > 0) {
      definirQuad();
      timeLeft--;
      displayTime.textContent = timeLeft;
    } else {
      clearInterval(interval);
      alert(`Fim de jogo! Sua pontuação foi: ${score}`);
    }
  }, 1000);
}

game();
