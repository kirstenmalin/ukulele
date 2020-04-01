const chordCalc = require('./chordCalc.js');

const chordCalcIndex = process.argv.indexOf('--chordCalc');
if (chordCalcIndex > -1) {
	let chordName = process.argv[chordCalcIndex + 1]
	console.log('Chord name: ', chordName);
	console.log('Chord notes: ', chordCalc(chordName));
}

// get the rest of the chord relationships figured out and put into my definitions map
// figure out the notes possible for each string in the first 6 frets
// or just take note of the starting notes for each string
// use the note arrays and add half-steps to get the other notes
// move the notes and keys arrays into a definitions or utils or something file so we can import them anywhere to facilitate code splitting
