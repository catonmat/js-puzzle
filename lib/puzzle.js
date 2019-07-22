// Warmup: Get the hint button working
const hintButton = document.getElementById('show-hint');
const hintContent = document.querySelector('.hint');
hintButton.addEventListener('click', () => {
  hintContent.classList.toggle('active');
});


// Part 1: check if the tile can move.
// 1.1 Attach an event listener to each cell.
document.querySelectorAll('td').forEach( cell => {
  cell.addEventListener('click', (event) => {
    // // Print cell data to browser log.
    // console.log('element', event.currentTarget);
    // console.log('column', event.currentTarget.cellIndex);
    // console.log('row', event.currentTarget.parentElement.rowIndex);
    if (canMove(event.currentTarget)) {
      console.log('this cell can move');
      moveTile(event.currentTarget);
      hasWon();
    } else {
      console.log('this cell cannot move')
    }
  })
})
// 1.2 write a function that checks if the tile can move.
const canMove = (tile) => {
  const tileRow = tile.parentElement.rowIndex;
  const tileCol = tile.cellIndex;
  const emptyTile = document.querySelector('.empty');
  const emptyTileRow = emptyTile.parentElement.rowIndex;
  const emptyTileCol = emptyTile.cellIndex;

  return (tileRow === emptyTileRow && tileCol === emptyTileCol - 1) ||
         (tileRow === emptyTileRow && tileCol === emptyTileCol + 1) ||
         (tileCol === emptyTileCol && tileRow === emptyTileRow - 1) ||
         (tileCol === emptyTileCol && tileRow === emptyTileRow + 1)
}

// 1.3 Link the checker function as a callback to the event listener.
// Completed: Check ll. 9-12.

// Part 2. Move the tile.
const moveTile = (tile) => {
  // 2.1 Select the empty tile.
  const emptyTile = document.querySelector('.empty');
  // 2.2 Replace it with the current tile's inner text.
  emptyTile.innerText = tile.innerText;
  // 2.3 Remove 'empty' class from previously empty tile.
  emptyTile.classList.remove('empty');
  // 2.4 Delete the curent tile's inner text.
  tile.innerText = "";
  // 2.5 Add 'empty' class to current tile.
  tile.classList.add('empty');
}

// 2.6 Link the moveTike function into the callback for the event listener.
// Completed: check ll. 10-11.

// Part 3. Alert the palyer when the game is won.
const hasWon = () => {
  // 3.1 Define the victory conditions
  const victoryCondition = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,NaN";
  // 3.2 Build an array of the current state of the tiles.
  const tiles = Array.from(document.querySelectorAll('td'))
                     .map( e => parseInt(e.innerText, 10))
  console.log('tiles array', tiles);
  // 3.3 Loop through the array and validate the victory condition
  if (tiles.join() === victoryCondition) {
    alert("You have won!");
    window.location.reload()
  }
}

// Optional: Build a button that automatically wins the game
const solutionButton = document.getElementById('show-solution');
solutionButton.addEventListener('click', () => {
  winGame()
})
const winGame = () => {
  let cells = Array.from(document.querySelectorAll('td'));
  // console.log(cells)
  cells.forEach( cell => cell.classList.remove('empty'));
  for (let i = 0; i < 16; i++) {
    cells[i].innerText = i+1;
    if (i === 15) {
      cells[i].classList.add('empty');
      cells[i].innerText = "";
    }
  }
}





