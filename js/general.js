
const MINE = '⚙'
const Flag = '🇦🇼'
const EMPTY = ' '



var gBord = []
var TestCunt = 0



var timer = 0;
var timeout;
var minesRemaining;
//ggame arry 
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
// lavale arry 
var gLavel = [{
    SIZE: 4,
    MINES: 2,
    description: 'Beginner'

},
{
    SIZE: 8,
    MINES: 12,
    description: 'Medium'
},
{
    SIZE: 12,
    MINES: 30,
    description: 'Expert'
}]



var crrLavel = gLavel[0]





function initGame() {

    gGame.isOn = true

    gBord = buildBoard()
    console.log(gBord)
    printMat(gBord, '.board-container')
    placeMines(gBord)
    setMinesNegsCount(gBord)
    renderBoard(gBord)
    console.log('after initGame renderBoard', gBord)


}



function buildBoard() {
    var board = [];
    for (var i = 0; i < crrLavel.SIZE; i++) {
        board.push([]);
        for (var j = 0; j < crrLavel.SIZE; j++) {
            board[i][j] = buildCell(i, j)
            if (i === 0 || i === crrLavel.SIZE - 1 ||
                j === 0 || j === crrLavel.SIZE - 1 ||
                (j === 3 && i > 4 && i < crrLavel.SIZE - 2)) {
                board[i][j] = buildCell(i, j)


            }
        }
    }
    return board;
}
function buildCell(i, j) {
    privetCell = {
        matrix: i + ' : ' + j,
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
        isEmpty: true,
        haveNeighbor: false,
        cellBekColor: 'white',
        cellText: '',
        


    }
    return privetCell
}

// gBord[1][1].isMine = true
function placeMines(mat){
    for(var i = 0;i < crrLavel.MINES ;i++){
        var dxi=getRandomInt(0,crrLavel.MINES)
        var dxj=getRandomInt(0,crrLavel.MINES)
        // console.log(dxj,':',dxi)
        gBord[dxi][dxj].isMine = true
        // console.log('TEST100',gBord[dxi][dxj])
        
        console.log('placeMines ','locatsion: ',dxi,':',dxj,'crrlavelMINES:',crrLavel.MINES)

    }
}


// all nabers "haveNeighbor:" prameter is true 
function setMinesNegsCount(board) {
    for (var i = 0; i < crrLavel.SIZE; i++) {
        for (var j = 0; j < crrLavel.SIZE; j++) {
            if (board[i][j].isMine) {
                // console.log('setMinesNegsCount  :',i,' :',j)
                updateNebers(gBord, i, j)
            }

        }
    }

}

function onClickCell(i, j) {
    if (gBord[i][j].isEmpty) {
        gBord[i][j].cellBekColor = 'rgb(158, 158, 149)'
        gBord[i][j].cellText = EMPTY

        renderBoard(gBord)
    }
    if (gBord[i][j].isMine) {
        gBord[i][j].cellBekColor = 'rgb(158, 158, 149)'
        gBord[i][j].cellText = MINE

        renderBoard(gBord)
    }
    if (gBord[i][j].haveNeighbor === true) {
        gBord[i][j].cellBekColor = 'rgb(158, 158, 149)'
        gBord[i][j].cellText = gBord[i][j].minesAroundCount


        renderBoard(gBord)
       
    }
    


    console.log('ifs: ',gBord)

    // }


}



// function cellClicked(elCell, i, j) {
//     if(gBord[i][j].isMine && gBord[i][j].isShown){
//         renderCell(i,j,MINE)
//     }


// }

function cellClicked(elCell, i, j) {
    if (gGame.isOn) {
        if (ctrlIsPressed) {
            handleCtrlClick(id);
        }
    }
}

function cellMarked(elCell) {

}
function checkGameOver() {

}
function expandShown(board, elCell, i, j) {

}