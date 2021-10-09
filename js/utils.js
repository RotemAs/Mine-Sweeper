'user strict'

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function lavelOnClick(arryPlace) {

    crrLavel = gLavel[arryPlace]
    minesRemaining = crrLavel.LIVES
        // console.log('TEST 100  gLavel[arryPlace]', gLavel[arryPlace])

    restartGame()


}

function scoreBarUpdate() {
    var highScore = localStorage.getItem('score')
    if (typeof highScore !== 'undefined' && highScore !== null) {
        // console.log('highScore', highScore)
        var el = document.querySelector("#highScoreBordId")
        el.innerHTML = 'higest score :' + highScore + '  (markd mines)'
    } else {
        hide("#highScoreBordId")
    }

}


function messageSelect(messageNum) {
    var arrPlace;
    for (var i = 0; i < gMessages.length; i++) {
        if (gMessages[i].messageID === messageNum) {
            arrPlace = i
        }

    }

    var el = document.querySelector(".messageBar")
    el.innerHTML = gMessages[arrPlace].messageBudy
    el.style.backgroundColor = gMessages[arrPlace].backgroundColor

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


function hide(selector) {
    document.querySelector(selector).classList.add('hide')
}

function show(selector) {
    document.querySelector(selector).classList.remove('hide')
}

function clearLocalStorege() {
    window.localStorage.clear();
}