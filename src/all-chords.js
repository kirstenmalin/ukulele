import createChordFrets from './createChordFrets.js';
import { showError } from './utils.js';

// I want to generate the entire table from the data
// I think I'd need an array of the intended chord order
// import allChordsData from './allChordsData.js';

function displayChordTable() {
  const chordCells = document.querySelectorAll('td');
  Array.prototype.forEach.call(chordCells, (cell) => {
    const chord = cell.id;
    cell.innerHTML = createChordFrets(chord, false);
  });
}

function init() {
  try {
    displayChordTable();
  } catch(err) {
    showError(err);
  }
}

init();
