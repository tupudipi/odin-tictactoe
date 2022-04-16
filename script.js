const gameBoard = (() => {
    let winner = '?';
    let array = ['', '', '',
                    '', '', '',
                    '', '', ''];
    const updateArray = (i) => {
        if (currentPlayer.innerHTML === "X's turn") {
            array[i] = 'X';
        } else {
            array[i] = 'O';
        }
    }
    const checkWin = () => {
        return winnerQ(0, 1, 2) ||
            winnerQ(3, 4, 5) ||
            winnerQ(6, 7, 8) ||
            winnerQ(0, 3, 6) ||
            winnerQ(1, 4, 7) ||
            winnerQ(2, 5, 8) ||
            winnerQ(0, 4, 8) ||
            winnerQ(2, 4, 6);
    }

    const winnerQ = (a, b, c) => {
        console.log(array[a], array[b], array[c]);
        if (array[a] === 'X' && array[b] === 'X' && array[c] === 'X') {
            winner = array[a];
            return winner;
        }
        if (array[a] === 'O' && array[b] === 'O' && array[c] === 'O') {
            winner = array[a];
            return winner;
        }
        return false;
    }

    const resetGame = () => {
        gameBoard.array = ['', '', '',
            '', '', '',
            '', '', ''];
        gameBoard.winner = '?';
        currentPlayer.innerHTML = "X's turn"
        playerO.score = 0;
        playerX.score = 0;
        playerXScore.innerHTML = 0;
        playerOScore.innerHTML = 0;
        gameCells.forEach(cell => {
            cell.innerHTML = '';
            cell.classList.remove('clicked');
            cell.classList.remove('hover');
        });
        console.log(gameBoard.array);
    }

    const nextRound = () => {
        gameBoard.array = ['', '', '',
                            '', '', '',
                            '', '', ''];
        gameBoard.winner = '?';
        currentPlayer.innerHTML = "X's turn"
        gameCells.forEach(cell => {
            cell.innerHTML = '';
            cell.classList.remove('clicked');
            cell.classList.remove('hover');
        });
        console.log(gameBoard.array);
    }

    return {
        winner,
        checkWin,
        updateArray,
        array,
        resetGame,
        nextRound
    };
})();

const displayController = (() => {
    const updateDisplay = (event) => {
        let index = event.target.dataset.id;
        gameBoard.updateArray(index);
        console.log(gameBoard.array);

        if (currentPlayer.innerHTML === "X's turn") {
            gameCells[index].innerHTML = 'X';
        } else {
            gameCells[index].innerHTML = 'O';
        }

        gameCells[index].classList.remove('hover');
        gameCells[index].classList.add('clicked');

        if (currentPlayer.innerHTML === "X's turn") {
            currentPlayer.innerHTML = "O's turn";
        } else {
            currentPlayer.innerHTML = "X's turn";
        }

        if (gameBoard.checkWin()) {
            if (gameBoard.checkWin()=='X') {
                currentPlayer.innerHTML = `${gameBoard.checkWin()} wins!`;
                playerX.score++;
                playerXScore.innerHTML = playerX.score;
            } else {
                currentPlayer.innerHTML = `${gameBoard.checkWin()} wins!`;
                playerO.score++;
                playerOScore.innerHTML = playerO.score;
            }
        }
    }

    const hover = (event) => {
        let index = event.target.dataset.id;
        if (gameBoard.array[index] == "") {
            if (currentPlayer.innerHTML === "X's turn") {
                gameCells[index].innerHTML = 'X';
            } else {
                gameCells[index].innerHTML = 'O';
            }
            gameCells[index].classList.add('hover');
        }
    }

    const resetHover = (event) => {
        let index = event.target.dataset.id;
        if (gameBoard.array[index] == "") {
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
    return {
        getSymbol,
        score
    }
}

const playerX = Player('X');
const playerO = Player('O');

const currentPlayer = document.getElementById('current-player');
const playerXScore = document.getElementById('player-x-score');
const playerOScore = document.getElementById('player-o-score');

const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', gameBoard.resetGame);

const nextRoundBtn = document.getElementById('next-round-button');
nextRoundBtn.addEventListener('click', gameBoard.nextRound);

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
