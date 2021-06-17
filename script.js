let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo
let context = canvas.getContext( "2d" ); //renderiza o desenho que vai acontecer//
let box = 32; //cada quadradinho da cobrinha terá 32px//
let snake = [];//cria cobrinha como lista, já que ela vai ser uma série de coordenadas, qu quando pintadas, criam os quadradinhos
snake[0] ={
    x: 8 * box, // tamanho da cobrinha
    y: 8 * box  // tamanho da cobrinha
}
let direction = "right"; // direção que a cobrinha vai se movimentar
let food = { //comida da cobrinha 
    x: Math.floor(Math.random() * 15 + 1) * box, //lógica para a comidinha nao aparecer no mesmo lugar e ficar mudando
    y: Math.floor(Math.random() * 15 + 1) * box  //math.floor tira a parte flutuante, ou seja, a vigula até onde foi setado que nesse caso e o tamanho do mural
                                                  //o math.radom retorna um número aleatório até 1
} 

function criarBG() {
    context.fillStyle = "lightblue"; //definição da cor do mural onde a cobrinha vai andar 
    context.fillRect(0, 0, 16*box, 16*box); //desenha o retangulo onde vai acontecer o jogo, trabalha com 4 parâmetro a definição do x e y, altura e largura//
    
}

function criarCobrinha (){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "blue"; //cor da cobrinha  
        context.fillRect(snake[i].x, snake[i].y, box, box); //tamanho da cobrinha
    }

}

function drawFood (){  //comidinha para crescer a cobrinha
    context.fillStyle = "red"; // cor da comidinha
    context.fillRect(food.x, food.y, box, box); // as coordenadas de onde a comidinha vai parar
}

document.addEventListener('keydown', update); //funcionalidade para ativacao do teclado para o jogo

function update (event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left'; //lógica para o percurso que a cobrinha vai fazer, se o botao 37 e a direcao nao for direita, muda a direcao para esquerda.
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo(){  //função para criar atulização constante da página para que a cobrinha se mova

    
    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0; //funcao para a cobrinha atravessar a parede e sair do outro lado
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++){ //quando a cobrinha se chocar no corpo chamr o alert para avisar fim de jogo 
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){ //se a posicao 0 de snake x for exatamente igual a posicao "i" de corpinho for a mesma e se a posicao 0 de y for igual i de y para a funcao jogo. 
            clearInterval (jogo); //para a funcao jogo com clearinterval
            alert('Game Over :('); // chama o alert para o gamer over 
        }
    }

    criarBG();
    criarCobrinha();
    drawFood(); // chama a funçao da comidinha 

    let snakeX = snake[0].x; //movimentos que a cobrinha irá fazer dentro da array
    let snakeY = snake[0].y; //movimentos que a cobrinha irá fazer dentro da array

    if(direction == "right") snakeX += box;//se a cobrinha x andar para direita, sera acrescenta um quadradinho a mais
    if(direction == "left") snakeX -= box; // se a cobtinha x for para esquerda, sera reduzido um quadradidinho a cobrinha

    if(direction == "up") snakeY -= box;//se a cobrinha y for para cima, sera acrescenta um quadradinho a mais
    if(direction == "down") snakeY += box; // se a cobtinha y for para baixo, sera reduzido um quadradidinho a cobrinha

    if(snakeX != food.x || snakeY !=food.y){ // 
        snake.pop(); //tira o ultimo elemento da array
    } else{
        food.x = Math.floor(Math.random() * 15 +1) * box; // recebe uma posicao aleatoria
        food.y = Math.floor(Math.random() * 15 +1) * box; // recebe uma posicao aletoria
    }
    
    
    let newHead = {
        x:snakeX,
        y:snakeY
      
    }

    snake.unshift(newHead);// método unshift adiciona como primeiro quadradinho da cobrinha

    
}

let jogo = setInterval(iniciarJogo, 100); //garante que o jogo inicie sem travar 

