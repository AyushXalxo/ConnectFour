document.addEventListener('DOMContentLoaded', () => {
    const columns = 7;
    const rows = 6;
    const board = [];
    const gameBoard = document.getElementById('gameBoard');
    const restartButton = document.getElementById('restartButton');

    restartButton.addEventListener('click', startGame);

    function startGame() {
        gameBoard.innerHTML = '';
        for (let row = 0; row < rows; row++) {
            board[row] = [];
            for (let col = 0; col < columns; col++) {
                board[row][col] = null;
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.column = col;
                cell.dataset.row = row;
                cell.addEventListener('click', () => placeDisc(col));
                gameBoard.appendChild(cell);
            }
        }
    }

    function placeDisc(col) {
        for (let row = rows - 1; row >= 0; row--) {
            if (!board[row][col]) {
                board[row][col] = 'red'; // Assuming player's color is red
                updateBoard();
                if (checkWin(row, col)) {
                    return endGame('Player wins!');
                } else if (checkDraw()) {
                    return endGame('Draw!');
                }
                aiMove();
                break;
            }
        }
    }

    function aiMove() {
        let validMove = false;
        while (!validMove) {
            const aiCol = Math.floor(Math.random() * columns);
            for (let row = rows - 1; row >= 0; row--) {
                if (!board[row][aiCol]) {
                    board[row][aiCol] = 'yellow'; // AI's color
                    updateBoard();
                    if (checkWin(row, aiCol)) {
                        return endGame('AI wins!');
                    }
                    validMove = true;
                    break;
                }
            }
        }
    }

    function updateBoard() {
        let index = 0;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                const cell = gameBoard.children[index++];
                cell.style.backgroundColor = board[row][col] ? board[row][col] : 'lightblue';
            }
        }
    }

    function checkWin(row, col) {
        const color = board[row][col];
        if (!color) return false;

        // Horizontal
        let count = 1;
        for (let i = col + 1; i < columns && board[row][i] === color; i++) count++;
        for (let i = col - 1; i >= 0 && board[row][i] === color; i--) count++;
        if (count >= 4) return true;

        // Vertical
        count = 1;
        for (let i = row + 1; i < rows && board[i][col] === color; i++) count++;
        for (let i = row - 1; i >= 0 && board[i][col] === color; i--) count++;
        if (count >= 4) return true;

        // Diagonal (top-left to bottom-right)
        count = 1;
        for (let i = 1; row + i < rows && col + i < columns && board[row + i][col + i] === color; i++) count++;
        for (let i = 1; row - i >= 0 && col - i >= 0 && board[row - i][col - i] === color; i++) count++;
        if (count >= 4) return true;

        // Diagonal (bottom-left to top-right)
        count = 1;
        for (let i = 1; row - i >= 0 && col + i < columns && board[row - i][col + i] === color; i++) count++;
        for (let i = 1; row + i < rows && col - i >= 0 && board[row + i][col - i] === color; i++) count++;
        if (count >= 4) return true;

        return false;
    }

    function checkDraw() {
        return board.every(row => row.every(cell => cell !== null));
    }

    function endGame(message) {
        alert(message);
        startGame(); // Restart the game
    }

    startGame();
});