import allChordsData from './allChordsData.js';

function fingerNumberTemplate(fingerNumber) {
  return `<div class="fingerNumber">${fingerNumber}</div>`;
}

function fretTemplate(fingerNumber) {
  return `<div class="fret">${fingerNumber && fingerNumberTemplate(fingerNumber)}</div>`;
}

function stringTemplate(stringData) {
  let frets = '';
  for (let i = 1; i <= 4; i++) {
    frets += fretTemplate(i === stringData.fret ? stringData.finger : '');
  }
  return `
    <div class="string">
      ${frets}
      <div class="noteName">${stringData.note}</div>
    </div>`;
}

export default function createChordFrets(chordName) {
  const chordData = allChordsData[chordName];
  const strings = chordData.chord.reduce((acc, stringData) => {
    return acc + stringTemplate(stringData);
  }, '');

  return `<li>
      <div class="chordName">${chordName}</div>
        <div class="fretboard">
          ${chordData.offset ? `<span class="offset">${chordData.offset}</span>` : ''}
          ${strings}
        </div>
    </li>`;
}
