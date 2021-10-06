function gameoff() {
    // gGame.isOn = false
    console.log('gameoff')
        // exposeMines()
    var t0 = crrLavel.SIZE
    var t1 = (t0 * t0) - crrLavel.MINES
    var t2 = gGame.hiddenMinsCount
    console.log('t1', t1, 't2', t2, 't0', t0)

}
// - crrLavel.MINE
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