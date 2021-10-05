
function renderBoard(board) {

  var strHTML = '<table border="5" id="printmet" ><tbody>';
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < board[0].length; j++) {
      var className = 'cell cell' + i + '-' + j;

      strHTML += '<td class="' + className +
        '"  onclick="onClickCell(' + i + ',' + j + ') " style="background:'+board[i][j].cellBekColor+';" >' +gBord[i][j].cellText+ ' </td>';
      // strHTML += '<td class="' + className + '"> ' + ' </td>';

    }
    strHTML += '</tr>';
  }


  strHTML += '</tbody></table>';
  var elContainer = document.querySelector('.board-container');
  elContainer.innerHTML = strHTML;
  // console.log(strHTML)

  // console.log('strHTML', strHTML)
}



function printMat(mat, selector) {
  var strHTML = '<table border="5" id="printmet" ><tbody>';
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


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
// function renderBoard(board) {
//     for (var i = 0; i < board.length; i++){
//         for (var j = 0; j < board[0].length; j++){


//         }

//     }



//     console.log('randerbord gBord', gBord)
// }

//   // location such as: {i: 2, j: 7}
//   function renderCell(i,j, value) {
//     // Select the elCell and set the value
//     var elCell = document.querySelector(`.cell${i}-${j}`);
//     elCell.innerHTML = value;
//   }

  // console.log('getRandomInt 00',getRandomInt(0,10))

//   function getRandomColor() {
//     var letters = '0123456789ABCDEF';
//     var color = '#';
//     for (var i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   }

//   function getEmptyCells(board) {
//     var emptyCells = []
//     for (var i = 0; i < board.length; i++) {
//       for (var j = 0; j < board[0].length; j++) {
//         if (board[i][j] === EMPTY) {
//           emptyCells.push({ i: i, j: j })
//         }
//       }
//     }
//     return emptyCells
//   }

// function countNegs(mat, rowIdx, colIdx) {
//     var count = 0
//     for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
//       if (i < 0 || i > mat.length - 1) {
//         continue
//       }
//       for (var j = colIdx - 1; j <= colIdx + 1; j++) {
//         if (j < 0 || j > mat[0].length - 1) {
//           continue
//         }
//         if (i === rowIdx && j === colIdx) continue
//         if (mat[i][j] === live) count++
//         console.log(count)
//       }
//     }

//   }



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
      if (mat[i][j].isMine===false) {
        mat[i][j].haveNeighbor = true
        mat[i][j].isMine = false
        mat[i][j].isEmpty = false
        mat[i][j].minesAroundCount++
        console.log('prameters idx', rowIdx, '||', colIdx,'i:', i, '||j:', j,'countTest', countTest,'minecunt',mat[i][j].minesAroundCount)
        
        countTest++
        }
    }
  }

}
