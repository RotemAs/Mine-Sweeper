'user strict'

function initGame() {
    gGame.isOn = true
    gGame.hiddenMinsCount = crrLavel.MINES
    gGame.livesCunt = crrLavel.LIVES
    gBord = buildBoard()
    printMat(gBord, '.board-container')
    placeMines(gBord)
    setMinesNegsCount(gBord)
    renderBoard(gBord)
    startTimer()
    needRecla = false
    minesRemaining = crrLavel.LIVES
    privewBord = gBord
    hide('#scorBord')
    scoreBarUpdate()

}

function remainMinesOnBord() {
    var text1 = MINE + '  ' + gGame.hiddenMinsCount
    buttenId1 = 'minesRemain'
    renderTop(buttenId1, text1)
    var text2 = 'Life : ' + gGame.livesCunt
    buttenId2 = 'glife'
    renderTop(buttenId2, text2)

}

function scoreCheck() {

    for (var dxi = 0; dxi < gBord.length; dxi++) {
        for (var dxj = 0; dxj < gBord.length; dxj++) {
            if (gBord[dxi][dxj].isMine && gBord[dxi][dxj].isMarked) {
                gGame.score++

            }
        }

    }

    document.getElementById("scorBord").innerHTML = 'score :' + gGame.score
    localstoregHandell(gGame.score)


}



function localstoregHandell(score) {
    if (localStorage.score < score || localStorage.length === 0) {
        localStorage.setItem("score", score);
    }
}

function placeMines(mat) {

    if (needRecla === false) {
        for (var i = 0; i < crrLavel.MINES; i++) {
            var dxi = getRandomInt(0, crrLavel.SIZE)
            var dxj = getRandomInt(0, crrLavel.SIZE)
            if (gBord[dxi][dxj].isMine === false) {
                gBord[dxi][dxj].isMine = true
                gBord[dxi][dxj].isEmpty = false

                gGame.MinsCount++


            } else {


                i--

            }




            remainMinesOnBord()
        }

    } else if (needRecla === true) {
        for (var i = 0; i < crrLavel.MINES; i++) {
            var dxi = getRandomInt(0, crrLavel.SIZE)
            var dxj = getRandomInt(0, crrLavel.SIZE)
            if (gBord[dxi][dxj].isMine === false) {
                gBord[dxi][dxj].isMine = true
                gBord[dxi][dxj].isEmpty = false
            } else {
                i--
            }

        }
    }


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
        cellTextColor: 'black',
        cellText: '',
        cellID: 'i' + i + 'j' + j

    }
    return privetCell
}

function printMat(mat, selector) {
    var strHTML = '<table border="5" id="printmet" align="center" ><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';

        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];
            var className = 'cell cell' + i + '-' + j;
            strHTML += '<td class="' + className + '"> ' + ' </td>'
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;

}

function setMinesNegsCount(board) {
    for (var i = 0; i < crrLavel.SIZE; i++) {
        for (var j = 0; j < crrLavel.SIZE; j++) {
            if (board[i][j].isMine) {

                updateNebers(gBord, i, j)
            }

        }
    }

}

function updateNebers(mat, rowIdx, colIdx) {
    countTest = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > mat.length - 1) {
            continue
        }
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > mat[0].length - 1) {
                continue
            }


            if (mat[i][j].isMine === false) {

                mat[i][j].haveNeighbor = true

                mat[i][j].isEmpty = false
                mat[i][j].minesAroundCount++

                    numdersColor(mat[i][j].minesAroundCount, i, j)
                countTest++
            }
        }
    }

}


//chenge color for numbers nibers to mine 
function numdersColor(number, i, j) {
    if (number === 1) {

        gBord[i][j].cellTextColor = 'rgb(0, 255, 13)'
    } else if (number === 2) {
        gBord[i][j].cellTextColor = 'rgb(255, 230, 0)'
    } else if (number === 3) {
        gBord[i][j].cellTextColor = 'rgb(255, 0, 0)'
    } else {
        gBord[i][j].cellTextColor = 'rgb(16, 16, 218)'
    }


}


function putFlgs(i, j, bEvent, flagStatosReq) {
    if (gGame.isFlagStat === flagStatosReq) {
        //if mark flag 
        if (gBord[i][j].isMarked === false) {
            gBord[i][j].isMarked = true
            gBord[i][j].cellText = Flag
            gGame.markedCount++

                checkGameOver()
            renderBoard(gBord)
        } else if (gBord[i][j].isMarked = true) {

            gBord[i][j].isMarked = false
            gBord[i][j].cellText = ' '
            gGame.markedCount--

                checkGameOver()
            renderBoard(gBord)

        } else {
            alert('no more flags ')
        }
    }
}

//flagWalkAround
//the butten
function flagButtenOnclick() {
    if (gGame.isFlagStat === true) {
        gGame.isFlagStat = false
        document.getElementById('flagButten').style.backgroundColor = ' rgb(224, 243, 240)';

    } else if (gGame.isFlagStat === false) {
        gGame.isFlagStat = true
        document.getElementById('flagButten').style.backgroundColor = 'rgb(243, 12, 231)';

    }
}

function checkGameOver() {
    if (gGame.livesCunt === 0) {
        //ADD EXPOSE ALL        
        gGame.isOn = false
        document.getElementById('idsmiley').innerText = '🤯'
        exposeMines()
        renderBoard(gBord)
        stopTimer()
        scoreCheck()
        show('#scorBord')
        messageSelect(1)
    }
    checkWin()


}

function exposeMines() {
    for (var dxi = 0; dxi < gBord.length; dxi++) {
        for (var dxj = 0; dxj < gBord.length; dxj++) {
            if (gBord[dxi][dxj].isMine && gBord[dxi][dxj].isMarked === false) {
                gBord[dxi][dxj].cellBekColor = 'rgb(158, 158, 149)'
                gBord[dxi][dxj].cellText = MINE
                gBord[dxi][dxj].isShown = true
            }
        }

    }
    renderBoard(gBord)
}


function checkWin() {
    var rowsize = crrLavel.SIZE
    var cellAmunt = rowsize * rowsize
    var mineUnrevil = gGame.hiddenMinsCount
    if ((cellAmunt - mineUnrevil === gGame.shownCount) && (gGame.markedCount + gGame.shownCount === cellAmunt)) {
        stopTimer()
        renderBoard(gBord)
        messageSelect(2)
        scoreCheck()
        show('#scorBord')
        document.getElementById('idsmiley').innerText = '😎'
    }


}

function restartGame() {
    gBord = []
    TestCunt = 0
    firstLoc = null
    needRecla = false
    minesRemaining = crrLavel.LIVES
    gGame.isOn = false,
        gGame.shownCount = 0,
        gGame.markedCount = 0,
        gGame.MinsCount = 0,
        gGame.hiddenMinsCount = 0,

        gGame.isFlagStat = false,
        gGame.isHint = false,
        gGame.hintCount = 0,
        gGame.clickCunt = 0,
        gGame.livesCunt = 0,
        gGame.score = 0
    historyBord = []
    resetTimer()
    initGame()
}

function hintLoop(mat, rowIdx, colIdx) {
    count = 0

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > mat.length - 1) {
            continue
        }
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > mat[0].length - 1) {
                continue
            }
            count++

            if (gBord[i][j].isMine) {
                hintLoopColors(i, j, 1)
                gBord[i][j].cellText = MINE
                renderBoard(gBord)
            } else if (gBord[i][j].haveNeighbor === true) {
                hintLoopColors(i, j, 1)
                gBord[i][j].cellText = gBord[i][j].minesAroundCount
                renderBoard(gBord)
            } else if (gBord[i][j].isEmpty) {
                //when clickd on empty cell 
                gBord[i][j].cellText = '*'
                hintLoopColors(i, j, 1)
                renderBoard(gBord)


            }

        }


    }


}

function hintLoopColors(i, j, openClose) {
    if (gBord[i][j].isShown === false) {
        if (openClose === 1) {
            gBord[i][j].cellBekColor = 'rgb(255, 255, 210)'
        } else if (openClose === 0) {
            gBord[i][j].cellBekColor = 'white'
        }

    }
}

function hintClick() {
    if (gGame.isHint === false && gGame.hintCount < crrLavel.HINTS) {
        gGame.isHint = true
        document.getElementById('hints').style.backgroundColor = 'rgb(243, 12, 231)';
        privewBord = gBord

    } else if (gGame.isHint === false) {
        messageSelect(4)

    } else {
        gGame.isHint = false
        document.getElementById('hints').style.backgroundColor = 'rgb(224, 243, 240)'
    }

}





function outHint(mat, rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > mat.length - 1) {
            continue
        }
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > mat[0].length - 1) {
                continue
            }
            count++

            if (gBord[i][j].isShown) {
                if (gBord[i][j].isEmpty) {

                    gBord[i][j].cellText = EMPTY
                    hintLoopColors(i, j, 0)
                }

            } else {
                if (gBord[i][j].isMine) {
                    hintLoopColors(i, j, 0)
                    gBord[i][j].cellText = EMPTY

                } else if (gBord[i][j].haveNeighbor === true) {
                    hintLoopColors(i, j, 0)
                    gBord[i][j].cellText = EMPTY

                } else if (gBord[i][j].isEmpty) {

                    gBord[i][j].cellText = EMPTY
                    hintLoopColors(i, j, 0)
                }


            }





        }


    }
    var res = crrLavel.HINTS - gGame.hintCount
    var buttenText = '💡 :' + res
    renderTop('hintsDisply', buttenText)
    gGame.isHint = false
    document.getElementById('hints').style.backgroundColor = 'rgb(224, 243, 240)'

    renderBoard(gBord)

}


function safeClick() {
    i = getRandomInt(0, crrLavel.SIZE)
    j = getRandomInt(0, crrLavel.SIZE)
    if (gGame.safeClickCount < 3) {
        if (!gBord[i][j].isMine && !gBord[i][j].isShown) {

            var oldColor = gBord[i][j].cellBekColor
            gBord[i][j].cellBekColor = 'red'
            renderBoard(gBord)
            setTimeout(function() {
                gBord[i][j].cellBekColor = 'white'

                renderBoard(gBord)
                gGame.safeClickCount++
            }, 1000)



        }

    } else {
        messageSelect(3)
    }


}

function renderTop(buttenId, text) {
    document.getElementById(buttenId).innerText = text
}

function emptyCellExpand(mat, rowIdx, colIdx) {
    countTest = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > mat.length - 1) {
            continue
        }
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > mat[0].length - 1) {
                continue
            }


            if (mat[i][j].isMine === false && mat[i][j] != mat[rowIdx][colIdx] && gBord[i][j].isShown === false && gBord[i][j].isMarked === false) {
                if (gBord[i][j].haveNeighbor) {
                    gBord[i][j].cellBekColor = 'rgb(158, 158, 149)'
                    gBord[i][j].cellText = gBord[i][j].minesAroundCount
                    gBord[i][j].isShown = true
                    gGame.shownCount++


                } else if (gBord[i][j].isEmpty && gBord[i][j].isShown !== true) {
                    gBord[i][j].cellBekColor = 'rgb(158, 158, 149)'
                    gBord[i][j].isShown = true
                    gGame.shownCount++
                        emptyCellExpand(mat, i, j)


                }



                countTest++

            }
        }
    }


}


function firstIsMine(i, j, bEvent) {
    firstLoc = {
        fi: i,
        fj: j
    }
    needRecla = true
    gBord[i][j].isMine = false
    initGame()
    onClickCell(i, j, bEvent)


}