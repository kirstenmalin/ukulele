module.exports = {
	notesSharp: ['A', 'A♯', 'B', 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯'];
	notesFlat: ['A', 'B♭', 'B', 'C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭'];
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
