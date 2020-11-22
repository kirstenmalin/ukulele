# Notes

## Development

To do an npm install on the tablet, use the --no-bin-links option:
  npm install --save svgdom --no-bin-links

- Make chords dark red
- Make a spot at the bottom of each song for notes
- Grab the chord images and make them sticky at the top - position: sticky
- Handle minor keys in the key selection box
    - second array? Or just detect a `m` in the key name and add it?

Try word-spacing: 0.5ch on the text, but not the chords. Or does it matter, since there are no spaces in the chords?

create a script that generates svgs for each key given the relationships between notes in a type of chord

need to take into account what notes each string can makes

need to make it generate the correct known chord patterns

maybe allow option to generate alternate versions of the same chord

## Songs and chords

Ain't No Sunshine - Starts on E, key of Am
Blue Savannah - Starts on D, key of D
Brown-Eyed Girl - starts on D, key of Fm
- need to figure out ending
- Some of the chords are wrong

Build Me Up Buttercup - Starts on C, key of C
Everything - when it starts on chord C, start singing on E
Hey Jealousy - (transposed down 4 steps so that chords are F, G, Am, C) - Start one half step below the first chord
Holding Out for a Hero - starts on E; some of the Ams are supposed to be Fs
I Can't Help Falling in Love with You - starts on C, key of C
I Know You're Out There Somewhere - starts on G, key of G
I Think We're Alone Now - starts on E, key of C
Let It Be - starts on G, key of C
Whiter Shade of Pale - starts on G, key of C
