'user strict'

// console.log('randominttest',getRandomInt(0,50))

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}



//   function endGame() {
//     gGame.isOn = false
//     // console.log('endGame|gGame.isOn',gGame.isOn)
//   }

function lavelOnClick(arryPlace) {

    crrLavel = gLavel[arryPlace]
    console.log('TEST 100  gLavel[arryPlace]', gLavel[arryPlace])

    restartGame()


}


function renderTop(buttenId, text) {
    document.getElementById(buttenId).innerText = text
}


var stopwatchTimer = document.getElementById('gtime');
var hr = 0;
var min = 0;
var sec = -1;
var stoptime = true;


function timerCycle() {
    if (stoptime == false) {
        sec = parseInt(sec);
        min = parseInt(min);
        hr = parseInt(hr);

        sec = sec + 1;

        if (sec == 60) {
            min = min + 1;
            sec = 0;
        }
        if (min == 60) {
            hr = hr + 1;
            min = 0;
            sec = 0;
        }

        if (sec < 10 || sec == 0) {
            sec = '0' + sec;
        }
        if (min < 10 || min == 0) {
            min = '0' + min;
        }
        if (hr < 10 || hr == 0) {
            hr = '0' + hr;
        }

        stopwatchTimer.innerHTML = hr + ':' + min + ':' + sec;
        // console.log(sec, ':', min, ':', hr)
        setTimeout("timerCycle()", 1000);
    }
}

function resetTimer() {
    stopwatchTimer.innerHTML = "00:00:00";
    stoptime = true;
    hr = 0;
    sec = -1;
    min = 0;
}


function startTimer() {
    if (stoptime == true) {
        stoptime = false;
        timerCycle();
    }
}

function stopTimer() {
    if (stoptime == false) {
        stoptime = true;
    }
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


            if (mat[i][j].isMine === false && mat[i][j] != mat[rowIdx][colIdx] && gBord[i][j].isShown !== true) {
                // console.log('EMPTY prameters idx', rowIdx, '||', colIdx, '\n i:', i, '||j:', j, 'countTest', countTest)
                if (gBord[i][j].haveNeighbor) {
                    gBord[i][j].cellBekColor = 'rgb(158, 158, 149)'
                    gBord[i][j].cellText = gBord[i][j].minesAroundCount
                    gBord[i][j].isShown = true
                    gGame.shownCount++


                } else if (gBord[i][j].isEmpty && gBord[i][j].isShown !== true) {
                    gBord[i][j].cellBekColor = 'rgb(158, 158, 149)'
                    gBord[i][j].isShown = true
                    gGame.shownCount++

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
        // console.log('TEST100', 'needRecla', needRecla)

}