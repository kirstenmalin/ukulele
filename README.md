# Ukulele Chords

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

To add a new song, copy `/src/songs/template.html` into a new file in the `/songs` directory. Then type or paste in the lyrics and add chords. Add the new song title and filename in `/src/songs/songList.js`.

## Chord calculation scripts

`npm run calc [name of chord]` will return the notes that are in the given chord.
