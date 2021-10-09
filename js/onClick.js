'user strict'

function onClickCell(i, j, bEvent) {
    if (gGame.isOn === true) {
        if (!gGame.isHint) {
            //not hint mode 
            if ((bEvent.button === 0 || bEvent.button === 1)) {

                if (gGame.isFlagStat === false && gBord[i][j].isShown === false && gBord[i][j].isMarked === false) {
                    gGame.clickCunt++
                        if (gGame.clickCunt <= 1 && gBord[i][j].isMine === true) {
                            firstIsMine(i, j, bEvent)
                        } else
                    if (gBord[i][j].isEmpty && gBord[i][j].isMarked === false) {
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
                    } else if (gBord[i][j].isMine && gBord[i][j].isShown === false) {
                        //mine clickd 
                        gBord[i][j].cellBekColor = 'rgb(158, 158, 149)'
                        gBord[i][j].cellText = MINE
                        gBord[i][j].isShown = true
                            // buildHistoryBoard()
                        gGame.shownCount++
                            gBord[i][j].cellTextColor = 'red'
                        minesRemaining--
                        gGame.hiddenMinsCount--
                            gGame.livesCunt--
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
                } else if (gGame.isFlagStat === true && gBord[i][j].isShown === false) {
                    //if mark flag

                    if (gGame.markedCount >= crrLavel.MINES) {
                        //no more flags to go 

                        if (gBord[i][j].isMarked = false && gBord[i][j].isShown === false) {
                            //if need to del


                        } else if (gBord[i][j].isMarked = true) {
                            putFlgs(i, j, bEvent, true)

                        }

                    } else if (gBord[i][j].isMarked === false) {

                        //if can be markd 
                        putFlgs(i, j, bEvent, true)
                        checkGameOver()
                        renderBoard(gBord)
                    } else if (gBord[i][j].isMarked = true && gBord[i][j].isShown === false) {
                        //if need to del
                        putFlgs(i, j, bEvent, true)


                        checkGameOver()
                        renderBoard(gBord)

                    }

                }

                // buildHistoryBoard()

            } else if (bEvent.button === 2 && gBord[i][j].isShown === false) {
                if (gGame.markedCount < crrLavel.MINES) {
                    putFlgs(i, j, bEvent, false)
                } else {
                    alert('no more flags ')
                }
            }
        } else if (gGame.hintCount < crrLavel.HINTS) {
            //hint mode 
            gGame.hintCount++
                hintLoop(gBord, i, j)
            setTimeout(() => { outHint(gBord, i, j) }, 1000);
        }
    }

}