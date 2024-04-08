export interface Room {
  x: number;
  y: number;
  z: number;
  symbol: string;
}

export interface Labyrinth {
  name: string;
  rooms?: Room[];
}

export interface AppState {
  position: {
    x: number;
    y: number;
    z: number;
  };
  loadedLabyrinth: Labyrinth;
  storedLabyrinths?: Labyrinth[];
}

export const initialState: AppState = {
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
  loadedLabyrinth: {
    name: "Default",
  },
};
