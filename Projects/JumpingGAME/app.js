////////// SOUNDS //
let jumpSOUND = document.querySelector(`audio[data-key="jump"]`);
let winSOUND = document.querySelector(`audio[data-key="win"]`);
let hitSOUND = document.querySelector(`audio[data-key="hit"]`);
////////// CANVAS //
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1280;
canvas.height = 600;

///////////////////////////
////////// BUILD PLAYER //
const gravity = 0.55;
class Player {
  constructor() {
    this.position = {
      x: 150,
      y: 0,
    };
    this.velocity = {
      x: 0,
      y: 1,
    };
    // player size
    this.width = 30;
    this.height = 30;
  }

  draw() {
    ctx.fillStyle = "#69bf41";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    }
  }
}
////////// BUILD PLATFORM //
class Platform {
  constructor({ x, y }, { w, h }) {
    this.position = {
      x, // x:x
      y,
    };
    this.sizes = {
      w,
      h,
    };
  }
  draw() {
    ctx.fillStyle = "#271d26";
    ctx.fillRect(this.position.x, this.position.y, this.sizes.w, this.sizes.h);
  }
}
////////// BUILD BACKGROUND PARALLAX //
class Decoration {
  constructor({ x, y }, { w, h }) {
    this.position = {
      x,
      y,
    };
    this.sizes = {
      w,
      h,
    };
  }
  draw() {
    ctx.fillStyle = "#afbcc448";
    ctx.fillRect(this.position.x, this.position.y, this.sizes.w, this.sizes.h);
  }
}

/////////////////////////
let player = new Player();
let decorations = [];
let platforms = [];
let scrollOffset = 0;
///////////////////
let levelDiv = document.getElementById("level");
let diedDiv = document.getElementById("died");
let diedCount = 0;

//////////////////////////////////
////////// GAME INITIALIZATION //
function reset() {
  winSOUND.pause();
  hitSOUND.play();
  //
  keys.left.pressed = false;
  keys.right.pressed = false;
  //
  levelDiv.innerText = "Current level: 1";
  levelDiv.style.color = "#e4edf2";
  diedDiv.innerText = "you've died " + diedCount + " times";
  //
  scrollOffset = 0;
  /////////////////
  ////////// GAME DECORATIONS //
  decorations = [
    new Decoration(
      {
        x: 0,
        y: 50,
      },
      {
        w: 75,
        h: 700,
      }
    ),
    new Decoration(
      {
        x: 75,
        y: 150,
      },
      {
        w: 25,
        h: 700,
      }
    ),
    new Decoration(
      {
        x: 350,
        y: 100,
      },
      {
        w: 300,
        h: 700,
      }
    ),
    new Decoration(
      {
        x: 750,
        y: 250,
      },
      {
        w: 200,
        h: 700,
      }
    ),
    new Decoration(
      {
        x: 1250,
        y: 50,
      },
      {
        w: 500,
        h: 700,
      }
    ),
    new Decoration(
      {
        x: 1850,
        y: 100,
      },
      {
        w: 100,
        h: 700,
      }
    ),
    new Decoration(
      {
        x: 1950,
        y: 250,
      },
      {
        w: 50,
        h: 700,
      }
    ),
    new Decoration(
      {
        x: 2100,
        y: 425,
      },
      {
        w: 450,
        h: 700,
      }
    ),
    new Decoration(
      {
        x: 2550,
        y: 225,
      },
      {
        w: 50,
        h: 700,
      }
    ),
    new Decoration(
      {
        x: 2850,
        y: 300,
      },
      {
        w: 100,
        h: 700,
      }
    ),
    new Decoration(
      {
        x: 2600,
        y: 25,
      },
      {
        w: 250,
        h: 700,
      }
    ),
    new Decoration(
      {
        x: 3200,
        y: 0,
      },
      {
        w: 750,
        h: 700,
      }
    ),
  ];

  ////////// PLAYER INITIALIZATION //
  player = new Player();

  ////////// GAME PLATFORMS //
  platforms = [
    new Platform(
      {
        x: 0,
        y: 500,
      },
      {
        w: 400,
        h: 200,
      }
    ),

    new Platform(
      {
        x: 600,
        y: 400,
      },
      {
        w: 250,
        h: 200,
      }
    ),

    new Platform(
      {
        x: 1000,
        y: 500,
      },
      {
        w: 50,
        h: 400,
      }
    ),

    new Platform(
      {
        x: 1200,
        y: 300,
      },
      {
        w: 250,
        h: 500,
      }
    ),

    new Platform(
      {
        x: 1500,
        y: 400,
      },
      {
        w: 350,
        h: 400,
      }
    ),
    new Platform(
      {
        x: 1500,
        y: 500,
      },
      {
        w: 350,
        h: 100,
      }
    ),
    new Platform(
      {
        x: 1700,
        y: 200,
      },
      {
        w: 350,
        h: 25,
      }
    ),

    new Platform(
      {
        x: 2350,
        y: 300,
      },
      {
        w: 350,
        h: 50,
      }
    ),

    new Platform(
      {
        x: 3000,
        y: 300,
      },
      {
        w: 50,
        h: 25,
      }
    ),

    new Platform(
      {
        x: 3000 + 100,
        y: 300,
      },
      {
        w: 50,
        h: 25,
      }
    ),

    new Platform(
      {
        x: 3000 + 200,
        y: 300,
      },
      {
        w: 50,
        h: 25,
      }
    ),

    new Platform(
      {
        x: 3000 + 300,
        y: 300,
      },
      {
        w: 50,
        h: 25,
      }
    ),

    new Platform(
      {
        x: 3000 + 400,
        y: 300,
      },
      {
        w: 50,
        h: 25,
      }
    ),

    new Platform(
      {
        x: 3000 + 600,
        y: 300,
      },
      {
        w: 20,
        h: 10,
      }
    ),

    new Platform(
      {
        x: 3000 + 900,
        y: 300,
      },
      {
        w: 525,
        h: 25,
      }
    ),

    new Platform(
      {
        x: 3900 + 525,
        y: 100,
      },
      {
        w: 500,
        h: 500,
      }
    ),
  ];
}

////////////////
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
  jump: {
    pressed: false,
  },
};

function gameAnimation() {
  requestAnimationFrame(gameAnimation);
  /// CLEAR CANVAS
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  /// DRAW DECORATIONS
  decorations.forEach((decoration) => {
    decoration.draw();
  });
  /// DRAW PLAYER
  player.update();
  /// DRAW PLATFORMS
  platforms.forEach((platform) => {
    platform.draw();
  });
  /////////////////////////////
  ////////// RIGHT MOVEMENT //
  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5;
  } else if (
    ///////////////////////////
    ////////// LEFT MOVEMENT //
    (keys.left.pressed && player.position.x > 100) ||
    (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
  ) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;

    ////////////////////////////////////////
    ////////// OBJECTS MOVE WHILE KEYDOWN //
    if (keys.right.pressed && scrollOffset < 4000) {
      scrollOffset += 5;
      decorations.forEach((decoration) => {
        decoration.position.x -= 3;
      });
      platforms.forEach((platform) => {
        platform.position.x -= 5;
      });
    } else if (keys.left.pressed && scrollOffset > 0) {
      scrollOffset -= 5;
      decorations.forEach((decoration) => {
        decoration.position.x += 3;
      });
      platforms.forEach((platform) => {
        platform.position.x += 5;
      });
    }
  }

  //////////////////////////////////////////
  ////////// OBJECTS COLLISION CONDITION //
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >= platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.sizes.w
    ) {
      player.velocity.y = 0;
    }
  });

  ///////////////////////////
  ////////// WIN CONDITION //
  if (scrollOffset > 3500) {
    let levelDiv = document.getElementById("level");

    winSOUND.play();
    levelDiv.innerText = "YOU'VE BEAT THE GAME GG!";
    levelDiv.style.color = "#79c755";
  }

  ////////////////////////////
  ////////// DIE CONDITION //
  if (player.position.y > canvas.height) {
    diedCount += 1;

    reset();
  }
}

reset();
gameAnimation();

///////////////////////////
////////// GAME MOVEMENT //
addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    //player goes LEFT (a)
    case 65:
      keys.left.pressed = true;
      break;
    //player goes RIGHT (d)
    case 68:
      keys.right.pressed = true;
      break;
    //player goes UP (w)
    case 87:
      if (player.velocity.y == 0) {
        jumpSOUND.play();
        player.velocity.y -= 15;
      }
      break;
    // reset button (R)
    case 82:
      reset();
      break;
  }
});

addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    //player goes LEFT (a)
    case 65:
      keys.left.pressed = false;
      break;
    //player goes RIGHT (d)
    case 68:
      keys.right.pressed = false;
      break;
  }
});
