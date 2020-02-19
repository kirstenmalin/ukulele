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
const minorChordTypes = ['m', 'm7', 'm6', 'm9'];

function logBadChord (chordName) {
	console.log('Invalid chord: ', chordName);
}

// This function calculates which notes are in a given chord.
// It does not determine which notes, if any, should be repeated.
function chordCalc (c) {
	const chordName = c.slice(0, 1).toUpperCase() + c.slice(1).toLowerCase();
	const tonic = allNotes.find((current) => {
		return chordName.indexOf(current) === 0;
	});
	if (!tonic) {
		logBadChord(chordName);
		return [];
	}
	const chordType = chordName.replace(tonic, '') || 'major';
	const key = minorChordTypes.indexOf(chordType) === -1 ? tonic : tonic + 'm';
	const useSharps = tonic.indexOf('♯') !== -1 || keysWithSharp.indexOf(key) !== -1;
	const notesList = useSharps ? notesSharp : notesFlat;
	const notesIndex = notesList.findIndex((current) => tonic === current);
	
	if (notesIndex === -1 || !chordTypeDfns[chordType]) {
		logBadChord(chordName);
		return [];
	}
	const chordArray = chordTypeDfns[chordType].map((offset) => {
		return notesList[(notesIndex + offset) % notesList.length];
	});
	return JSON.stringify(chordArray);
}

module.exports = chordCalc;
