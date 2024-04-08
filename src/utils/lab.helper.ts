import { Room } from "../state/app.state.js";

export function findRoom(rooms: Room[], x: number, y: number, z: number): Room | undefined {
  return rooms.find((room) => room.x === x && room.y === y && room.z === z);
}

export function updateRoom(rooms: Room[], room: Room): Room[] {
  return rooms.map((it) => {
    if (it.x === room.x && it.y === room.y && it.z === room.z) {
      return { ...room };
    }
    return room;
  });
}