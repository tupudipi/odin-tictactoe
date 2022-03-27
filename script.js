const gameBoard = (() => {
    let array = [];
    const updateArray =  (i) =>{
        array[i] = 'X';
    }

    return {
        updateArray,
        array
    };
})();

const displayController = (() => {
    const updateDisplay = (event) => {
        let index = event.target.dataset.id;
        gameBoard.updateArray(index);
        console.log(gameBoard.array);
        gameCells[index].innerHTML = 'X';
    }

    return {
        updateDisplay
    };
})();

const gameCells = Array.from(document.getElementsByClassName("gameCell"));
gameCells.forEach(element => {
    element.addEventListener('click', displayController.updateDisplay);
});

