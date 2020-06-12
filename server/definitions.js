module.exports = {
  notesSharp: ['A', 'A♯', 'B', 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯'],
  notesFlat: ['A', 'B♭', 'B', 'C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭'],
  // The naturals need to be before the sharps and flats so that when we search for the note in the name of the chord, the last one wins.
  // Otherwise, we'd return a natural instead of a flat.
  allNotes: ['A', 'A♭', 'A♯', 'B', 'B♭', 'C', 'C♯', 'D', 'D♭', 'D♯', 'E', 'E♭', 'F', 'F♯', 'G', 'G♭', 'G♯'],
  majorKeys: ['A♭', 'A', 'B♭', 'B', 'C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G'],
  minorKeys: ['Am', 'B♭m', 'Bm', 'Cm', 'C♯m', 'Dm', 'E♭m', 'Em', 'Fm', 'F♯m', 'Gm', 'G♯m'],
  keysWithSharp: ['G', 'D', 'A', 'E', 'B', 'Em', 'Bm', 'F♯m', 'C♯m', 'G♯m'],
  keysWithFlat: ['F', 'B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'Dm', 'Gm', 'Cm', 'Fm', 'B♭m', 'E♭m'],

  // Each array is a list of which notes are in a chord. It is zero-indexed from the tonic, with each half step being a unit.
  // In the key of C, strings are: 7, 0, 4, 9
  // tonic = 0; 1 octave up = 12
  chordTypeDfns: {
    major: [0, 4, 7],
    m: [0, 3, 7],
    aug: [0, 4, 8],
    dim: [0, 3, 6],
    '7': [0, 4, 7, 10],
    m7: [0, 3, 7, 10],
    maj7: [0, 4, 7, 11],
    '6': [0, 4, 7, 9],
    m6: [0, 3, 7, 9],
    add9: [0, 2, 4, 7],
    m9: [0, 2, 3, 7],
    '9': [2, 4, 7, 10],
    sus2: [0, 2, 7],
    sus4: [0, 5, 7],
    '7sus4': [0, 5, 7, 10]
  },
  minorChordTypes: ['m', 'm7', 'm6', 'm9'],
  openStringNotes: ['G', 'C', 'E', 'A']
};
