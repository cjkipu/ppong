

var score = 0;
var highscore = 0;

var xBall = (Math.random() * 500) + 50;
var yBall = 120;
var diameter = 40;
var d2 = diameter + 10;
var xBallChange = 5;
var yBallChange = 5;
var wWidth = window.innerWidth / 2;
var wHeight = window.innerHeight;

var started = false;

var game = false
var ps = false

var xPaddle;
var yPaddle;
var paddleWidth = 100;
var paddleHeight = 25;

//computer's paddle 
var xPaddle2;
var yPaddle2;
var paddleWidth2 = 100;
var paddleHeight2 = 25;

function setup() {
    var canvas = createCanvas(wWidth, wHeight);
    canvas.parent('canvas');
    $(".card-end").hide();
    game = true;
}

function draw() {
    if (game && (!ps)) {
        var xp = yPaddle2 / (yBall / xBall);
        //console.log(xp)


        //if collide
        //loop()
        if (xBall <= diameter / 2 ||
            xBall >= wWidth - (diameter / 2)) {
            xBallChange *= -1;
            var audio = new Audio('assets/sound/knock.wav');
            audio.volume = 0.05
            audio.play();

        }
        if (yBall <= diameter / 2 ||
            yBall >= wHeight - diameter) {

            //game over
            if (yBall >= wHeight - diameter) {
                var audio = new Audio('assets/sound/fail.wav');
                audio.volume = 0.25
                audio.play();
                //yBallChange *= -1;
                game = false
                $(".card-end").show();
            } else {
                yBallChange *= -1;
            }
        }

        //game over for comp
        if ((yBall - (diameter / 2)) < yPaddle2) {
            var audio = new Audio('assets/sound/fail.wav');
            audio.volume = 0.25
            audio.play();
            //game = false
            $(".card-end").show();
        }

        //if collide with paddle
        if ((xBall > xPaddle &&
            xBall < xPaddle + paddleWidth) &&
            (yBall + (diameter / 2) >= yPaddle)) {

            xBallChange *= -1;
            yBallChange *= -1;

            var audio = new Audio('assets/sound/knock4.wav');
            audio.volume = 0.10
            audio.play();
            var audio = new Audio('assets/sound/knock2.wav');
            audio.volume = 0.05
            audio.play();
            score += 5;
        }

        //if collide with paddle2
        if ((xBall > xPaddle2 &&
            xBall < xPaddle2 + paddleWidth2) &&
            (yBall - (diameter / 2) <= yPaddle2)) {
            xBallChange *= -1;
            yBallChange *= -1;

            var audio = new Audio('assets/sound/knock2.wav');
            audio.volume = 0.05
            audio.play();
        }

        //console.log(xBall,yBall)
        //setup ball 
        xBall += xBallChange;
        yBall += yBallChange;
        background(249, 246, 242);

        fill(226, 115, 150);
        noStroke();
        ellipse(xBall, yBall, diameter, diameter);



        if (!started) {
            xPaddle = (wWidth / 2) - 50;
            yPaddle = wHeight - 50;

            xPaddle2 = (wWidth / 2) - 50;
            yPaddle2 = 50;

            started = true;
        } else {
            xPaddle2 = xp + (paddleWidth2 / 2);
        }

        //paddle1
        fill(209, 209, 209);
        noStroke();
        rect(xPaddle, yPaddle, paddleWidth, paddleHeight, 20);

        //paddle2
        fill(209, 209, 209);
        noStroke();
        rect(xPaddle2, yPaddle2, paddleWidth2, paddleHeight2, 20);

        //move paddle
        if (keyIsDown(LEFT_ARROW)) {
            if (xPaddle >= 0) {
                xPaddle -= 10;
            } else {
                xPaddle = 0;
            }
        }
        if (keyIsDown(RIGHT_ARROW)) {
            if (xPaddle <= wWidth - paddleWidth) {
                xPaddle += 10;
            } else {
                xPaddle = wWidth - paddleWidth;
            }
        }

        //limit paddle
        if (xPaddle < 0) {
            xPaddle = 0;
        }
        if (xPaddle > wWidth - paddleWidth) {
            xPaddle = wWidth - paddleWidth;
        }

        //set highscore
        if (highscore < score) {
            let f = [score]
            highscore = f[0];
        }

        document.getElementsByClassName('highscore')[0].innerHTML = highscore.toString().padStart(6, "0");
        document.getElementsByClassName('score')[0].innerHTML = score.toString().padStart(6, "0");

    } else if (game !== true) {
        //noLoop()
        console.log("game over")
    } else if (ps == true) {
        //noLoop()
        console.log("game paused")
    }
}

function pause() {
    ps = !ps;
    if (ps === true) {
        document.getElementsByClassName('pause_button')[0].innerHTML = "Resume Game";
    } else {
        document.getElementsByClassName('pause_button')[0].innerHTML = "Pause Game"
    }
}

function newgame() {
    $(".card-end").hide();
    console.log("newww")
    console.log(highscore)
    score = 0;
    console.log(highscore)
    xPaddle = (wWidth / 2) - 50;
    yPaddle = wHeight - 50;
    xBall = (Math.random() * 500) + 50;
    yBall = 120;
    game = true;
    ps = false;
}

function keyPressed() {
    if (keyCode === 32) {
        newgame()
    }
}

var btp = document.getElementsByClassName('pause_button');
btp.onclick = function () {
    pause()
}
var btng = document.getElementsByClassName('ng_button');
btng.onclick = function () {
    newgame()
}
$(".btn").on('click', function () {
    setTimeout(function () {

        // Something you want delayed.
        $(".btn").blur();
    }, 1000)

}) 