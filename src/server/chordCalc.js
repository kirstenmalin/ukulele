import * as dfns from '../definitions.js';

function logBadChord (chordName) {
  console.log('Invalid chord: ', chordName);
}

// This function calculates which notes are in a given chord.
// It does not determine which notes, if any, should be repeated.
export default function chordCalc (c) {
  const chordName = c.slice(0, 1).toUpperCase() + c.slice(1).toLowerCase();
  console.log('Chord Name:', chordName);
  const tonic = dfns.allNotes.find((current) => {
    return chordName.indexOf(current) === 0;
  });
  if (!tonic) {
    logBadChord(chordName);
    return [];
  }
  const chordType = chordName.replace(tonic, '') || 'major';
  const key = dfns.minorChordTypes.indexOf(chordType) === -1 ? tonic : tonic + 'm';
  const useSharps = tonic.indexOf('♯') !== -1 || dfns.keysWithSharp.indexOf(key) !== -1;
  const notesList = useSharps ? dfns.notesSharp : dfns.notesFlat;
  const notesIndex = notesList.findIndex((current) => tonic === current);

  if (notesIndex === -1 || !dfns.chordTypeDfns[chordType]) {
    logBadChord(chordName);
    return [];
  }
  const chordArray = dfns.chordTypeDfns[chordType].map((offset) => {
    return notesList[(notesIndex + offset) % notesList.length];
  });
  return chordArray;
}
