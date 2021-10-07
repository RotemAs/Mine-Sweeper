'user strict'




function onClickCell(i, j, bEvent) {
    if (!gGame.isHint) {
        //not hint mode 
        if ((bEvent.button === 0 || bEvent.button === 1)) {

            if (gGame.isFlagStat === false && gBord[i][j].isShown === false) {
                gGame.clickCunt++
                    //     console.log('onclick gGame.shownCount++:', gGame.shownCount++)
                    if (gGame.clickCunt <= 1 && gBord[i][j].isMine === true) {
                        firstIsMine(i, j, bEvent)

                    } else
                if (gBord[i][j].isEmpty) {
                    //when clickd on empty cell 
                    gBord[i][j].cellBekColor = 'rgb(158, 158, 149)'
                    gBord[i][j].cellText = EMPTY
                    gBord[i][j].isShown = true
                    gGame.shownCount++

                        emptyCellExpand(gBord, i, j)

                    renderBoard(gBord)

                    checkGameOver()
                } else if (gBord.clickCunt <= 1 && gBord[i][j].isMine === true) {

                    needRecla = true
                        // placeMines(gBord)
                        // setMinesNegsCount(gBord)

                    // renderBoard(gBord)

                } else if (gBord[i][j].isMine && gBord[i][j].isShown === false) {
                    //mine clickd 
                    gBord[i][j].cellBekColor = 'rgb(158, 158, 149)'
                    gBord[i][j].cellText = MINE
                    gBord[i][j].isShown = true
                    gGame.shownCount++

                        gBord[i][j].cellTextColor = 'red'
                    minesRemaining--
                    gGame.hiddenMinsCount--
                        // need check
                        // gGame.markedCount--

                        // console.log('minesRemaining', minesRemaining, '||gGame.hiddenMinsCount', gGame.hiddenMinsCount, ' \ngGame.markedCount', gGame.markedCount)
                        // console.log('8gGame.shownCount :', gGame.shownCount)

                        remainMinesOnBord()
                    renderBoard(gBord)
                    checkGameOver()
                } else if (gBord[i][j].haveNeighbor === true) {
                    //havenibor clickd
                    gBord[i][j].cellBekColor = 'rgb(158, 158, 149)'
                    gBord[i][j].cellText = gBord[i][j].minesAroundCount
                    gBord[i][j].isShown = true

                    gGame.shownCount++

                        checkGameOver()
                    renderBoard(gBord)

                }
                // console.log('clickcunt', gGame.clickCunt, '\n firstLoc :', firstLoc)
            } else if (gGame.isFlagStat === true && gBord[i][j].isShown === false) {
                //if mark flag 
                if (gBord[i][j].isShown === false && gGame.markedCount > 0 && gBord[i][j].isMarked === false) {
                    gBord[i][j].isMarked = true
                    gBord[i][j].cellText = Flag
                    gGame.markedCount--
                        console.log('flag PUT:', 'i' + i, 'j' + j, 'gBord[i][j].isMarked', gBord[i][j].isMarked, '\n|| gGame.markedCount', gGame.markedCount)
                    checkGameOver()
                    renderBoard(gBord)
                } else if (gBord[i][j].isMarked = true && gBord[i][j].isShown === false) {
                    gBord[i][j].isMarked = false
                    gBord[i][j].cellText = ' '
                    gGame.markedCount++
                        console.log('flag DEL:', 'i' + i, 'j' + j, 'cunt flag', gGame.markedCount, '\n|| gGame.markedCount', gGame.markedCount)

                    checkGameOver()
                    renderBoard(gBord)

                } else {
                    putFlgs(i, j, bEvent, true)
                }
            }

        } else if (bEvent.button === 2) {

            putFlgs(i, j, bEvent, false)
        }
    } else if (gGame.hintCount < 3) {
        //hint mode 
        gGame.hintCount++

            hintLoop(gBord, i, j)
            // setTimeout((outHint(gBord, i, j)), 10000)
        setTimeout(() => { outHint(gBord, i, j) }, 3000);

        // console.log('is hint mode in if ', gGame.isHint)
    }

}

function putFlgs(i, j, bEvent, flagStatosReq) {
    if (gGame.isFlagStat === flagStatosReq) {
        //if mark flag 
        if (gBord[i][j].isShown === false && gGame.markedCount > 0 && gBord[i][j].isMarked === false) {
            gBord[i][j].isMarked = true
            gBord[i][j].cellText = Flag
            gGame.markedCount--
                // console.log('flag PUT:', 'i' + i, 'j' + j, 'gBord[i][j].isMarked', gBord[i][j].isMarked, '\n|| gGame.markedCount', gGame.markedCount)
                checkGameOver()
            renderBoard(gBord)
        } else if (gBord[i][j].isMarked = true && gBord[i][j].isShown === false) {
            gBord[i][j].isMarked = false
            gBord[i][j].cellText = ' '
            gGame.markedCount++
                // console.log('flag DEL:', 'i' + i, 'j' + j, 'cunt flag', gGame.markedCount, '\n|| gGame.markedCount', gGame.markedCount)

                checkGameOver()
            renderBoard(gBord)

        }
    }
}


//flagWalkAround
//the butten
function flagButtenOnclick() {
    if (gGame.isFlagStat === true) {
        gGame.isFlagStat = false
        document.getElementById('flagButten').style.backgroundColor = ' rgb(224, 243, 240)';
        // console.log('inif L1 flag stat after ', gGame.isFlagStat)
    } else if (gGame.isFlagStat === false) {
        gGame.isFlagStat = true
        document.getElementById('flagButten').style.backgroundColor = 'rgb(243, 12, 231)';
        // console.log('inif L2 flag stat after ', gGame.isFlagStat)
    }
}

function renderBoard(board) {

    var strHTML = '<table border="5" id="printmet" align="center" ><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {

            var className = 'cell cell' + i + '-' + j;

            strHTML += '<td class="' + className + '" id = "' + board[i][j].cellID + '" oncontextmenu="event.preventDefault();"' +
                '"  onmouseup="onClickCell(' + i + ',' + j + ',event)" " style="background:' + board[i][j].cellBekColor + ';color:' + board[i][j].cellTextColor + ' " >' + gBord[i][j].cellText + ' </td>';


        }
        strHTML += '</tr>';
    }


    strHTML += '</tbody></table>';
    var elContainer = document.querySelector('.board-container');
    elContainer.innerHTML = strHTML;
    //  console.log('strHTML',strHTML)

}

function checkGameOver() {
    if (minesRemaining <= 0) {
        //ADD EXPOSE ALL        
        // document.getElementById('idsmiley').innerText = '🤯'
        // renderBoard(gBord)
        // console.log('game over ')
        // exposeMines()
        // stopTimer()
        // alert('game over - you lost ')

    }
    // checkWin()

}

function exposeMines() {
    for (var dxi = 0; dxi < gBord.length; dxi++) {
        for (var dxj = 0; dxj < gBord.length; dxj++) {
            if (gBord[dxi][dxj].isMine) {
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
    var mineUnrevil = gGame.hiddenMinsCount
        // console.log('rowsize :', rowsize, '|| mineUnrevil', mineUnrevil)
        // console.log('math :', rowsize * rowsize - mineUnrevil)
        // console.log('gGame.shownCount', gGame.shownCount)
    if (rowsize * rowsize - mineUnrevil === gGame.shownCount) {
        stopTimer()
        renderBoard(gBord)
            // alert('win')
    }
    document.getElementById('idsmiley').innerText = '😎'

}

function restartGame() {
    console.log('in restart')
    gBord = []
    TestCunt = 0
    firstLoc = null
    needRecla = false
    minesRemaining = 3
    gGame.isOn = false
    gGame.shownCount = 0
    gGame.markedCount = 0,
        gGame.hiddenMinsCount = 0,
        gGame.secsPassed = 0,
        gGame.clickCunt = 0,
        gGame.isFlagStat = false,

        console.log('restart game ')
    resetTimer()
    initGame()
}