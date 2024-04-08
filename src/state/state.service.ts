import { AppState, initialState } from "./app.state.js";

type ListenerFn<T> = (state: T) => void;

export type Subscription = { unsubscribe: () => void };

class StateService<T> {
  private state: T;
  private listeners: ListenerFn<T>[];

  constructor(initialState: T) {
    this.state = initialState;
    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  subscribe(listener: ListenerFn<T>, onlyChanges = false): Subscription {
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

  setState(newState: T) {
    this.state = newState;

    console.log("New State", this.state);

    for (const listener of this.listeners) {
      listener(this.state);
    }
  }
}

export const AppStateService = new StateService<AppState>(initialState);
