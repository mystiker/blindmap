import { AppState, Room } from "../state/app.state.js";
import { AppStateService, Subscription } from "../state/state.service.js";

const style = `
  <style>
    #grid-container {
      display: grid;
      grid-template-columns: repeat(100, 25px);
      grid-template-rows: repeat(100, 25px);
      height: 100vh; /* 100% der Viewport-Höhe */
      overflow: auto; /* Fügt Scrollbalken hinzu, falls das Grid den Viewport übersteigt */
      flex: 1 1 100%;
    }

    .cell {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #ccc; /* Optional, fügt einen Rahmen um jede Zelle hinzu */
    }

    .cell.selected {
      border: 2px solid blue;
    }
  </style>`;

const template = `
    <section id="grid-container" aria-controls="position" role="grid"></section>
  `;

export class GridComponent extends HTMLElement {
  private selectedCell: HTMLDivElement | null = null;
  private stateSubscription: Subscription | null = null;

  constructor() {
    super();
  }

  protected connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = style + template;

    for (let y = -50; y < 50; y++) {
      for (let x = -50; x < 50; x++) {
        const cell = this.createCell(x, y, 0);
        shadowRoot.querySelector("#grid-container")?.appendChild(cell);
      }
    }

    this.stateSubscription = AppStateService.subscribe((state) => {
      this.showCurrentCellSelection(state.position);
      this.updateCellContent(state.loadedLabyrinth.rooms ?? []);
    });
  }

  protected disconnectedCallback() {
    this.stateSubscription?.unsubscribe();
  }

  private updateCellContent(rooms: Room[]) {
    if (this.shadowRoot === null) {
      return;
    }

    for (const room of rooms) {
      const cell = this.shadowRoot.querySelector(
        `.cell[data-x="${room.x}"][data-y="${room.y}"][data-z="${room.z}"]`
      );

      if (cell) {
        cell.textContent = room.symbol;
      }
    }
  }

  private showCurrentCellSelection(position: AppState["position"]) {
    if (this.shadowRoot === null) {
      return;
    }

    if (this.selectedCell) {
      this.selectedCell.classList.remove("selected");
    }

    this.selectedCell = this.shadowRoot.querySelector(
      `.cell[data-x="${position.x}"][data-y="${position.y}"][data-z="${position.z}"]`
    );

    if (this.selectedCell) {
      this.selectedCell.classList.add("selected");
    }
  }

  private createCell(x: number, y: number, z: number): HTMLDivElement {
    const cell = document.createElement("div");

    cell.classList.add("cell");
    cell.setAttribute("data-x", x.toString());
    cell.setAttribute("data-y", y.toString());
    cell.setAttribute("data-z", z.toString());

    return cell;
  }
}

customElements.define("blindmap-grid", GridComponent);
