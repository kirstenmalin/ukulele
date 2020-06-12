// ******************************** Utilities
const songList = document.querySelector('.songList');
const shuffleBtn = document.querySelector('button.shuffle');

function escapeHTML(msg) {
  if (!msg) {
    return false;
  }
  return msg.toString().replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function showError(err) {
  document.body.insertAdjacentHTML('afterbegin', `<p class="error">${escapeHTML(err.stack) || escapeHTML(err)}</p>`);
}

function log(msg) {
  let log = document.querySelector('.log');
  if (!log) {
    document.body.insertAdjacentHTML('afterbegin', '<section class="log"></section>');
    log = document.querySelector('.log');
  }
  log.insertAdjacentHTML('beforeend', `<p>${escapeHTML(msg)}</p>`);
}

// ******************************** Maintain Shuffle Order
function getOrder() {
  const url = new URL(window.location);
  const params = new URLSearchParams(url.searchParams);
  const order = params.get('order');
  return order ? order.split(',') : [];

}

function setSongOrder(order) {
  const oldSongs = Array.from(songList.querySelectorAll('li'));
  order.reverse().forEach((i, j, k) => {
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

function setIndices() {
  const songs = Array.from(songList.querySelectorAll('li'));
  songs.forEach((song, i) => {
    song.dataset.index = i;
  });
}

// ******************************** Initialization
try {
  setIndices();
  setSongOrder(getOrder());
  shuffleBtn.addEventListener('click', shuffleSongs);
} catch (err) {
  showError(err);
}
