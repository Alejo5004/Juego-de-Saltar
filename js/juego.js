var canvas, ctx, x, y;

width = 800;
heigh = 500;

canvas = document.getElementById('canvas');
ctx = canvas.getContext("2d");

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
    jump: 32,
    gravity: 2,
    jumping: false,
    color: '#008b8b',
    speed: 0,
    dead: false,
    score: 0,
    data:2,
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
    fps: 2,
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
    ctx.font = "bold 20px sans-serif";
    ctx.fillStyle = '#e5be01';
    ctx.fillText("Puntuacion: "+sphere.score, 50, 50);

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
            eraseCanvas();
            sphere.dead = false;
            level.speed = 15;
            enemy.x = width + 100;
            sphere.score = 0;
            
        }
    }
});

// ----------------- Bucle Principal ------------------- //

function gravity(){
    if(sphere.jumping == true){
        if(sphere.y - sphere.jump - sphere.gravity > sphere.y){
            sphere.jumping = false;
            sphere.y = ySphere;
            sphere.jump = 32;
        }else{
            sphere.jump -= sphere.gravity;
            sphere.y -= sphere.jump;
        }
    }
}

function enemyMovement(){
    if(enemy.x < -enemy.heigh){
        enemy.x = width + enemy.heigh;
        sphere.score ++;
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
        level.fps = 3;
    }
}

function score(){
    if(sphere.score % 5 == 0 && sphere.score != 1){
        level.fps += 0,01;
        interval();
    }
}

function start(){
    floorCreation();
    sphereCreation();
    enemyCreation();
    text();
}

function loop(){
    eraseCanvas();
    gravity();
    start();
    collision();
    enemyMovement();
}
function interval(){
    clearInterval(loop2);
    var loop2 = setInterval(function(){
        loop();
        console.log(level.fps)
    }, 100 / level.fps);
}
interval();

