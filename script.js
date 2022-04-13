const gameBoard = (() => {
    let winner = '?';
    let array =    ['','','',
                    '','','',
                    '','',''];
    const updateArray =  (i) =>{
        array[i] = 'X';
    }
    const checkWin = () => {
        return winnerQ(0,1,2) || 
            winnerQ(3,4,5) || 
            winnerQ(6,7,8) || 
            winnerQ(0,3,6) || 
            winnerQ(1,4,7) || 
            winnerQ(2,5,8) || 
            winnerQ(0,4,8) || 
            winnerQ(2,4,6);
    }

    const winnerQ = (a,b,c) => {
        console.log(array[a],array[b],array[c]);
        if(array[a] === 'X' && array[b] === 'X' && array[c] === 'X'){
            return true;
        }
        if(array[a] === 'O' && array[b] === 'O' && array[c] === 'O'){
            return true;
        }
        return false;
    }

    return {
        winner,
        checkWin,
        updateArray,
        array
    };
})();

const displayController = (() => {
    const updateDisplay = (event) => {
        let index = event.target.dataset.id;
        gameBoard.updateArray(index);
        console.log(gameBoard.array);

        if(currentPlayer.innerHTML === "X's turn"){
            gameCells[index].innerHTML = 'X';
        } else {
            gameCells[index].innerHTML = 'O';
        }

        gameCells[index].classList.remove('hover');
        gameCells[index].classList.add('clicked');

        if(currentPlayer.innerHTML === "X's turn"){
            currentPlayer.innerHTML = "O's turn";
        } else {
            currentPlayer.innerHTML = "X's turn";
        }

        if(gameBoard.checkWin()) {
            if(currentPlayer.innerHTML === "X's turn"){
                currentPlayer.innerHTML = "X wins!";
                playerX.updateScore();
                //playerXScore.innerHTML = playerX.score;
            } else {
                currentPlayer.innerHTML = "O wins!";
                playerO.updateScore();
                //playerOScore.innerHTML = playerO.score;
            }
        }
    }

    const hover = (event) => {
        let index = event.target.dataset.id;
        if(currentPlayer.innerHTML === "X's turn"){
            gameCells[index].innerHTML = 'X';
        } else {
            gameCells[index].innerHTML = 'O';
        }
        gameCells[index].classList.add('hover');
    }

    const resetHover = (event) => {
        let index = event.target.dataset.id;
        if(gameBoard.array[index]==""){
            gameCells[index].innerHTML = '';
        }
    }

    return {
        updateDisplay,
        hover,
        resetHover
    };
})();

const Player = (symbol) => {
    const getSymbol = () => {
        return symbol;
    }
    let score = 0;
    const updateScore = () => {
        score++;
    }
    return {
        getSymbol,
        score,
        updateScore
    }
}

const playerX = Player('X');
const playerO = Player('O');

const currentPlayer = document.getElementById('current-player');

const gameCells = Array.from(document.getElementsByClassName("gameCell"));
gameCells.forEach(element => {
    element.addEventListener('click', displayController.updateDisplay);
});

gameCells.forEach(element => {
    element.addEventListener('mouseenter', displayController.hover);
});

gameCells.forEach(element => {
    element.addEventListener('mouseout', displayController.resetHover);
});
