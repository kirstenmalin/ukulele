const dfns = require('./definitions.js');

//
/*
I want to input a chord name
Use chordCalc to get the notes in the chord
For each string, figure out which chord notes are within the first 5 frets

*/

// given an array of notes, like from chordCalc
function whatever(notesArr) {
  return dfns.openStringNotes.map((string) => {
    const openStringIndex = dfns.notesSharp.indexOf(string);
    notesArr.forEach((note) => {
      // check the note for flat/sharp
      // get index in appropriate array
      // if noteIndex is less than openStringIndex, add 12 -- or is this necessary if we just subtract and mod?
      // subtract openStringIndex from noteIndex
      // result is fret number for that note on that string
      // if fret is less than 5, add object with { note: fret } to array
    });
  });
}

module.exports = whatever;
