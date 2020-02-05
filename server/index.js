const express = require('express');

const app = express();

app.use(express.static('src'));
app.get('/chords/:chord', (req, res) => {
	console.log('Getting chord: ', req.params.chord);
	res.status(200).send(`getting chord: ${req.params.chord}`);
	res.end();
});

const port = 5000;
app.listen(port);
console.log(`Ukulele app listening on port ${port}`);
