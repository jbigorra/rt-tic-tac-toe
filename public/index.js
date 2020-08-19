window.onload = run;

function run () {
  const playButton = document.getElementById('play-button');
  const joinButton = document.getElementById('join-button');

  playButton.addEventListener('click', function () {
    const createRoomForm = document.getElementById('create-room-form');
    const joinRoomForm = document.getElementById('join-room-form');
    HideElement(joinRoomForm);
    ShowElement(createRoomForm);
  });

  joinButton.addEventListener('click', function () {
    const joinRoomForm = document.getElementById('join-room-form');
    const createRoomForm = document.getElementById('create-room-form');
    HideElement(createRoomForm);
    ShowElement(joinRoomForm);
  });
}

function ShowElement (el) {
  el.classList.remove('hidden');
}

function HideElement (el) {
  el.classList.add('hidden');
}
