# Ukulele Tools

This app displays song lyrics that have been annotated with chords to facilitate playing the songs on a ukulele.

I started this project not long after I started learning to play the ukulele. When I looked up song chords, a lot of the songs I found either had mistakes in the chords or lyrics, or I wanted to change how I played the intro or the ending. I tried various apps and online tools, but none of them were quite what I wanted.

With this app, I can modify lyrics and chords at will and easily save my changes. This also has the capability to transpose songs and scroll the window.

## Running the song pages

To start the server, do `npm install`, then `npm start`. Then open up `localhost:5000/`.

Since most of the code has been developed on an Android tablet, meaning I can't pull up the devtools in the browser, errors and log messages appear within the pages themselves.

## Using the song pages

The index page has links to all of the songs and a shuffle button to shuffle the list order.

Each song page has lyrics annotated with chords and displays frets for each chord used in the song. There is a select box that lists the current key. Just select a new key, and the chords will change accordingly. There is also a set of radio buttons to control the scroll speed. The lower the number, the faster the scroll. Tapping anywhere in the page other than the scroll options stops the scrolling.

Modifying the chords themselves and adding new songs is a manual process of editing the html files directly. I plan to make a UI where I can edit the chords directly in the browser, but that is not implemented yet.

To change or add chords in a song, open the corresponding html file in `/src/songs`. Each chord is in `<b>` tag with a class `chord`. Just change the contents of the `<b>` tag, or add a new one wherever you want.

To add a new song, copy `/src/songs/template.html` into a new file in the `/songs` directory. Add a link to the new file in `/src/index.html`. Then type or paste in the lyrics and add chords.

## Chord calculation scripts

`npm run calc [name of chord]` will return the notes that are in the given chord.

## Future plans

- UI to enable editing chords from within the browser
  - This will probably require setting up a database, but I might try writing the data to a json file. The benefit there is that the files would be more portable, so I could run it off of my computer, tablet, or phone.

- Generate svgs of the chords
  - Try generating them dynamically
  - Save off the result so that they don't have to be re-generated each time

- Dynamically determine the fingering for each chord
  - In order to generate the chord svgs, I need to know where to put the fingering for each chord
  - I could do this manually, but this is more an exercise to see whether I can calculate the same fingering that is common for a given chord
  - Create a script that generates svgs for each key given the relationships between notes in a type of chord
  - need to take into account what notes each string can makes
  - need to make it generate the correct known chord patterns
  - maybe allow option to generate alternate versions of the same chord
  - This is in progress - chordCalc script is the first step

- Try word-spacing: 0.5ch on the text, but not the chords. Or does it matter, since there are no spaces in the chords?
  - Some chord names are quite wide, and sometimes they are used during words that are short. I want to avoid adding non-breakings spaces in the text if I can, which is how I've been mitigating the issue.
