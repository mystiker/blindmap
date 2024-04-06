const gridContainer = document.getElementById('grid-container');

function createCell(x, y) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.setAttribute('data-x', x);
  cell.setAttribute('data-y', y);
  gridContainer.appendChild(cell);
}

// Initial 100x100 Grid erstellen
for (let y = -50; y < 50; y++) {
  for (let x = -50; x < 50; x++) {
    createCell(x, y);
  }
}

// Erweiterung für unendliches Grid hinzufügen
// Beispiel: Beim Scrollen am Rand des Fensters weitere Zellen hinzufügen
window.addEventListener('scroll', () => {
  // Logik zum Hinzufügen weiterer Zellen
});

let currentX = 0; // Startposition X
let currentY = 0; // Startposition Y

function updateSelection() {
  document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('selected'));
  const selectedCell = document.querySelector(`.cell[data-x="${currentX}"][data-y="${currentY}"]`);
  selectedCell.classList.add('selected');
}

document.addEventListener('DOMContentLoaded', () => {
  updateSelection(); // Initialisiere die Auswahl beim Laden der Seite
});

document.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'ArrowUp': currentY--; break;
    case 'ArrowDown': currentY++; break;
    case 'ArrowLeft': currentX--; break;
    case 'ArrowRight': currentX++; break;
  }
  updateSelection();
});