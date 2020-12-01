import { log, showError } from './utils.js';
import createChordFrets from './createChordFrets.js';


const notesSharp = ['A', 'A♯', 'B', 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯'];
const notesFlat = ['A', 'B♭', 'B', 'C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭'];
const majorKeys = ['A♭', 'A', 'B♭', 'B', 'C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G'];
const minorKeys = ['Am', 'B♭m', 'Bm', 'Cm', 'C♯m', 'Dm', 'E♭m', 'Em', 'Fm', 'F♯m', 'Gm', 'G♯m'];
const keysWithSharp = ['G', 'D', 'A', 'E', 'B', 'Em', 'Bm', 'F♯m', 'C♯m', 'G♯m'];
// const keysWithFlat = ['F', 'B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'Dm', 'Gm', 'Cm', 'Fm', 'B♭m', 'E♭m'];

// flat ♭ U+266D
// natural ♮ U+266E
// sharp ♯ U+266F

// ⬆ UPWARDS BLACK ARROW U+2b06 HTML decimal: &#11014; HTML hex: &#x2B06;
// ⬇ DOWNWARDS BLACK ARROW U+2b07 HTML decimal: &#11015; HTML hex: &#x2B07;

let scrollTimer;

// ******************************** Utilities
function cleanChord(chord) {
  return chord.replace('<i>', '').replace('</i>', '');
}

function dirtyChord(chord) {
  return cleanChord(chord).replace('♯', '<i>♯</i>').replace('♭', '<i>♭</i>');
}

function getIndex(item, array) {
  const searchItem = cleanChord(item);
  return array.findIndex((current) => {
    return searchItem.indexOf(current) === 0 &&
      searchItem.indexOf('♯') === current.indexOf('♯') &&
      searchItem.indexOf('♭') === current.indexOf('♭');
  });
}

function getKeyIndex(key) {
  const keys = key.indexOf('m') === -1 ? majorKeys : minorKeys;
  return getIndex(key, keys);
}

function getChordIndex(chord) {
  const notes = chord.indexOf('♯') === -1 ? notesFlat : notesSharp;
  return getIndex(chord, notes);
}

function incrementChord(initialChord, numHalfSteps, newKey) {
  const initialIndex = getChordIndex(initialChord);
  if (initialIndex === -1) {
    showError(`Bad chord: ${cleanChord(initialChord)}`);
  }

  let newIndex = (initialIndex + numHalfSteps) % 12;
  if (newIndex < 0) {
    newIndex += 12;
  }
  const fromNotes = initialChord.indexOf('♯') === -1 ? notesFlat : notesSharp;
  const toNotes = keysWithSharp.indexOf(newKey) === -1 ? notesFlat : notesSharp;
  return dirtyChord(cleanChord(initialChord).replace(fromNotes[initialIndex], toNotes[newIndex]));
}

function getChordList() {
  const allChordElements = document.querySelectorAll('article .chord');
  const fullChordList = Array.prototype.map.call(allChordElements, (chordEl) => {
    if (chordEl.innerHTML === '') {
      showError(`Empty chord in line: ${chordEl.parentElement.outerHTML}`);
    }
    const chord = cleanChord(chordEl.innerHTML);
    chordEl.innerHTML = dirtyChord(chord);
    return chord;
  }).filter((chord) => chord !== '');
  // Sets only hold unique items, so this filters the array
  return Array.from(new Set(fullChordList));
}

// ******************************** Page Interaction

function updateNotes(numHalfSteps) {
  // used for starting note and future strumming
  // grab all img.note elements
  //
}

function changeKey() {
  try {
    const selectBox = document.querySelector('select.key');
    const newKey = selectBox.options[selectBox.selectedIndex].value;
    const newKeyIndex = getKeyIndex(newKey);
    const oldKeyIndex = getKeyIndex(selectBox.dataset.current);
    const allChords = Array.from(document.querySelectorAll('.chord'));
    allChords.forEach((chord) => {
      chord.innerHTML = incrementChord(chord.innerHTML, newKeyIndex - oldKeyIndex, newKey);
    });
    selectBox.dataset.current = newKey;
    setChordImages();
    // updateNotes(newKeyIndex - oldKeyIndex);
  } catch (err) {
    showError(err);
  }
}

function scrollOldVersion(evt) {
  clearInterval(scrollTimer);
  if (evt.target.value !== 'off' && evt.target.checked) {
    const speed = parseInt(evt.target.value, 10);
    let acc = 0.5;
    scrollTimer = setInterval(() => {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        stopScroll();
      }
      acc = acc > 0 ? acc - 0.005 : acc;
      // log('acc: ' + acc);
      window.scrollBy({
        top: speed - acc,
        left: 0,
        behavior: 'smooth'
      });
    }, 250);
  }
}

function scroll(evt) {
  clearInterval(scrollTimer);
  if (evt.target.value !== 'off' && evt.target.checked) {
    const speed = parseInt(evt.target.value, 10);
    scrollTimer = setInterval(() => {
      window.scrollBy({
        top: 1,
        left: 0,
        behavior: 'smooth'
      });
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        stopScroll();
      }
    }, speed);
  }
}

function stopScroll(evt) {
  if (!evt || evt.target.name !== 'scrollSpeed') {
    clearInterval(scrollTimer);
    document.querySelector('.scrollControls input[value="off"]').checked = true;
  }
}

// ******************************** Page Initialization
function populateKeySelect() {
  const selectBox = document.querySelector('select.key');
  if (selectBox.dataset.initial === '') {
    showError('Initial key not set.');
  }
  const keys = selectBox.dataset.initial.indexOf('m') === -1 ? majorKeys : minorKeys;
  keys.forEach((key) => {
    selectBox.insertAdjacentHTML('beforeend', `<option value="${key}"${selectBox.dataset.initial === key ? ' selected' : ''}>${key}</option>`);
  });
  selectBox.dataset.current = selectBox.dataset.initial;
  selectBox.addEventListener('change', changeKey);
  // Maybe pull this out into its own function
  // do it after setChordImages
  // so that we log out the original chords before
  // showing the preferred ones
  if (selectBox.dataset.preferred && selectBox.dataset.preferred != '') {
    selectBox.value = selectBox.dataset.preferred;
    changeKey();
  }
}

function setChordImages() {
  const chordList = getChordList();
  log(`chordList: ${chordList}`);
  const chordListItems = chordList.reduce((acc, chord) => {
    return acc + createChordFrets(chord);
  }, '');
  document.querySelector('.chordList').innerHTML = chordListItems;
}

function setNoteImages() {
  // This will probably be insufficient to identify the starting note
  // once I've got plucking notes elsewhere in the song, but we can change it later.
  const startingNote = document.querySelector('img.note');
  if (startingNote.dataset.note === '') {
    showError('Starting note not set.');
  }

}

function setupScroll() {
  const scrollControls = document.querySelector('.scrollControls');
  // const speeds = [1, 1.5, 1.8, 2, 2.5, 3, 4, 5];
  const speeds = [250, 200, 175, 150, 125, 100, 75, 50, 30, 20, 10];
  speeds.forEach((speed) => {
    scrollControls.insertAdjacentHTML('beforeend',
      `<label><input type="radio" name="scrollSpeed" value="${speed}">${speed}</label>`);
  });
  scrollControls.addEventListener('change', scroll);
  document.body.addEventListener('click', stopScroll);
}

function init() {
  try {
    populateKeySelect();
    setChordImages();
    setNoteImages();
    setupScroll();
  } catch(err) {
    showError(err);
  }
}

init();







