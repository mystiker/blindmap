export function findRoom(rooms, x, y, z) {
    return rooms.find((room) => room.x === x && room.y === y && room.z === z);
}
export function updateRoom(rooms, room) {
    return rooms.map((it) => {
        if (it.x === room.x && it.y === room.y && it.z === room.z) {
            return { ...room };
        }
        return room;
    });
}
