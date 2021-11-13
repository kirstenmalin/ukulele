export function escapeHTML(msg) {
  if (!msg) {
    return false;
  }
  return msg.toString().replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function showError(err) {
  document.body.insertAdjacentHTML(
    'afterbegin',
    `<p class="error">${escapeHTML(err.stack) || escapeHTML(err)}</p>`
  );
  console.error(err);
}

export function log(msg) {
  let log = document.querySelector('.log');
  if (!log) {
    document.body.insertAdjacentHTML('beforeend', '<section class="log"></section>');
    log = document.querySelector('.log');
  }
  log.insertAdjacentHTML('beforeend', `<p>${escapeHTML(msg)}</p>`);
}
