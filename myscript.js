var canvas;
var canvasContext;
var ballx = 100; // x position of ball
var ballspeedx = 5; // ball speed and increasing in function call //canvas.width
// to move or bounce ball vetically i.e Y axis
var bally = 200;
var ballspeedy = 5; // for canvas.height
var startgamed = false; // flag to check is if game is started or not
// fot the left paddle
var paddleLeftX = 0; // X coordinate of left playerpaddle
var paddleLeftY = 100; // Y coordinate of left playerpaddle
// for the right paddle
var paddleRightX = 690; //x coordinate of right playerpaddle
var paddleRightY = 100; // y coordinate of right player paddle
const Paddle_Height = 80; // unchanged paddle height
const Paddle_width = 12; //unchanged paddle width
const paddle_Speed = 6; // paddle speed
canvas = document.getElementById("gamedemo");
canvasContext = canvas.getContext("2d");
var fps = 30; //frame per second i.e still images in screen in each 30 sec.
const intervalid = setInterval(callboth, 1000 / fps); //to slow down ball motion by 1000ms by 30fps
// setup arrowkeys to move the paddle position
var pressedup = false;
var presseddown = false;
//setup arrowkeys for right paddle
var pressedW = false; // for rightpaddle to move up
var pressedS = false; // for rightpaddle to move down
var LeftPlayerScore = 0;
var RightPlayerScore = 0;
// setup to start the game and add eventListner
function set_game() {
  drawStartMessage();
  document.addEventListener("keydown", startgame);
  document.addEventListener("keydown", keyDownHandler);
  document.addEventListener("keyup", keyUpHandler);
  document.addEventListener("keydown", keyDownHandlerLeft);
  document.addEventListener("keyup", keyUpHandlerLeft);
}
// Draw 'Press E to start' message
function drawStartMessage() {
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  canvasContext.fillStyle = "white";
  canvasContext.font = "30px poppins";
  canvasContext.textAlign = "center";
  canvasContext.fillText(
    "Press E to start game",
    canvas.width / 2,
    canvas.height / 2
  );
}

// Listens E to start game
function startgame(event) {
  if (event.key === "e" || event.key === "E") {
    startgamed = true;
    document.removeEventListener("keydown", startgame); // remove listener after game starts
    //setInterval(intervalid);
  }
}
function callboth() {
  if (startgamed) {
    draw();
    movement();
  }
}

function movement() {
  //for motion of box
  ballx = ballx + ballspeedx;
  bally = bally + ballspeedy;
  if (ballx + ballspeedx < 0) {
    // for left side
    //ballspeedx = -ballspeedx;
    if (
      ballx < paddleLeftX + Paddle_width && // Ball reaches the right edge of the left paddle
      bally > paddleLeftY && // Ball is below the top edge of the paddle
      bally < paddleLeftY + Paddle_Height
    ) {
      ballx = paddleLeftX + Paddle_width;
      // Ball is above the bottom edge of the paddle
      ballspeedx = -ballspeedx; // Reverse horizontal direction on hit

      // Add some variation to the vertical speed based on where it hits the paddle
      const paddleCenterY = paddleLeftY + Paddle_Height / 2;
      const hitPosition = bally - paddleCenterY;
      ballspeedy -= hitPosition * 0.1; // Adjust vertical speed based on hit position
    } else {
      //ballResetLeft();
      Right_Winner();
    }
  }

  if (ballx + ballspeedx > canvas.width) {
    // for right
    ballspeedx = -ballspeedx;
    //ballResetLeft();
    //console.log(ballx);

    //clearInterval(intervalid); for stoping if certain ballx is reached
  }
  if (bally + ballspeedy < 0) {
    // for left side
    ballspeedy = -ballspeedy;
    //ballResetRight();
  }
  if (ballx + ballspeedx > paddleRightX) {
    // Check if the ball is within the y-range of the right paddle
    if (bally > paddleRightY && bally < paddleRightY + Paddle_Height) {
      ballspeedx = -ballspeedx; // Reverse direction to simulate a hit
    } else {
      // Ball missed the paddle, reset to center
      //ballResetRight();
      Left_Winner();
    }
  }
  if (bally + ballspeedy > canvas.height) {
    // for right
    ballspeedy = -ballspeedy;
    //ballResetRight();

    //console.log(ballx);
  }

  // for leftPlayerPaddle movement
  if (pressedup && paddleLeftY > 0) {
    paddleLeftY -= paddle_Speed;
  }
  if (presseddown && paddleLeftY < canvas.height - Paddle_Height) {
    paddleLeftY += paddle_Speed;
  }
  // for rightPlayerpaddle movemnt
  if (pressedW && paddleRightY > 0) {
    paddleRightY -= paddle_Speed;
  }
  if (pressedS && paddleRightY < canvas.height - Paddle_Height) {
    paddleRightY += paddle_Speed;
  }
}
function Left_Winner() {
  win = true;
  ballResetLeft();
  LeftPlayerScore++;
  if (LeftPlayerScore === 5) {
    //alert("left player wins");
    canvasContext.fillText("Left Player won", 350, 350);
    canvasContext.font = "30px sans-serif";

    clearInterval(intervalid);
  }
}
function Right_Winner() {
  ballResetRight();
  RightPlayerScore++;
  if (RightPlayerScore === 5) {
    //alert("Right player wins");
    canvasContext.fillText("Right Player won", 350, 350);
    canvasContext.font = "30px sans-serif";

    clearInterval(intervalid);
  }
}

// handling keydown events
function keyDownHandlerLeft(event) {
  if (event.key === "ArrowUp") {
    pressedup = true;
  }
  if (event.key === "ArrowDown") {
    presseddown = true;
  }
}
// to make sure paddle doesnot move when keys aren't pressed
function keyUpHandlerLeft(event) {
  if (event.key === "ArrowUp") {
    pressedup = false;
  }
  if (event.key === "ArrowDown") {
    presseddown = false;
  }
}
// for rightPlayerMovement
function keyDownHandler(event) {
  if (event.key === "w" || event.key === "W") {
    pressedW = true;
  }
  if (event.key === "s" || event.key === "S") {
    pressedS = true;
  }
}
function keyUpHandler(event) {
  if (event.key === "w" || event.key === "W") {
    pressedW = false;
  }
  if (event.key === "s" || event.key === "S") {
    pressedS = false;
  }
}

//funtion to reest ball
function ballResetLeft() {
  ballspeedx = -ballspeedx;

  ballx = canvas.width / 2;
  bally = canvas.height / 2;
}
function ballResetRight() {
  ballspeedx - ballspeedx;
  ballspeedy = -ballspeedy;

  ballx = canvas.width / 2;
  bally = canvas.height / 2;
}

function drawCircle(Xcordinate, Ycordinate, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath(); //  drawing new circle path so it doesnot connect t previous path
  canvasContext.arc(Xcordinate, Ycordinate, radius, 0, Math.PI * 2); //arc function ballx : x-cor of circle, 100: y-cor of circle ,10:radius of circle,0:starting angle (0 represents the 3 o'clock position )Math.PI * 2: The ending angle, in radians (Math.PI * 2 is a full circle, or 360 degrees).true: Specifies the direction in which the arc is drawn. true means clockwise, but for a full circle, this doesn’t affect the result.

  canvasContext.fill(); // fill cirecle with white color
  canvasContext.fillText("Score", 350, 50);
  canvasContext.fillText(LeftPlayerScore, 100, 100);
  canvasContext.fillText(RightPlayerScore, 600, 100);
}
function drawDottedLine() {
  canvasContext.beginPath();
  canvasContext.setLineDash([5, 12]); // Array defines dash length and gap: [dash, gap]
  canvasContext.moveTo(canvas.width / 2, 52); // Start at the top center
  canvasContext.lineTo(canvas.width / 2, canvas.height); // Draw to the bottom center
  canvasContext.strokeStyle = "white"; // Set color for the dotted line
  canvasContext.lineWidth = 2;
  canvasContext.stroke();
  canvasContext.setLineDash([]); // Reset line dash to solid for other drawings
}

function draw() {
  canvasContext.fillStyle = "black"; // color for the shape
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  // left player paddle
  canvasContext.fillStyle = "white";
  canvasContext.fillRect(paddleLeftX, paddleLeftY, Paddle_width, Paddle_Height);
  // right plyer paddle
  canvasContext.fillStyle = "white";
  canvasContext.fillRect(
    paddleRightX,
    paddleRightY,
    Paddle_width,
    Paddle_Height
  );
  drawDottedLine();

  drawCircle(ballx, bally, 10, "white");
}
set_game();
