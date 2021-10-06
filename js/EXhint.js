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


            console.log('cellsConteiner', cellsConteiner)
        }

    }


    //LOOP 2 
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > mat.length - 1) {
            continue
        }
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > mat[0].length - 1) {
                continue

            }
        }

    }
    // console.log('loop test :', i, ':', j, '|| count:', count)
    // count++
    // mat[i][j].isHint = true
    // mat[i][j].isShown = true
    // nClickHint(i, j, gBord)
    // gBord[i][j].memArr.push([memCell(i,j)])

    // renderBoard(gBord)

}

function hintClick() {
    if (gGame.isHint === false) {
        gGame.isHint = true
        document.getElementById('hints').style.backgroundColor = 'rgb(243, 12, 231)';
        privewBord = gBord

    } else {
        gGame.isHint = false
        document.getElementById('hints').style.backgroundColor = 'rgb(224, 243, 240)'
    }
    console.log('ishint', gGame.isHint)
        //for no life /document.getElementById('hints').style.backgroundColor = 'rgb(158, 158, 149)'
}

function outHint() {

}