window.onload = run;

function run () {
  const boardCells = document.querySelectorAll('.game__board__cell');
  boardCells.forEach(c => c.addEventListener('click', onCellClick()));
}

function onCellClick () {
  let ox = true;
  return function () {
    this.innerHTML = ox ? 'X' : 'O';
    ox = !ox;
  };
}
