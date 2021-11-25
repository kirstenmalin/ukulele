import { showError } from './utils.js';

const songList = document.querySelector('.songList');
const shuffleBtn = document.querySelector('button.shuffle');

// ******************************** Maintain Shuffle Order
function getOrder() {
  const url = new URL(window.location);
  const params = new URLSearchParams(url.searchParams);
  const order = params.get('order');
  return order ? order.split(',') : [];

}

function setSongOrder(order) {
  const oldSongs = Array.from(songList.querySelectorAll('li'));
  order.reverse().forEach((i) => {
    const currentSong = oldSongs.find((song) => {
      return song.dataset.index === i;
    });
    currentSong.remove();
    songList.insertAdjacentElement('afterbegin', currentSong);
  });
}

function setOrderParam(order) {
  const orderParam = order.join(',');
  const url = window.location.toString();
  const queryIndex = url.indexOf('?');
  window.location = url.substr(0, queryIndex) + '?order=' + orderParam;
  // const url = new URL(window.location);
  // const params = new URLSearchParams(url.searchParams);
  // params.set('order', orderParam);
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
  try {
    const songs = Array.from(songList.querySelectorAll('li'));
    const currentOrder = songs.map((song) => {
      return song.dataset.index;
    });
    const newOrder = shuffle(currentOrder);

    setOrderParam(newOrder);
    setSongOrder(newOrder);
  } catch (err) {
    showError(err);
  }
}

function setNumSongs(numSongs) {
  document.getElementById('numSongs').innerHTML = numSongs;
}

function setIndices() {
  const songs = Array.from(songList.querySelectorAll('li'));
  songs.forEach((song, i) => {
    song.dataset.index = i;
  });
  setNumSongs(songs.length);
}

// ******************************** Initialization
try {
  setIndices();
  setSongOrder(getOrder());
  shuffleBtn.addEventListener('click', shuffleSongs);
} catch (err) {
  showError(err);
}
