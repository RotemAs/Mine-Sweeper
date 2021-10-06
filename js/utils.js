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