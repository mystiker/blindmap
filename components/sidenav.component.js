import { AppStateService } from "../state/state.service.js";
import { updateRoomInState } from "../utils/state.helper.js";
const style = `
  <style>
    #side {
      display: flex;
      flex-direction: column;
      overflow: auto;
      flex: 1 0 200px;
    }
  </style>
`;
const template = `
  <aside id="side">
    <caption>Raumbeschreibung</caption>
    <div role="status">
      <p id="position">Position X: , Y: , Z: </p>
      <label for="symbol_input">Symbol:</label>
      <input type="text" id="symbol_input" aria-label="Symbolfeld" name="symbol_input" />
    </div>
  </aside>
`;
export class SidenavComponent extends HTMLElement {
    positionElement = null;
    symbolInput = null;
    stateSubscription = null;
    constructor() {
        super();
    }
    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = style + template;
        this.positionElement = shadowRoot.querySelector("#position");
        this.symbolInput = shadowRoot.querySelector("#symbol_input");
        shadowRoot.querySelector("#symbol_input")?.addEventListener("input", () => {
            const oldState = AppStateService.getState();
            const symbol = this.symbolInput?.value ?? "";
            const newState = updateRoomInState(oldState, {
                x: oldState.position.x,
                y: oldState.position.y,
                z: oldState.position.z,
                symbol: symbol,
            });
            AppStateService.setState(newState);
        });
        this.stateSubscription = AppStateService.subscribe((state) => this.onAppStateChange(state));
    }
    disconnectedCallback() {
        this.stateSubscription?.unsubscribe();
    }
    onAppStateChange(state) {
        this.updatePosition(state.position);
        this.updateSymbol(state);
    }
    updatePosition(position) {
        if (this.positionElement === null) {
            console.warn("Could not update Position: Position Element not found");
            return;
        }
        this.positionElement.textContent = `Position X: ${position.x}, Y: ${position.y}, Z: ${position.z}`;
    }
    updateSymbol(state) {
        if (this.symbolInput === null) {
            console.warn("Could not update Symbol: Symbol Input Element not found");
            return;
        }
        const room = state.loadedLabyrinth.rooms?.find((room) => room.x === state.position.x &&
            room.y === state.position.y &&
            room.z === state.position.z);
        this.symbolInput.value = room?.symbol ?? "";
    }
}
customElements.define("blindmap-sidenav", SidenavComponent);
