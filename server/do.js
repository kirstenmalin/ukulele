const chordCalc = require('./chordCalc.js');
const getNotesFromFrets = require('./notesFromFrets.js');

const chordCalcIndex = process.argv.indexOf('--chord-calc');
if (chordCalcIndex > -1) {
  let chordName = process.argv[chordCalcIndex + 1];
  //console.log('Chord name: ', chordName);
  console.log('Chord notes: ', chordCalc(chordName));
}

const notesFromFretsIndex = process.argv.indexOf('--nff');
if (notesFromFretsIndex > -1) {
  let frets = process.argv[notesFromFretsIndex + 1];
  console.log('Frets: ', frets);
  console.log('Chord notes: ', getNotesFromFrets(frets));
}

// get the rest of the chord relationships figured out and put into my definitions map
// figure out the notes possible for each string in the first 6 frets
// or just take note of the starting notes for each string
// use the note arrays and add half-steps to get the other notes
// move the notes and keys arrays into a definitions or utils or something file so we can import them anywhere to facilitate code splitting
