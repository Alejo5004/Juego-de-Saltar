var canvas, ctx, width, heigh, bestScore;

width = 800;
heigh = 500;

canvas = document.getElementById('canvas');
ctx = canvas.getContext("2d");

bestScore = localStorage.getItem("bestScore");

function eraseCanvas(){
    canvas.width = width;
    canvas.heigh = heigh;
}
// ------------------ Assets ----------------------------//

var floor = {
    position: heigh - 100,
    color: '#964B00',
}

var radius = 50;
var ySphere = floor.position - radius;

var sphere = {
    radius: radius,
    x: 100,
    y: ySphere,
    jump: 28,
    gravity: 2,
    jumping: false,
    color: '#008b8b',
    speed: 0,
    dead: false,
}

var heighEnemy = 100;

var enemy = {
    width: 50,
    heigh: heighEnemy,
    x: width + 100,
    y: floor.position - heighEnemy,
    color: '#0f0',
}

var level = {
    speed: 15,
    fps: 90,
    score: 0,
}

var keys = {
    jump:32,
}

function sphereCreation(){
    ctx.arc(sphere.x, sphere.y, sphere.radius, '0', 2*Math.PI);
    ctx.fillStyle = sphere.color;
    ctx.fill();
}

function floorCreation(){
    ctx.beginPath();
    ctx.moveTo('0', floor.position);
    ctx.lineTo(width, floor.position);
    ctx.lineWidth = '1';
    ctx.strokeStyle = floor.color;
    ctx.closePath();
    ctx.stroke();
}

function enemyCreation(){
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.heigh);
}

function text(){
    // score
    ctx.font = "bold 20px sans-serif";
    ctx.fillStyle = '#e5be01';
    ctx.fillText("Puntuacion: "+level.score, 50, 50);
    
    // Best Scores
    ctx.font = "bold 20px sans-serif";
    ctx.fillStyle = '#0f0';
    ctx.fillText(localStorage.getItem("bestScore") == undefined  || localStorage.getItem("bestScore") == null ? 'Mejor Puntaje: 0' : 'Mejor Puntaje: ' + localStorage.getItem("bestScore"), 600, 50);

    // game over
    if(sphere.dead == true){
        ctx.font = "bold 40px sans-serif";
        ctx.fillStyle = '#000'
        ctx.fillText("GAME OVER", 300, 250);
    }
}

// --------------------------- Evento de tecla ----------------------------- //

// // Deteccion de precionar la tecla 
// // si se quiere cambiar la tecla esta en ASCII

document.addEventListener('keydown', function(event){
    if(event.keyCode === keys.jump){
        if(sphere.dead == false){
            sphere.jumping = true;
        }else{
            if(localStorage.getItem("bestScore") == undefined || localStorage.getItem("bestScore") == null || localStorage.getItem("bestScore") < level.score){
                localStorage.setItem("bestScore", level.score)
            }
            level.fps = 1000;
            level.speed = 15;
            interval();
            eraseCanvas();
            sphere.dead = false;
            enemy.x = width + 100;
            level.score = 0;
        }
    }
});

// ----------------- Logica ------------------- //

function gravity(){
    if(sphere.jumping == true){
        if(sphere.y - sphere.jump - sphere.gravity > sphere.y){
            sphere.jumping = false;
            sphere.y = ySphere;
            sphere.jump = 28;
        }else{
            sphere.jump -= sphere.gravity;
            sphere.y -= sphere.jump;
        }
    }
}

function enemyMovement(){
    if(enemy.x < -enemy.heigh){
        enemy.x = width + enemy.heigh;
        level.score ++;
        score();
    }else{
        enemy.x -= level.speed;
    }
}

function collision(){
    if((enemy.x >= (sphere.x - sphere.radius) && enemy.x <= (sphere.x + sphere.radius))
     && enemy.y == (sphere.y - sphere.radius)){
        sphere.dead = true;
        level.speed = 0;
    }
}

function score(){
    if(level.score % 5 == 0 && level.score != 1){
        if(sphere.dead == false){
            level.fps -= 10;
            interval();
        }
    }
}

function start(){
    floorCreation();
    sphereCreation();
    enemyCreation();
    text();
}
// ----------------- Bucle Principal ------------------- //

function loop(){
    eraseCanvas();
    gravity();
    start();
    collision();
    enemyMovement();
}

function interval(){
    clearInterval(loop2);
    var loop2 = setInterval(loop, level.fps);
}
interval();
