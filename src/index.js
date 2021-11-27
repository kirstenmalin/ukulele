import songs from './songs/songList.js';
import { showError } from './utils.js';

const songList = document.querySelector('.songList');
const sortRadios = document.querySelectorAll('[name="sortBy"]');

// ******************************** Maintain Shuffle Order
function getOrder() {
  const url = new URL(window.location);
  const params = new URLSearchParams(url.searchParams);
  const order = params.get('order');
  return order ? order.split(',') : [];

}

function setOrderedSongs(order) {
  if (order.length === 0) {
    sortSongs({ target: { value: 'title' } });
  } else {
    const orderedSongs = order.map((i) => songs[i]);
    setSongListHTML(orderedSongs);
  }
}

function setOrderParam(order) {
  const orderParam = order.join(',');
  window.history.pushState('', '', `?order=${orderParam}`);
}

function clearOrderParam() {
  window.history.pushState('', '', '?');
}

// ******************************** Shuffling
function shuffle(deck) {
  const d = deck.slice(0);
  for (let i = d.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = d[i];
    d[i] = d[j];
    d[j] = temp;
  }
  return d;
}

function shuffleSongs() {
  let currentOrder = getOrder();
  if (currentOrder.length === 0) {
    // If there's no current order, use an array of numbers from 0 to songs.length - 1
    currentOrder = [...Array(songs.length).keys()];
  }
  const newOrder = shuffle(currentOrder);

  setOrderParam(newOrder);
  return setOrderedSongs(newOrder);
}

// ******************************** Sorting
function sortBy(property) {
  return () => {
    clearOrderParam();
    const sortedSongs = [...songs].sort((songA, songB) => {
      const startsWithThe = /^the/;
      let propA = songA[property].toLowerCase();
      propA = startsWithThe.test(propA) ? propA.slice(4) : propA;
      let propB = songB[property].toLowerCase();
      propB = startsWithThe.test(propB) ? propB.slice(4) : propB;
      if (propA < propB) {
        return -1;
      }
      if (propA > propB) {
        return 1;
      }
      return 0;
    });
    setSongListHTML(sortedSongs);
  };
}

const sort = {
  shuffle: shuffleSongs,
  title: sortBy('title'),
  artist: sortBy('artist')
};

function setSongListHTML(sortedSongs) {
  songList.innerHTML = sortedSongs.reduce((acc, song) => (
    `${acc}
      <li data-title="${song.title}" data-artist="${song.artist}">
        <a href="songs/${song.filename}">${song.title} &mdash; ${song.artist}</a>
      </li>
    `
  ), '');
}

function sortSongs(evt) {
  try {
    sort[evt?.target?.value]?.();
  } catch (err) {
    showError(err);
  }
}

function setNumSongs(numSongs) {
  document.getElementById('numSongs').innerHTML = numSongs;
}

function setIndices() {
  const songLIs = Array.from(songList.querySelectorAll('li'));
  songLIs.forEach((song, i) => {
    song.dataset.index = i;
  });
}

// ******************************** Initialization
try {
  setNumSongs(songs.length);
  setOrderedSongs(getOrder());
  setIndices();
  Array.prototype.forEach.call(
    sortRadios,
    (radio) => radio.addEventListener('click', sortSongs)
  );
} catch (err) {
  showError(err);
}
