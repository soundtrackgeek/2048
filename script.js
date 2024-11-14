class Game2048 {
    constructor() {
        this.grid = Array(4).fill().map(() => Array(4).fill(0));
        this.score = 0;
        this.bestScore = parseInt(localStorage.getItem('bestScore')) || 0;
        this.gameOver = false;
        this.tileContainer = document.querySelector('.tile-container');
        this.scoreDisplay = document.getElementById('score');
        this.bestScoreDisplay = document.getElementById('best-score');
        
        this.init();
    }

    init() {
        // Clear the grid
        this.grid = Array(4).fill().map(() => Array(4).fill(0));
        this.score = 0;
        this.gameOver = false;
        this.updateScore();
        
        // Clear the tile container
        this.tileContainer.innerHTML = '';
        
        // Add initial tiles
        this.addRandomTile();
        this.addRandomTile();
        
        // Add event listeners
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
        document.getElementById('new-game').addEventListener('click', () => this.init());
    }

    addRandomTile() {
        const emptyCells = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.grid[i][j] === 0) {
                    emptyCells.push({ x: i, y: j });
                }
            }
        }

        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            const value = Math.random() < 0.9 ? 2 : 4;
            this.grid[randomCell.x][randomCell.y] = value;
            this.createTileElement(randomCell.x, randomCell.y, value, true);
        }
    }

    createTileElement(x, y, value, isNew = false) {
        const tile = document.createElement('div');
        tile.className = `tile tile-${value}${isNew ? ' tile-new' : ''}`;
        tile.textContent = value;
        tile.style.transform = `translate(${y * 115}px, ${x * 115}px)`;
        this.tileContainer.appendChild(tile);
    }

    updateScore() {
        this.scoreDisplay.textContent = this.score;
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem('bestScore', this.bestScore);
            this.bestScoreDisplay.textContent = this.bestScore;
        }
    }

    handleKeyPress(event) {
        if (this.gameOver) return;

        let moved = false;
        const oldGrid = JSON.stringify(this.grid);

        switch(event.key) {
            case 'ArrowUp':
                moved = this.moveUp();
                break;
            case 'ArrowDown':
                moved = this.moveDown();
                break;
            case 'ArrowLeft':
                moved = this.moveLeft();
                break;
            case 'ArrowRight':
                moved = this.moveRight();
                break;
            default:
                return;
        }

        if (moved) {
            this.tileContainer.innerHTML = '';
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (this.grid[i][j] !== 0) {
                        this.createTileElement(i, j, this.grid[i][j]);
                    }
                }
            }
            this.addRandomTile();
            
            if (this.isGameOver()) {
                this.gameOver = true;
                alert('Game Over! Press New Game to try again.');
            }
        }
    }

    moveRow(row) {
        let arr = row.filter(x => x !== 0);
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] === arr[i + 1]) {
                arr[i] *= 2;
                this.score += arr[i];
                arr.splice(i + 1, 1);
            }
        }
        while (arr.length < 4) {
            arr.push(0);
        }
        return arr;
    }

    moveLeft() {
        let moved = false;
        for (let i = 0; i < 4; i++) {
            const oldRow = [...this.grid[i]];
            this.grid[i] = this.moveRow(this.grid[i]);
            if (JSON.stringify(oldRow) !== JSON.stringify(this.grid[i])) {
                moved = true;
            }
        }
        this.updateScore();
        return moved;
    }

    moveRight() {
        let moved = false;
        for (let i = 0; i < 4; i++) {
            const oldRow = [...this.grid[i]];
            this.grid[i] = this.moveRow(this.grid[i].reverse()).reverse();
            if (JSON.stringify(oldRow) !== JSON.stringify(this.grid[i])) {
                moved = true;
            }
        }
        this.updateScore();
        return moved;
    }

    moveUp() {
        let moved = false;
        for (let j = 0; j < 4; j++) {
            const column = this.grid.map(row => row[j]);
            const oldColumn = [...column];
            const newColumn = this.moveRow(column);
            
            if (JSON.stringify(oldColumn) !== JSON.stringify(newColumn)) {
                moved = true;
                for (let i = 0; i < 4; i++) {
                    this.grid[i][j] = newColumn[i];
                }
            }
        }
        this.updateScore();
        return moved;
    }

    moveDown() {
        let moved = false;
        for (let j = 0; j < 4; j++) {
            const column = this.grid.map(row => row[j]).reverse();
            const oldColumn = [...column];
            const newColumn = this.moveRow(column).reverse();
            
            if (JSON.stringify(oldColumn) !== JSON.stringify(newColumn)) {
                moved = true;
                for (let i = 0; i < 4; i++) {
                    this.grid[i][j] = newColumn[i];
                }
            }
        }
        this.updateScore();
        return moved;
    }

    isGameOver() {
        // Check for empty cells
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.grid[i][j] === 0) return false;
            }
        }

        // Check for possible merges
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const current = this.grid[i][j];
                // Check right neighbor
                if (j < 3 && current === this.grid[i][j + 1]) return false;
                // Check bottom neighbor
                if (i < 3 && current === this.grid[i + 1][j]) return false;
            }
        }

        return true;
    }
}

// Start the game when the page loads
window.onload = () => {
    new Game2048();
};
