const gridContainer = document.getElementById("grid-container");

const symbolInput: HTMLInputElement | null = document.getElementById(
  "symbol_input"
) as HTMLInputElement | null;

if (symbolInput !== null) {
  symbolInput.addEventListener("input", () => {
    const selectedCell = document.querySelector(
      `.cell[data-x="${currentX}"][data-y="${currentY}"][data-z="${currentZ}"]`
    );

    if (selectedCell) {
      selectedCell.textContent = symbolInput.value;
    }
  });
}

function createCell(x: number, y: number, z: number) {
  const cell = document.createElement("div");

  cell.classList.add("cell");
  cell.setAttribute("data-x", x.toString());
  cell.setAttribute("data-y", y.toString());
  cell.setAttribute("data-z", z.toString());

  gridContainer?.appendChild(cell);
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
  document
    .querySelectorAll(".cell")
    .forEach((cell) => cell.classList.remove("selected"));
  const selectedCell = document.querySelector(
    `.cell[data-x="${currentX}"][data-y="${currentY}"][data-z="${currentZ}"]`
  );

  if (selectedCell !== null) {
    selectedCell.classList.add("selected");

    const positionElement = document.getElementById("position");

    if (positionElement !== null) {
      positionElement.textContent = `Position X: ${currentX}, Y: ${currentY}, Z: ${currentZ}`;
    }
    updateSymbol();
  }
}

function updateSymbol() {
  const selectedCell = document.querySelector(
    `.cell[data-x="${currentX}"][data-y="${currentY}"][data-z="${currentZ}"]`
  );

  if (symbolInput !== null) {
    // Setze das Symbol der aktuellen Zelle auf das Eingabefeld
    symbolInput.value = selectedCell?.textContent ?? "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateSelection();
});

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      currentY--;
      break;
    case "ArrowDown":
      currentY++;
      break;
    case "ArrowLeft":
      currentX--;
      break;
    case "ArrowRight":
      currentX++;
      break;
    case "PageUp":
      currentZ++;
      break;
    case "PageDown":
      currentZ--;
      break;
  }

  updateSelection();
});
