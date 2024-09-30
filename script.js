let score = document.querySelector(".score");
let startScreen = document.querySelector(".startScreen");
let gameArea = document.querySelector(".gameArea");

// const vhValue = window.innerHeight * 0.95;
// Get the viewport height and calculate 95vh
// console.log(`95vh is equal to ${vhValue} pixels.`);//it is equal to 530px in my case

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};

let player = {
  speed: 5,
  score:0
};

startScreen.addEventListener("click", start);
document.addEventListener("keydown", keyPress);
document.addEventListener("keyup", keyRelease);

function keyPress(eventDetails) {
  eventDetails.preventDefault();
  let pressedkey = eventDetails.key;
  if (
    pressedkey === "ArrowUp" ||
    pressedkey === "ArrowDown" ||
    pressedkey === "ArrowLeft" ||
    pressedkey === "ArrowRight"
  ) {
    keys[pressedkey] = true;
  }
  console.log(keys);
}

function keyRelease(eventDetails) {
  eventDetails.preventDefault();
  let releasedkey = eventDetails.key;
  if (
    releasedkey === "ArrowUp" ||
    releasedkey === "ArrowDown" ||
    releasedkey === "ArrowLeft" ||
    releasedkey === "ArrowRight"
  ) {
    keys[releasedkey] = false;
  }
  console.log(keys);
}

function gamePlay() {
  let car = document.querySelector(".car");
  let road = gameArea.getBoundingClientRect();
//   let carLocation = car.getBoundingClientRect();
  moveLines();
  moveEnemy(car);
  // console.log("road", road);
  // console.log("carLocation",carLocation)
  // road.height-carLocation.height
  // road.width-carLocation.width
  if (player.start) {
    if (keys.ArrowUp && player.y > road.top) {
      player.y = player.y - player.speed;
    }
    if (keys.ArrowDown && player.y < road.bottom - 140) {
      // sir took 140
      player.y = player.y + player.speed;
    }
    if (keys.ArrowLeft && player.x > 10) {
      player.x = player.x - player.speed;
    }
    if (keys.ArrowRight && player.x < road.width - 60) {
      player.x = player.x + player.speed;
    }

    car.style.left = player.x + "px";
    car.style.top = player.y + "px";

    player.score++;
    score.innerText = "Score:" + player.score;
    requestAnimationFrame(gamePlay);
  }
}

function moveLines() {
  let dividers = document.querySelectorAll(".divider");
  dividers.forEach((divider) => {
    console.log("y", divider.y);

    if (divider.y >= 558) {
      //vh=558
      divider.y = divider.y - 580;
    }

    divider.y = divider.y + player.speed;
    divider.style.top = divider.y + "px";
  });
}

function moveEnemy(car) {
  let enemies = document.querySelectorAll(".enemy");
  enemies.forEach((enemy) => {
    if (isCollide(car, enemy)) {
      console.log("Boom! hit");
      endGame();
    }

    console.log("y", enemy.y);

    if (enemy.y >= 558) {
      //558

      enemy.y = enemy.y - 580;
      enemy.style.left = parseInt(Math.random() * 250) + "px";
    }

    enemy.y = enemy.y + player.speed - 1;
    enemy.style.top = enemy.y + "px";
  });
}

function isCollide(a, b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();
  let collideCondition =
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right;

  return !collideCondition;
}

function endGame() {
  player.start = false;
  startScreen.classList.remove("hide");
  gameArea.classList.add("hide");
  startScreen.innerHTML =
    "Game Over <br> Your final score is " +
    player.score +
    "<br> Press here to start the game";
}
function start() {
  // once clicked on "start screen" hides start screen and shows game area
  startScreen.classList.add("hide");
  gameArea.classList.remove("hide");
  player.start = true;
  // end code of game, player.start = false;

  // lets make divider
  for (let x = 0; x <= 4; x++) {
    let divider = document.createElement("div");
    divider.className = "divider";
    divider.y = x * 150;
    divider.style.top = divider.y + "px";
    gameArea.append(divider);
  }

  requestAnimationFrame(gamePlay);
  // lets make a car
  let car = document.createElement("div");
  car.innerHTML = "Car";
  car.className = "car";
  // console.log(car.offsetLeft,car.offsetTop);
  gameArea.append(car);
  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  //lets make enemy cars
  for (let i = 0; i <= 2; i++) {
    let enemy = document.createElement("div");
    enemy.className = "enemy";
    enemy.y = (i + 1) * 140;
    enemy.style.top = enemy.y + "px";
    enemy.style.left = parseInt(Math.random() * 250) + "px";
    enemy.style.backgroundColor = "green";
    gameArea.append(enemy);
  }
}
