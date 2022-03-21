const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
const mainMenu = document.getElementById("mainMenu");
const menuBack = document.getElementById("backBtn");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const restartBtn = document.getElementById("restart");
const scoreDiv = document.getElementById("score");
const optionsBtn = document.getElementById("options");
const quitBtn = document.getElementById("quit");

const musicSOUND = document.querySelector(`audio[data-key="Music"]`);
const effectsSOUND = document.querySelector(`audio[data-key="Effect"]`);

musicSOUND.volume = 0.5;
effectsSOUND.volume = 0.5;

window.addEventListener("load", () => {
  gameLoop();
});
playBtn.addEventListener("click", () => {
  setTimeout(() => {
    musicSOUND.play();
    canvas.style.display = "block";
  }, 500);
  effectsSOUND.play();
});

function show() {
  update();
  draw();
}

function update() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  snake.move();
  eatApple();
  checkHitWall();
}

function eatApple() {
  if (snake.tail[snake.tail.length - 1].x == apple.x && snake.tail[snake.tail.length - 1].y == apple.y) {
    snake.tail[snake.tail.length] = { x: apple.x, y: apple.y };
    apple = new Apple();
    effectsSOUND.play();
  }
}

function checkHitWall() {
  let headTail = snake.tail[snake.tail.length - 1];

  if (headTail.x == -snake.size) {
    headTail.x = canvas.width - snake.size;
    //
    //
    //
    console.log("left");
    //
  } else if (headTail.x == canvas.widh) {
    headTail.x = 0;
    //
    //
    //
    console.log("right");
    //
  } else if (headTail.y == -snake.size) {
    headTail.y = canvas.height - snake.size;
    //
    //
    //
    console.log("up");
    //
  } else if (headTail.y == canvas.height) {
    headTail.y = 0;
    //
    //
    //
    console.log("down");
  }
}

function draw() {
  createRect(0, 0, canvas.width, canvas.height, "#271d26");
  createRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.tail.length; i++) {
    createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5, snake.size - 5, snake.size - 5, "#fff");
  }

  scoreDiv.innerHTML = "Score: " + (snake.tail.length - 1);

  createRect(apple.x, apple.y, apple.size, apple.size, apple.color);
}

function createRect(x, y, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
}

window.addEventListener("keydown", (event) => {
  setTimeout(() => {
    if (event.keyCode == 37 && snake.rotateX != 1) {
      snake.rotateX = -1;
      snake.rotateY = 0;
    } else if (event.keyCode == 38 && snake.rotateY != 1) {
      snake.rotateX = 0;
      snake.rotateY = -1;
    } else if (event.keyCode == 39 && snake.rotateX != -1) {
      snake.rotateX = 1;
      snake.rotateY = 0;
    } else if (event.keyCode == 40 && snake.rotateY != -1) {
      snake.rotateX = 0;
      snake.rotateY = 1;
    }
  }, 1);
});

class Snake {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.tail = [{ x: this.x, y: this.y }];
    this.rotateX = 0;
    this.rotateY = 1;
  }

  move() {
    let newRect;

    if (this.rotateX == 1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x + this.size,
        y: this.tail[this.tail.length - 1].y,
      };
    } else if (this.rotateX == -1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x - this.size,
        y: this.tail[this.tail.length - 1].y,
      };
    } else if (this.rotateY == 1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x,
        y: this.tail[this.tail.length - 1].y + this.size,
      };
    } else if (this.rotateY == -1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x,
        y: this.tail[this.tail.length - 1].y - this.size,
      };
    }

    this.tail.shift();
    this.tail.push(newRect);
  }
}

class Apple {
  constructor() {
    let isTouching;

    while (true) {
      isTouching = false;
      this.x = Math.floor((Math.random() * canvas.width) / snake.size) * snake.size;
      this.y = Math.floor((Math.random() * canvas.height) / snake.size) * snake.size;

      for (let i = 0; i < snake.tail.length; i++) {
        if (this.x == snake.tail[i].x && this.y == snake.tail[i].y) {
          isTouching = true;
        }
      }

      this.size = snake.size;
      this.color = "#ff4655";

      if (!isTouching) {
        break;
      }
    }
  }
}

const snake = new Snake(25, 25, 25);
let apple = new Apple();

//// main menu buttons events
pauseBtn.addEventListener("click", () => {
  setTimeout(() => {
    alert("Your game has been paused." + " " + " " + " " + " " + " " + "Click OK to continue!");
  }, 100);
  effectsSOUND.play();
});
restartBtn.addEventListener("click", () => {
  setTimeout(() => {
    location.reload();
  }, 100);
  effectsSOUND.play();
});
quitBtn.addEventListener("click", () => {
  window.close();
});

//// hide / show options menu
optionsBtn.addEventListener("click", () => {
  setTimeout(() => {
    mainMenu.style.display = "none";
  }, 100);
  effectsSOUND.play();
});
menuBack.addEventListener("click", () => {
  setTimeout(() => {
    mainMenu.style.display = "flex";
  }, 100);
  effectsSOUND.play();
});

//// Volume events
let musicVolume = document.getElementById("musicRange");
let effectsVolume = document.getElementById("effectsRange");

musicVolume.addEventListener("change", (e) => {
  setTimeout(() => {
    musicSOUND.volume = ` ${Math.floor(e.target.value) / 100} `;
  }, 1);
});

effectsVolume.addEventListener("change", (e) => {
  setTimeout(() => {
    effectsSOUND.volume = ` ${Math.floor(e.target.value) / 100} `;
  }, 1);
});

let snakeSpeed = document.getElementById("speedRange");
let speed = 250;
snakeSpeed.addEventListener("change", (e) => {
  speed = ` ${Math.floor(e.target.value) * 5} `;
  console.log(speed);
});

//// snake speed
function gameLoop() {
  setInterval(show, speed);
}
