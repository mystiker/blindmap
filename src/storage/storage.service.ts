import { AppState } from "../state/app.state.js";

class StorageService<T> {

  public saveState(state: T): void {

    console.log("Saving state", state);

    localStorage.setItem("state", JSON.stringify(state));
  }

  public getState(): T | null {
    const item = localStorage.getItem("state");

    if (item === null) {
      return null;
    }

    return JSON.parse(item);
  }
}

export const AppStorageService = new StorageService<AppState>();