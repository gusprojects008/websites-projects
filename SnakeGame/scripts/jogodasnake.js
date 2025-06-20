const area = document.getElementById("GameArea");
const contexto = area.getContext("2d");
const size = 30;
const scorediv = document.getElementById("ScoreArea");
const score = document.getElementById("ScoreValue")
const audioeat = new Audio("/SnakeGame/audio/SnapInsta.io - Minecraft Comendo - Efeito Sonoro (128 kbps).mp3");
const audiobackground = new Audio("/SnakeGame/audio/audiobackground.mp3");
const audiocountdown = new Audio("/SnakeGame/audio/SnapInsta.io - Contagem Regressiva 3 Segundos (128 kbps).mp3")
let go = document.getElementById("StartedMessage");
let snakeSpeed = 100;

//xarea = 1250;
//yarea = 700;

xarea = 1250;
yarea = 700;
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
      const LimitCanvasX = xarea;
      const LimitCanvasY = yarea;
      let gameoveralert = document.getElementById("GameOver");
      let btn = document.getElementById("ContinueGame");
      let overlay = document.getElementById("overlay");

      const CollisionLimit = (head.x < 0 || head.x > LimitCanvasX || head.y < 0 || head.y > LimitCanvasX) && (head.x < 0 || head.x > LimitCanvasY || head.y < 0 || head.y > LimitCanvasY);

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
      let btnStart = document.getElementById("StartButton");
      let timeregressive = document.getElementById("TimeRegressive");
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
             go.classList.add("LetsGo");
             //go.classList.remove("LetsGo");
             //go.innerHTML = "";
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

function Continue() {
    window.location.reload();
};

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
