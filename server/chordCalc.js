const notesSharp = ['A', 'A♯', 'B', 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯'];
const notesFlat = ['A', 'B♭', 'B', 'C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭'];
// The naturals need to be before the sharps and flats so that when we search for the note in the name of the chord, the last one wins. Otherwise, we'd return a natural instead of a flat.
const allNotes = ['A', 'A♭', 'A♯', 'B', 'B♭', 'C', 'C♯', 'D', 'D♭', 'D♯', 'E', 'E♭', 'F', 'F♯', 'G', 'G♭', 'G♯'];
const majorKeys = ['A♭', 'A', 'B♭', 'B', 'C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G'];
const minorKeys = ['Am', 'B♭m', 'Bm', 'Cm', 'C♯m', 'Dm', 'E♭m', 'Em', 'Fm', 'F♯m', 'Gm', 'G♯m'];
const keysWithSharp = ['G', 'D', 'A', 'E', 'B', 'Em', 'Bm', 'F♯m', 'C♯m', 'G♯m'];
const keysWithFlat = ['F', 'B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'Dm', 'Gm', 'Cm', 'Fm', 'B♭m', 'E♭m'];

// Each array is a list of which notes are in a chord. It is zero-indexed from the tonic, with each half step being a unit.
const chordTypeDfns = {
	major: [0, 4, 7],
	m: [0, 3, 7],
	aug: [],
	dim: [],
	'7': [],
	m7: [],
	maj7: [],
	'6': [],
	m6: [],
	add9: [],
	m9: [],
	'9': [],
	sus2: [],
	sus4: [],
	'7sus4': []
};

function logBadChord (chordName) {
	console.log('Invalid chord: ', chordName);
}

// This function calculates which notes are in a given chord.
// It does not determine which notes, if any, should be repeated.
function chordCalc (c) {
	const chordName = c.slice(0, 1).toUpperCase() + c.slice(1).toLowerCase();
	// figure out what type of chord it is
	// look for each of the notes in allNotes at index 0 of the chordName
	const note = allNotes.find((current) => {
		return chordName.indexOf(current) === 0;
	});
	if (!note) {
		logBadChord(chordName);
		return [];
	}
	// when found, replace the note with empty string, and the resulting string is the chord type
	// if the chord type is an empty string, it's 'major'
	const chordType = chordName.replace(note, '') || 'major';
	// use the correct relationship between chord elements to determine what notes are in the chord:
	// determine whether to use notesSharp or notesFlat
	// Need to correctly handle minor chords
	const useSharps = note.indexOf('♯') !== -1 || keysWithSharp.indexOf(note) !== -1;
	// find the index of the chord note in notesSharp or notesFlat
	const notesList = useSharps ? notesSharp : notesFlat;
	const notesIndex = notesList.findIndex((current) => note === current);
	
	if (notesIndex === -1 || !chordTypeDfns[chordType]) {
		logBadChord(chordName);
		return [];
	}
	// For each value in the chordTypeDfn array, add the value to the index of the chord note and mod by the number of note names in the array
	// the result is the note for that part of the chord
	// push the note onto the chordArray
	const chordArray = chordTypeDfns[chordType].map((offset) => {
		return notesList[(notesIndex + offset) % notesList.length];
	});
	return JSON.stringify(chordArray);
}

module.exports = chordCalc;
