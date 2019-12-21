var canvas, ctx
canvas = document.getElementById('canvas');
// Para dibujar en 2d
    ctx = canvas.getContext("2d");

// Dibujar rectangulos
    // ctx.fillRect(x,y,Ancho, Alto); // crea rectagulos solidos
    // ctx.strokeRect(x,y,Ancho, Alto); // Crea rectagulos solo con el borde
    ctx.fillRect(10,10,100, 100);
    ctx.strokeRect(150, 10, 100, 100);

//Dibujar circulos: la unidad de es en radianes 
    // ctx.arc(x-centro, y-centro, radio, Angulo inicial, angulo final);
    //ctx.fill();
    //ctx.stroke();

    ctx.arc('60', '180', '50', '0', 2*Math.PI);
    ctx.fill();
    // ctx.arc('170', '180', '50', '0', 2*Math.PI);
    // ctx.stroke();

// crear lineas
    ctx.beginPath();
    ctx.moveTo('10', '240');
    ctx.lineTo('250', '240');
    ctx.lineTo('10', '300');
    ctx.lineWidth = 5;
    ctx.closePath();
    ctx.fillStyle = "#00f";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo('260', '240');
    ctx.lineTo('500', '240');
    ctx.lineTo('260', '300');
    ctx.closePath();
    ctx.strokeStyle = "#f00";
    ctx.stroke();

// Limpiar canvas
    // ctx.clearReact(x, y, Ancho, alto);
    ctx.clearRect('20', '30', '30', '30');
    ctx.clearRect('70', '30', '30', '30');