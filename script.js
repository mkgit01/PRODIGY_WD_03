document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const resetBtn = document.getElementById('resetBtn');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return null;
    };

    const checkTie = () => {
        return gameBoard.every(cell => cell !== '');
    };

    const updateStatus = () => {
        const winner = checkWinner();

        if (winner) {
            status.textContent = `${winner} wins!`;
            gameActive = false;
        } else if (checkTie()) {
            status.textContent = "It's a tie!";
            gameActive = false;
        } else {
            status.textContent = `Current player: ${currentPlayer}`;
        }
    };

    const handleCellClick = (index) => {
        if (gameBoard[index] || !gameActive) {
            return;
        }

        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        
        const winner = checkWinner();
        if (winner) {
            status.textContent = `${winner} wins!`;
            gameActive = false;
        } else if (checkTie()) {
            status.textContent = "It's a tie!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateStatus();
        }
    };

    const handleResetClick = () => {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        gameActive = true;
        status.textContent = `Current player: ${currentPlayer}`;
    };

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
    });

    resetBtn.addEventListener('click', handleResetClick);

    updateStatus();
});
