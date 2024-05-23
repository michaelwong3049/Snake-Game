let score = document.getElementById('.score');
let map = document.querySelector('.map');

let foodX = 0, foodY = 0;
let directionX = 0, directionY = 0;
let positionX = 12, positionY = 12;
let snakeBody = [];
let runningScore = 0;
let gameOver = false;

const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 40) + 1;
    foodY = Math.floor(Math.random() * 40) + 1;
}

const drawFood = () => {
    const foodDiv = document.createElement('div');
    foodDiv.classList.add('foodDiv');
    foodDiv.style.gridColumn = foodX;
    foodDiv.style.gridRow = foodY;
    map.appendChild(foodDiv);
}

const drawSnake = () => {
    for(let i = 0; i < snakeBody.length; i++){
        snake = snakeBody[i];
        snake = document.createElement("div");
        snake.classList.add("snake");
        snake.style.gridColumn = snakeBody[i][0];
        snake.style.gridRow = snakeBody[i][1];
        map.appendChild(snake);
    }
}

const move = () => {
    const head = {...snakeBody[0]};
    document.addEventListener('keydown', e =>{
        if(e.key === 'w'){
            directionX = 0;
            directionY = -1;
        }else if(e.key === 'a'){
            directionX = -1;
            directionY = 0;
        }else if(e.key === 's'){
            directionX = 0;
            directionY = 1;
        }else if(e.key === 'd'){
            directionX = 1;
            directionY = 0;
        }
    })
}

const handleGamerOver = () =>{
    clearInterval(); // setintervalid
    alert("game over");
    location.reload();
}

const init = () =>{
    move();

    //Checks if snake head's position the wall
    if(positionX > 50 || positionX < 0 || positionY > 40 || positionY < 0){
        handleGamerOver();
    }

    //Checks if snake head's position is equal to food position
    if(positionX == foodX && positionY == foodY){
        updateFoodPosition();
        drawFood();
        if(directionX != 0){
            snakeBody.push([snakeBody[snakeBody.length - 1][0],positionY]);  
        }
        else{
            snakeBody.push([positionX,snakeBody[snakeBody.length - 1][1]]); 
        }
    }


    //Checks if the snake's head position is equal to the body
    if(snakeBody.length > 1){
        for(let i = 0; i < snakeBody.length; i++){
            if((positionX == foodX && positionY == foodY)){
                if(positionX == snakeBody[i][0] && positionY == snakeBody[i][1]){
                    handleGamerOver();
                }
            }
        }
    }
        
    //Change the snake head's position
    positionX += directionX;
    positionY += directionY;

    //Makes the snake segments follow the head of the snake
    for(let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    snakeBody[0] = ([positionX, positionY]);

    map.innerHTML = "";
    drawSnake();
    drawFood();
}

updateFoodPosition();
drawFood();
console.log(foodX + " " + foodY)
setInterval(init, 150);;
