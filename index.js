let score = document.getElementById('.score');
let map = document.querySelector('.map');


let foodX, foodY;
let directionX = 0, directionY = 0;
let positionX = 12, positionY = 12;
let snakeBody = [];
let gameOver = false;

const updateFoodPostion = () => {
    foodX = Math.floor(Math.random() * 40) + 1;
    foodY = Math.floor(Math.random() * 40) + 1;
    
    const food = document.querySelector('.food');
    const foodDiv = document.createElement('div');
    food.classList.add('foodDiv');
    food.style.gridColumn = foodY;
    food.style.gridRow = foodX;
}

const move = () => {
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
}

const init = () =>{
    move();
    if(positionX === foodX && positionY === foodY){
    updateFoodPostion();
    snakeBody.push([foodX,foodY]);
    }

    let html;
    positionX += directionX;
    positionY += directionY;
    snakeBody[0] = [positionX, positionY];
    
    for(let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }

    for(let i = 0; i < snakeBody.length; i++){
        html = `<div class="snakeDiv" style="grid-area: ${positionY} / ${positionX}"></div>`;
        map.innerHTML += html;
    }
    
}

updateFoodPostion();
setInterval(init, 50);

