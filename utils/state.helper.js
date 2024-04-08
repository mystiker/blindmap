import { findRoom, updateRoom } from "../utils/lab.helper.js";
export function updateRoomInState(state, update) {
    const oldState = state;
    if (oldState.loadedLabyrinth.rooms !== undefined) {
        const room = findRoom(oldState.loadedLabyrinth.rooms, oldState.position.x, oldState.position.y, oldState.position.z);
        if (room !== undefined) {
            const newState = {
                ...oldState,
                loadedLabyrinth: {
                    ...oldState.loadedLabyrinth,
                    rooms: updateRoom(oldState.loadedLabyrinth.rooms, update),
                },
            };
            return newState;
        }
    }
    const newState = {
        ...oldState,
        loadedLabyrinth: {
            ...oldState.loadedLabyrinth,
            rooms: [...(oldState.loadedLabyrinth.rooms ?? []), update],
        },
    };
    return newState;
}
