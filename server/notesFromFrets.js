// Given an array of string fretting, returns which notes they are
// The array specifies, in GCEA string order, which frets are pressed for each string.
// An open string, e.g, is 0
// C chord is [0, 0, 0, 3]
// Return value is an object with two properties containing arrays:
// notesSharps
// notesFlats

const dfns = require('./definitions.js');

// notesSharp
// notesFlat
// openStringNotes

function getNote(notesArray) {
  return (fret, i) => {
    const openIndex = notesArray.indexOf(dfns.openStringNotes[i]);
    const frettedNoteIndex = (openIndex + parseInt(fret, 10)) % 12;
    return notesArray[frettedNoteIndex];
  };
}

// This is looping through each string twice.
// TODO: only loop once. The indices are the same for each array.
function getNotesFromFrets(frets) {
  if (!Array.isArray(frets)) {
    frets = frets.replace('[', '').replace(']', '').replace(/s/g, '').split(',');
  }
  return {
    notesSharps: frets.map(getNote(dfns.notesSharp)),
    notesFlats: frets.map(getNote(dfns.notesFlat))
  };
}

module.exports = getNotesFromFrets;
