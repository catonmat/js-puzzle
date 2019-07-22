/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/puzzle.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/puzzle.js":
/*!***********************!*\
  !*** ./lib/puzzle.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

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
  }
}

// Optional: Build a button that automatically wins the game
const button = document.querySelector('.hint');
button.addEventListener('click', () => {
  winGame()
})
const winGame = () => {
  let cells = Array.from(document.querySelectorAll('td'))
                   .forEach( cell => cell.classList.remove('empty'));
  for (let i = 0; i < 15; i++) {
    debugger
    cells[i].innerText = i;
    if (i === 15) {
      cells[i].classList.add('empty');
    }
  }
}








/***/ })

/******/ });
//# sourceMappingURL=application.js.map