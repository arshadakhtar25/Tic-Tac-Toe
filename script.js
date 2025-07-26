
//// fetch kar liya
const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGamebtn = document.querySelector(".btn");

/// variables to be needed
let currentPlayer;
let gameGrid;
const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

/// function to initialize the game
function initGame(){
    currentPlayer = 'X';
    gameGrid = ["","","","","","","","",""];

    // UI par bhi boxes empty karne padenge
    boxes.forEach((box, index) =>{
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.classList.remove("win");
    })

    newGamebtn.classList.remove("active");
    boxes.forEach(box => {
    gameInfo.innerText = `Current Player - ' ${currentPlayer} '`;
    })
};

initGame();

function checkGameOver(){
    let answer = "";
    
    winningPosition.forEach((position) =>{
        if(  (gameGrid[position[0]] != "" || gameGrid[position[1]] != "" || gameGrid[position[2]] != "") && ((gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]] )  )){

            // check if winner is X
            if(gameGrid[position[0]] === 'X'){
                answer = "X";
            }
            else{
                answer = 'O';
            }

            // disable pointer events
            boxes.forEach(box =>{
                box.style.pointerEvents = "none";
            })

            // now we know the winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }

        
    })

    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ' ${answer} '`;
        newGamebtn.classList.add("active");
        return;
    }

    //when there is a tie
    let fillCount = 0;
    gameGrid.forEach(box =>{
        if(box !== ""){
            fillCount++;
        }
    })

    if(fillCount == 9){
        gameInfo.innerText = 'Game Tied !!!';
        newGamebtn.classList.add("active");
    }

}

function swapTurn(){
    if(currentPlayer == 'X'){
        currentPlayer = 'O';
    }
    else{
        currentPlayer = 'X';
    }
    gameInfo.innerText = `Current Player - ' ${currentPlayer} '`;
}

function handleClick(index){
    if(gameGrid[index] == ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = 'none';
        //swap karo turn ko
        swapTurn();

        // check koi jeet to nahi gaya
        checkGameOver();
    }
}

boxes.forEach((box, index) =>{
    box.addEventListener('click', () =>{
        handleClick(index);
    })
})

newGamebtn.addEventListener('click', initGame);