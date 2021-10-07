'user strict'

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
            // console.log('fahetr:', 'i+j ', i, ':', j, '|| me:', i, ':', j, '\n count ', count)
            // console.log(gBord[i][j])
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
            // console.log('clickcunt', gGame.clickCunt, '\n firstLoc :', firstLoc)
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
        // console.log('hint loop colors if -')
    }
}

function hintClick() {
    if (gGame.isHint === false && gGame.hintCount < crrLavel.HINTS) {
        gGame.isHint = true
        document.getElementById('hints').style.backgroundColor = 'rgb(243, 12, 231)';
        privewBord = gBord

    } else if (gGame.isHint === false) {
        console.log('you have no more hints')
        alert('you have no more hints')
    } else {
        gGame.isHint = false
        document.getElementById('hints').style.backgroundColor = 'rgb(224, 243, 240)'
    }
    // console.log('ishint', gGame.isHint)
    //for no life /document.getElementById('hints').style.backgroundColor = 'rgb(158, 158, 149)'
}

// onClickCell(i, j, bEvent)



function outHint(mat, rowIdx, colIdx) {
    // console.log('in outHint')
    // console.log('befor cenges \n', 'gBord', gBord, '\n', 'privewBord', privewBord)
    // gBord = privewBord
    // console.log('after cenges \n', 'gBord', gBord, '\n', 'privewBord', privewBord)
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > mat.length - 1) {
            continue
        }
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > mat[0].length - 1) {
                continue
            }
            count++
            // console.log(gBord[i][j])
            if (gBord[i][j].isShown) {
                if (gBord[i][j].isEmpty) {

                    gBord[i][j].cellText = EMPTY
                    hintLoopColors(i, j, 0)
                }
                console.log('fahetr:', 'i+j ', i, ':', j, '|| me:', i, ':', j, '\n count ', count)
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




            // console.log('clickcunt', gGame.clickCunt, '\n firstLoc :', firstLoc)
        }


    }
    var res = crrLavel.HINTS - gGame.hintCount
    var buttenText = '💡 :' + res
    renderTop('hintsDisply', buttenText)
    gGame.isHint = false
    document.getElementById('hints').style.backgroundColor = 'rgb(224, 243, 240)'

    renderBoard(gBord)
        // console.log('hint cuont :', gGame.hintCount)
}