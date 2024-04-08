import { SidenavComponent } from "./components/sidenav.component.js";
import { GridComponent } from "./components/grid.component.js";
import { AppStateService } from "./state/state.service.js";
const style = `
  <style>
    blindmap-grid, blindmap-sidenav {
      display: contents;
    }
    main {
      display: flex;
      flex-direction: row;
    }
  </style>
`;
const template = `
  <main></main>
`;
export class AppComponent extends HTMLElement {
    sideNavComponent = null;
    gridComponent = null;
    constructor() {
        super();
    }
    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: "open" });
        this.sideNavComponent = new SidenavComponent();
        this.gridComponent = new GridComponent();
        shadowRoot.innerHTML = style + template;
        shadowRoot.querySelector("main")?.appendChild(this.gridComponent);
        shadowRoot.querySelector("main")?.appendChild(this.sideNavComponent);
        document.addEventListener("keydown", (e) => {
            this.handleNavigation(e.key);
        });
    }
    handleNavigation(key) {
        if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "PageUp", "PageDown"].includes(key)) {
            return;
        }
        let currentX = AppStateService.getState().position.x;
        let currentY = AppStateService.getState().position.y;
        let currentZ = AppStateService.getState().position.z;
        switch (key) {
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
        AppStateService.setState({
            ...AppStateService.getState(),
            position: {
                x: currentX,
                y: currentY,
                z: currentZ,
            },
        });
    }
}
customElements.define("app-shell", AppComponent);
