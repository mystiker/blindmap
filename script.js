const gridContainer = document.getElementById('grid-container');

const symbolInput = document.getElementById('symbol_input');

symbolInput.addEventListener('input', () => {
  const selectedCell = document.querySelector(`.cell[data-x="${currentX}"][data-y="${currentY}"][data-z="${currentZ}"]`);

  if (selectedCell) {
    selectedCell.textContent = symbolInput.value;
  }
});

function createCell(x, y, z) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.setAttribute('data-x', x);
  cell.setAttribute('data-y', y);
  cell.setAttribute('data-z', z);
  gridContainer.appendChild(cell);
}

// Initial 100x100 Grid erstellen
for (let y = -50; y < 50; y++) {
  for (let x = -50; x < 50; x++) {
    createCell(x, y, 0);
  }
}

let currentX = 0; // Startposition X
let currentY = 0; // Startposition Y
let currentZ = 0; // Startposition Z

function updateSelection() {
  // Todo: Das ist super langsam. Ich sollte mir das aktuelle Element halten
  document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('selected'));
  const selectedCell = document.querySelector(`.cell[data-x="${currentX}"][data-y="${currentY}"][data-z="${currentZ}"]`);
  selectedCell.classList.add('selected');

  const positionElement = document.getElementById('position');
  positionElement.textContent = `Position X: ${currentX}, Y: ${currentY}, Z: ${currentZ}`;

  updateSymbol();
}

function updateSymbol() {
  const selectedCell = document.querySelector(`.cell[data-x="${currentX}"][data-y="${currentY}"][data-z="${currentZ}"]`);
  
  // Setze das Symbol der aktuellen Zelle auf das Eingabefeld

  const symbol = selectedCell?.textContent ?? 'Keines';

  const symbolText = symbol.length > 0 ? symbol : 'Keines';

  symbolInput.value = symbolText;
}

document.addEventListener('DOMContentLoaded', () => {
  updateSelection();
});

document.addEventListener('keydown', (e) => {

  switch (e.key) {
    case 'ArrowUp':
      currentY--;
      break;
    case 'ArrowDown':
      currentY++;
      break;
    case 'ArrowLeft':
      currentX--;
      break;
    case 'ArrowRight':
      currentX++;
      break;
    case 'PageUp':
      currentZ++;
      break;
    case 'PageDown':
      currentZ--;
      break;
  }

  updateSelection();
});