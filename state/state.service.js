import { initialState } from "./app.state.js";
class StateService {
    state;
    listeners;
    constructor(initialState) {
        this.state = initialState;
        this.listeners = [];
    }
    getState() {
        return this.state;
    }
    subscribe(listener, onlyChanges = false) {
        this.listeners.push(listener);
        if (!onlyChanges) {
            listener(this.state);
        }
        return {
            unsubscribe: () => {
                this.listeners = this.listeners.filter((l) => l !== listener);
            },
        };
    }
    setState(newState) {
        this.state = newState;
        console.log("New State", this.state);
        for (const listener of this.listeners) {
            listener(this.state);
        }
    }
}
export const AppStateService = new StateService(initialState);
