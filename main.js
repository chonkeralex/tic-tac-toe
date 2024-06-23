const createPlayers = function(name, symbol) {
    return {
        name : name,
        symbol: symbol
    }
}

const boardDimensions = function(row, col) {
    return {
        row: row,
        col: col
    }
}

const player1= createPlayers("player1", "X")
const player2 = createPlayers("player2", "O")
let curent = player1

const togglePlayers = function() {
    curent = curent === player1 ? player2 : player1
}

const dimensions = boardDimensions(3, 3)
    
let boardState = Array.from({ length: 3 }, () => Array(3).fill(null));
const win = function(boardState, symbol) {
    for(let i = 0; i < 3; i++) {
        if(boardState[i][0] === symbol && boardState[i][1] === symbol && boardState[i][2] === symbol) {
            return true
        }
    }

    for(let j = 0; j < 3; j++) {
        if(boardState[0][j] === symbol && boardState[1][j] === symbol && boardState[2][j] === symbol) {
            return true
        }
    }
    
    if(boardState[0][0] === symbol && boardState[1][1] === symbol && boardState[2][2] === symbol) {
        return true
    }

    if(boardState[0][2] === symbol && boardState[1][1] === symbol && boardState[2][0] === symbol) {
        return true
    }
    return false
}

const checkTie = function(boardState) {
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(boardState[i][j] === null) {
                return false
            }
        }
    }
    return true
}

const gameboard = function(dimensions) {
    const board = []
    const container = document.querySelector("#container")
    container.innerHTML = ""
    for(let i = 0; i < dimensions.row; i++) {
        for(let j = 0; j < dimensions.col; j++) {
            const cell = document.createElement("div")
            cell.classList.add("board")
            cell.addEventListener("click", () => {
                if(!boardState[i][j]) {
                    cell.textContent = curent.symbol
                    boardState[i][j] = curent.symbol
                    if(win(boardState, curent.symbol)) {
                        alert(`${curent.name} wins`)
                        container.innerHTML = ""
                    } else if(checkTie(boardState)) {
                        alert("tie")
                    } else {
                        togglePlayers()
                    }
                }
            })
            board.push(cell)
            container.appendChild(cell)
        }
    }
    return board
    
}

document.addEventListener("DOMContentLoaded", gameboard(dimensions))