
// setup canvas

const $canvas = document.querySelector('canvas');
const ctx = $canvas.getContext('2d');


console.log()
//de manera dinamica modifica el tamaño del canvas
const width = $canvas.width = window.innerWidth;
const height = $canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball{
  
  constructor(x, y, velX, velY, color, size){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    //controlamos que cuando toque un borde cambie de direccion
    if ((this.x + this.size) >= width) {
       this.velX = -(this.velX);
    }
 
    if ((this.x - this.size) <= 0) {
       this.velX = -(this.velX);
    }
 
    if ((this.y + this.size) >= height) {
       this.velY = -(this.velY);
    }
 
    if ((this.y - this.size) <= 0) {
       this.velY = -(this.velY);
    }
    // aca es donde se le da la velocidad de desplazamiento
    this.x += this.velX;
    this.y += this.velY;
 }
 /* Este metodo se va a llamar dentro de la funcion loop y va a analizar si en el recorrido de la ball esta hace
 contacto con otra ball*/

 collisionDetect() {
 
  //resorre el arreglo balls
  for (const ball of balls) {
     //detecta que la bola que esta recorriendo no sea la misma que quiere analizar
     if (!(this === ball)) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = randomRGB();
          this.color = randomRGB();
          this.velX = -(this.velX);
          this.velY = -(this.velY);
        }
     }
  }
}
}
//arreglo para almacenar los objetos ball
const balls = [];
//instanciamos 25 objetos ball
while (balls.length < 10) {
  //la medida de cada ball oscila entre 10 y 20 px
   const size = random(5,50);
   const ball = new Ball(
      //pociciona de manera random en el eje x e y a la bola dentro del canvas
      random(0 + size,width - size),
      random(0 + size,height - size),
      //define la velocidad de desplazamiento de manera random 
      random(-5,5),
      random(-5,5),
      //define un color random
      randomRGB(),
      size
   );
  //agrega cada bola al final del arreglo balls
  balls.push(ball);
}


function loop() {
  ctx.fillStyle = 'rgba(50, 50, 60, 0.80)';
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }
  //funcion que genera la animación
  requestAnimationFrame(loop);
}

loop()



