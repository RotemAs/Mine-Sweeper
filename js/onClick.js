'user strict'

function onClickCell(i, j, bEvent) {
    if (gGame.isOn === true) {
        if (!gGame.isHint) {
            //not hint mode 
            if ((bEvent.button === 0 || bEvent.button === 1)) {

                if (gGame.isFlagStat === false && gBord[i][j].isShown === false && gBord[i][j].isMarked === false) {
                    gGame.clickCunt++
                        //     console.log('onclick gGame.shownCount++:', gGame.shownCount++)
                        if (gGame.clickCunt <= 1 && gBord[i][j].isMine === true) {
                            firstIsMine(i, j, bEvent)

                        } else
                    if (gBord[i][j].isEmpty && gBord[i][j].isMarked === false) {
                        //when clickd on empty cell 
                        gBord[i][j].cellBekColor = 'rgb(158, 158, 149)'
                        gBord[i][j].cellText = EMPTY
                        gBord[i][j].isShown = true
                        gGame.shownCount++
                            // buildHistoryBoard()
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
                            // buildHistoryBoard()
                        gGame.shownCount++

                            gBord[i][j].cellTextColor = 'red'
                        minesRemaining--
                        gGame.hiddenMinsCount--
                            gGame.livesCunt--


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
                            // buildHistoryBoard()

                        gGame.shownCount++

                            checkGameOver()
                        renderBoard(gBord)

                    }
                    // console.log('clickcunt', gGame.clickCunt, '\n firstLoc :', firstLoc)
                } else if (gGame.isFlagStat === true && gBord[i][j].isShown === false) {
                    //if mark flag

                    if (gGame.markedCount >= crrLavel.MINES) {
                        //no more flags to go 

                        if (gBord[i][j].isMarked = false && gBord[i][j].isShown === false) {
                            //if need to del
                            // putFlgs(i, j, bEvent, true)

                            // checkGameOver()
                            // renderBoard(gBord)
                            // console.log('NO More Flags :', 'i' + i, 'j' + j, 'gBord[i][j].isMarked', gBord[i][j].isMarked, '\n|| gGame.markedCount', gGame.markedCount)
                            // console.log('no flags opsion ')

                        } else if (gBord[i][j].isMarked = true) {
                            putFlgs(i, j, bEvent, true)
                                // console.log('else if check ', 'minesRemaining', minesRemaining, 'markedCount', gGame.markedCount)

                        }

                    } else if (gBord[i][j].isMarked === false) {
                        // console.log('if true test ')
                        //if can be markd 
                        putFlgs(i, j, bEvent, true)

                        // console.log('onClikGenera  mark flag')
                        checkGameOver()
                        renderBoard(gBord)
                    } else if (gBord[i][j].isMarked = true && gBord[i][j].isShown === false) {
                        //if need to del
                        putFlgs(i, j, bEvent, true)
                            // console.log('onkclick del. flag ')

                        checkGameOver()
                        renderBoard(gBord)

                    }


                }

                // buildHistoryBoard()

            } else if (bEvent.button === 2 && gBord[i][j].isShown === false) {

                if (gGame.markedCount < crrLavel.MINES) {
                    putFlgs(i, j, bEvent, false)
                        // console.log('if true else test ')
                } else {
                    alert('no more flags ')
                }


            }
        } else if (gGame.hintCount < crrLavel.HINTS) {

            //hint mode 
            gGame.hintCount++

                hintLoop(gBord, i, j)
                // setTimeout((outHint(gBord, i, j)), 10000)
            setTimeout(() => { outHint(gBord, i, j) }, 1000);

            // console.log('is hint mode in if ', gGame.hintCount, '||  \n crrLavel.HINTS', crrLavel.HINTS)
        }
    }
    // console.log('gGame', gGame)
}