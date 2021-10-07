'user strict'

function placeMines(mat) {

    if (needRecla === false) {
        for (var i = 0; i < crrLavel.MINES; i++) {
            var dxi = getRandomInt(0, crrLavel.SIZE)
            var dxj = getRandomInt(0, crrLavel.SIZE)
            if (gBord[dxi][dxj].isMine === false) {
                gBord[dxi][dxj].isMine = true
                gBord[dxi][dxj].isEmpty = false
                    // console.log('gbord', gBord[dxi][dxj])
            } else {


                i--
                // console.log('afte duble : i', i, '|| locasion ', dxi, ':', dxj, '\n cunt ')
            }


            // console.log('TEST100',gBord[dxi][dxj])
            // console.log('placeMines ','locatsion: ',dxi,':',dxj,'crrlavelMINES:',crrLavel.MINES)
            // console.log('mine at :', dxi, ':', dxj)
            remainMinesOnBord()
        }

    } else if (needRecla === true) {
        for (var i = 0; i < crrLavel.MINES; i++) {
            var dxi = getRandomInt(0, crrLavel.SIZE)
            var dxj = getRandomInt(0, crrLavel.SIZE)
            if (gBord[dxi][dxj].isMine === false) {
                gBord[dxi][dxj].isMine = true
                gBord[dxi][dxj].isEmpty = false
                console.log('gbord', gBord[dxi][dxj])
            } else {

                // console.log('befor duble i :', i)
                // console.log('dobll random mine ', i, ':', j)

                i--
                console.log('afte duble : i', i, '|| locasion ', dxi, ':', dxj)
            }

        }
    }


}

// console.log('cell test ', firstLoc[i])

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
    // console.log(strHTML)
}

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

            // if (i !== 1 || j !== 1) continue
            // if(i !==2 || j !== 2) continue
            // console.log('mat[rowIdx][colIdx].isMine',mat[rowIdx][colIdx].isMine)
            // console.log('updat nabor',gBord)
            if (mat[i][j].isMine === false) {

                mat[i][j].haveNeighbor = true
                    // mat[i][j].isMine = false
                mat[i][j].isEmpty = false
                mat[i][j].minesAroundCount++
                    // console.log('prameters idx', rowIdx, '||', colIdx,'i:', i, '||j:', j,'countTest', countTest,'minecunt',mat[i][j].minesAroundCount)
                    numdersColor(mat[i][j].minesAroundCount, i, j)
                countTest++
            }
        }
    }

}

//chenge color for numbers nibers to mine 
function numdersColor(number, i, j) {
    if (number === 1) {
        // console.log('numberscolor',number,'|\n',i,'|',j)
        gBord[i][j].cellTextColor = 'rgb(0, 255, 13)'
    } else if (number === 2) {
        gBord[i][j].cellTextColor = 'rgb(255, 230, 0)'
    } else if (number === 3) {
        gBord[i][j].cellTextColor = 'rgb(255, 0, 0)'
    } else {
        gBord[i][j].cellTextColor = 'rgb(16, 16, 218)'
    }
    // console.log('cellcolor',gBord[i][j].cellTextColor,'cell i:j:',i,':',j)

}