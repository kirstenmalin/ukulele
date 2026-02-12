# Notes

## Development

To do an npm install on the tablet, use the `--no-bin-links` option because Android doesn't support symlinks:
```npm install --save [packagename] --no-bin-links```

Rather than having to manually add song links to the index page, try reading the files and adding the links dynamically.
	I'd have the filename available for the link `href`
	I'd need to read the file and extract the `Song Title - Artist` from the page title. How feasible is that?
	Is this worth the effort?
	
For the in-browser editing:
	A checkbox or button enables edit mode
	In edit mode, font is monospace - would that help?
	Drag the chord name horizontally along the line, and a line appears below it in between the letters or highlighting the letter that it should appear above
	Each line has buttons for "edit lyrics", "edit chord", "move chord", "add chord", "remove chord", "remove line", "add line below"
	Edited lyrics and chords appear in a different color (purple?)
	Toggle for showing original vs. edited versions
	Save button writes changes to the html file
		how?
		Need a new route for an api call
		To preserve formatting, maybe just send the entire DOM in the api call, write it to the file, then run `eslint --fix`
		Make sure the eslint settings are what I want (I think they are.)
		Have it do a `git commit` with a message that indicates what file was changed.
		(Make sure to `git add [filename]` first)
		How do I call command line functions from node?
		
### Code notes

To set the value of a css variable via js:
```css

:root {
  --mouse-x: 0px;
  --mouse-y: 0px;
}
```

```js
let root = document.documentElement;

root.addEventListener("mousemove", e => {
  root.style.setProperty('--mouse-x', e.clientX + "px");
  root.style.setProperty('--mouse-y', e.clientY + "px");
});```



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
