import express from 'express';
import path from 'node:path';
import chordCalc from './chordCalc.js';

const router = express.Router();
const srcPath = path.join(import.meta.dirname, '../src');

router.use(express.static(srcPath));
router.get('/chords/:chord', (req, res) => {
  console.log('Getting chord: ', req.params.chord);
  const chordNotes = chordCalc(req.params.chord);
  console.log('Chord notes: ', chordNotes);
  res.status(200).send(`getting chord: ${req.params.chord}\n resulting chord: ${chordNotes}`);
  res.end();
});

export default router;
