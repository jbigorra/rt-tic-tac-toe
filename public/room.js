window.onload = run;

function run () {
  setupBoard();

  setupInviteButton();
}

function setupBoard () {
  function onCellClick () {
    let ox = true;
    return function () {
      this.innerHTML = ox ? 'X' : 'O';
      ox = !ox;
    };
  }

  const boardCells = document.querySelectorAll('.game__board__cell');
  boardCells.forEach(c => c.addEventListener('click', onCellClick()));
}

function setupInviteButton () {
  function onInviteButtonClick (e) {
    e.preventDefault();
    document.execCommand('copy');
    copyToClipboard(this.dataset.roomid);
    showCopyFeedback();
  }

  function showCopyFeedback () {
    const copyFeedback = document.querySelector('.copy__feedback');
    copyFeedback.classList.remove('copy__feedback--hidden');
    copyFeedback.classList.add('copy__feedback--fade-in-out');
    setTimeout(() => {
      copyFeedback.classList.add('copy__feedback--hidden');
      copyFeedback.classList.remove('copy__feedback--fade-in-out');
    }, 1500);
  }

  const inviteButton = document.querySelector('.room__invitation__button');
  inviteButton.addEventListener('click', onInviteButtonClick);
}

function copyToClipboard (str) {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};
