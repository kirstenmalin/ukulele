const fs = require('fs');
const { createSVGWindow } = require('svgdom');
const { SVG, registerWindow } = require('@svgdotjs/svg.js');

const window = createSVGWindow()
registerWindow(window, window.document)

const filenames = fs.readdirSync('./src/chords');
// console.log('filenames:', filenames);

const chordFilenames = filenames.filter((filename) => filename.indexOf('.svg') >= 0);
// console.log('chordFilenames:', chordFilenames);

const chordData = {};

chordFilenames.forEach((filename) => {
  const chordName = filename.slice(0, -4);
  console.log(filename, ';', chordName);
  const file = fs.readFileSync(`${__dirname}/../src/chords/${filename}`, { encoding: 'utf8'});
  // console.log(file);
  const svg = SVG(file);
  chordData[chordName] = {
    offset: parseInt(svg.findOne('#position').node.textContent, 10) || 0,
    chord: []
  };
  const fingers = svg.find('[id^=finger]');
  const notes = svg.find('[id^=subText]');
  fingers.forEach((finger, i) => {
    const fretEl = finger.parent();
    const isClosedString = fretEl.node.style.visibility === 'visible';
    const fingerNumber = isClosedString ? finger.node.textContent : '';
    const transformValue = fretEl.node.getAttribute('transform');
    const fret = parseInt(transformValue.slice(transformValue.lastIndexOf(',') + 1, -1), 10) / 20 + 1;
    console.log('fret:', fret);
    chordData[chordName].chord.push({
      finger: fingerNumber,
      fret: fret,
      note: notes[i + 1].node.textContent.replace('b', '♭').replace('#', '♯')
    });
  });
});
console.log(chordData);

// console.log(draw.node.outerHTML)

const filename = 'chordData.json';
const contents = JSON.stringify(chordData, undefined, 2);

// fs.writeFile(filename, contents, (err) => {
//   if (err) {
//     return console.log('Error writing chordData.json file:', err);
//   }
//   console.log('Wrote new chordData.json file:', filename);
// });
