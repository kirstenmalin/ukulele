const express = require('express');
const chordCalc = require('./chordCalc.js');

const app = express();

app.use(express.static('src'));
app.get('/chords/:chord', (req, res) => {
	console.log('Getting chord: ', req.params.chord);
	const chordNotes = chordCalc(req.params.chord);
	console.log('Chord notes: ', chordNotes);
	res.status(200).send(`getting chord: ${req.params.chord}\n resulting chord: ${chordNotes}`);
	res.end();
});

const port = 5000;
app.listen(port);
console.log(`Ukulele app listening on port ${port}`);
