'user strict'
const MINE = '⚙'
const Flag = '🚩'
const EMPTY = ' '



var gBord = []
var privewBord = []
var historyBord = []

var firstLoc;
var needRecla = false

var minesRemaining = 0

var timer = 0;
var timeout;
//ggame arry 
var gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        MinsCount: 0,
        hiddenMinsCount: 0,
        isFlagStat: false,
        isHint: false,
        hintCount: 0,
        clickCunt: 0,
        livesCunt: 0,
        score: 0,
        safeClickCount: 0,
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

var gMessages = [{
        messageID: 1,
        messageBudy: 'Game Over!!!',
        backgroundColor: 'red',


    },
    {
        messageID: 2,
        messageBudy: 'you win !! ',
        backgroundColor: 'green',
    },
    {
        messageID: 3,
        messageBudy: 'no more safe clicks ',
        backgroundColor: 'red',
    },
    {
        messageID: 4,
        messageBudy: 'you have no more Hints ',
        backgroundColor: 'red',
    }


]

var crrLavel = gLavel[0]