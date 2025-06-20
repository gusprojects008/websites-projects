/*
    PROJETO DA COBRA: O QUE FALTA:
    A COBRA NÃO DEVE PASSAR DA AREA DAS COMIDAS (FEITO)
    SCORE DE QUANTAS FRUTAS A COBRA COMEU (FEITO)
    BOTÃO DE COMEÇAR COM UMA CONTAGEM DE 3 SEGUNDOS (FEITO)
    POP-UP DE GAMEOVER (FEITO)
    A COBRA DEVE CORRER MAIS RÁPIDO A CADA COMIDA QUE COMER (FEITO)
    MODO LIGHT E DARK (FEITO)
*/

const area = document.getElementById("spacearea");
const contexto = area.getContext("2d");
const size = 30;
const scorediv = document.getElementById("score--value");
const score = document.getElementById("score")
const audioeat = new Audio("/audio/SnapInsta.io - Minecraft Comendo - Efeito Sonoro (128 kbps).mp3");
const audiobackground = new Audio("/audio/audiobackground.mp3");
const audiocountdown = new Audio("/audio/SnapInsta.io - Contagem Regressiva 3 Segundos (128 kbps).mp3")
let testext = document.getElementById("text");
let go = document.getElementById("goo");
let snakeSpeed = 100;

xarea = 650;
yarea = 650;
contexto.fillRect(0, 0, xarea, yarea);

    const snake = [
      {x: 270, y: 240}
    ];

const drawsnake = () => {
  contexto.fillStyle = "#ddd";
  snake.forEach((position, index) => {
  if (index == snake.length - 1) {
     contexto.fillStyle = "blue"
     contexto.shadowColor = "blue"
     contexto.shadowBlur = 50;
    }
    contexto.fillRect(position.x, position.y, size, size)
    })
};

let direction;
let loopid;    

const MoveSnake = () => {
  const head = snake[snake.length - 1];

  if (!direction) {
     return
  }

  if (direction == "right") {
     snake.push({x: head.x + size, y: head.y})
  }

  if (direction == "left") {
     snake.push({x: head.x - size, y: head.y})
  }

  if (direction == "down") {
     snake.push({x: head.x, y: head.y + size})
  }

  if (direction == "up") {
     snake.push({x: head.x, y: head.y - size})
    }
  snake.shift()
};

const randomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
  }

  const randomposition = () => {
  const number = randomNumber(0, 570)
  return Math.round(number / 30) * 30
  }

  const randomcolor = () => {
    const r = randomNumber(0, 255)
    const g = randomNumber(0, 255)
    const b = randomNumber(0, 255)
    return `rgb(${r}, ${g}, ${b})`
  }

  const foodSnake = {
    x: randomposition(),
    y: randomposition(),
    color: randomcolor()
  }

  const drawfoodSnake = () => {
    const {x, y, color} = foodSnake;
    contexto.shadowColor = color;
    contexto.shadowBlur = 30;
    contexto.fillStyle = color;
    contexto.fillRect(foodSnake.x, foodSnake.y, size, size)
    contexto.shadowBlur = 0;
  }

  const checkifsnakeeat = () => {
    const head = snake[snake.length -1]
    if (head.x == foodSnake.x && head.y == foodSnake.y) {
       snakeSpeed -= 9;
       incrementScore()
       snake.push(head)
       let x = randomposition()
       let y = randomposition()
       while (snake.find((position) => position.x == x && position.y == y)) {
             x = randomposition()
             y = randomposition()
       }

       foodSnake.x = x
       foodSnake.y = y
       foodSnake.color = randomcolor()
       audioeat.play()
    }
    };

    const checkcollision = () => {
      const head = snake[snake.length - 1]
      const LimitCanvas = 570;
      let gameoveralert = document.getElementById("gameover");
      let btn = document.getElementById("continue");
      let overlay = document.getElementById("overlay");

      const CollisionLimit = head.x < 0 || head.x > LimitCanvas || head.y < 0 || head.y > LimitCanvas;

      if (CollisionLimit) {
         gameoveralert.style.display = "block";
         btn.style.display = "block";
         area.classList.add("overlay");
         score.classList.add("overlay");
         scorediv.classList.add("overlay");
         go.classList.add("overlay");            
      };
      };

    const incrementScore = () => {
    score.innerText = parseInt(score.innerText) +1
    }
    function timeStart() {
      let btnStart = document.getElementById("buttonStart");
      let timeregressive = document.getElementById("timeRegressive");
      let count = 4;
      btnStart.style.display = "none";
      let countdown = setInterval (() => {
          audiocountdown.play();
          count--
          timeregressive.textContent = count;
          if (count === 0) {
             clearInterval(countdown);
             timeregressive.style.display = "none"; 
             go.textContent = "VAMOS LÁ!...";
             go.classList.add("go");
             gameloop();
          }
      }, 1000);
    };

const gameloop = () => {
  contexto.clearRect(0, 0, xarea, yarea)
  clearInterval(loopid)

  drawfoodSnake();
  MoveSnake();
  drawsnake();
  checkifsnakeeat();
  checkcollision();
  loopid = setTimeout(() => {
  gameloop()
  audiobackground.play();
  }, snakeSpeed); 
};

function continuar() {
    window.location.reload();
};

function thememode() {
    let moon1 = document.getElementById("moon1");
    let body = document.body;
    if (body.classList.contains("light")) {
       body.classList.remove("light");
       body.classList.add("body");
    } else {
        body.classList.remove("body")
        body.classList.add("light")
    }
}

//SNAKE MOVIMENTS BY PRESS THE KEYS:
//MOVIMENTAÇÃO DA COBRA AO PRESSIONAR AS TECLAS:
document.addEventListener("keydown", ({ key }) => {
    if (key == "ArrowRight"){
       direction = "right";
    };
    if (key == "ArrowLeft"){
       direction = "left";
    };
    if (key == "ArrowUp") {
       direction = "up";
    };
    if (key == "ArrowDown") {
       direction = "down"
    }
})
