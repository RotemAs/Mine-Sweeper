const MINE = '⚙'
const Flag = '🚩'
const EMPTY = ' '



var gBord = []
var privewBord = []

var firstLoc;
var needRecla = false


var timer = 0;
var timeout;
//ggame arry 
var gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        hiddenMinsCount: 0,
        secsPassed: 0,
        clickCunt: 0,
        isFlagStat: false,
        isHint: false,
        hintCount: 0,


    }
    // lavale arry 
var gLavel = [{
        SIZE: 4,
        MINES: 2,
        HINTS: 3,
        LIVES: 3,
        description: 'Beginner'

    },
    {
        SIZE: 8,
        MINES: 12,
        HINTS: 3,
        LIVES: 3,
        description: 'Medium'
    },
    {
        SIZE: 12,
        MINES: 30,
        HINTS: 3,
        LIVES: 3,
        description: 'Expert'
    }
]

var crrLavel = gLavel[0]
    // var minesRemaining = crrLavel.MINES
var minesRemaining = 3


// console.log('crrlavel',crrLavel)


function initGame() {

    gGame.isOn = true
    gGame.hiddenMinsCount = crrLavel.MINES
    gGame.markedCount = crrLavel.MINES

    gBord = buildBoard()
    printMat(gBord, '.board-container')

    placeMines(gBord)
    setMinesNegsCount(gBord)
    renderBoard(gBord)
    startTimer()
    privewBord = gBord


    console.log('after initGame renderBoard', gBord)
    console.log('privewBord', privewBord)

}

function remainMinesOnBord() {
    var text1 = MINE + '  ' + gGame.markedCount
    buttenId1 = 'minesRemain'
        // console.log('rensTop text' + text + '\n minesRemain :' + buttenId)
    renderTop(buttenId1, text1)
    var text2 = 'Life : ' + minesRemaining
    buttenId2 = 'glife'
    renderTop(buttenId2, text2)

}