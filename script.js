document.addEventListener('DOMContentLoaded', function () {
    const cells = document.querySelectorAll('.cell');
    const message = document.querySelector('.message');
    const resetButton = document.querySelector('.reset-button');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Function to handle cell click event
    function cellClick(cell, index) {
        if (gameBoard[index] === '' && gameActive) {
            cell.textContent = currentPlayer;
            gameBoard[index] = currentPlayer;
            cell.classList.add('occupied');
            checkWinner();
            togglePlayer();
        }
    }

    // Function to toggle between players (X and O)
    function togglePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s Turn`;
    }

    // Function to check for a winner or a draw
    function checkWinner() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                message.textContent = `Player ${currentPlayer} wins!`;
                cells[a].classList.add('win');
                cells[b].classList.add('win');
                cells[c].classList.add('win');
                alert(`Player ${currentPlayer} wins!`);
                return;
            }
        }

        if (!gameBoard.includes('')) {
            gameActive = false;
            message.textContent = "It's a draw!";
            alert("It's a draw!");
        }
    }

    // Function to reset the game
    function resetGame() {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        message.textContent = `Player ${currentPlayer}'s Turn`;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('occupied', 'win');
        });
    }

    // Add click event listeners to cells
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => cellClick(cell, index));
    });

    // Add click event listener to reset button
    resetButton.addEventListener('click', resetGame);
});
