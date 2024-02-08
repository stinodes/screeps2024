declare global {
  interface Memory {
    init: boolean;
    myRooms: string[];
  }
}

export const initMemory = (mem: Memory) => {
  if (mem.init && mem.myRooms?.length > 0) return;
  mem.rooms = {};
  mem.creeps = {};
  mem.myRooms = Object.values(Game.spawns).map(spawn => spawn.room.name);
};

export const getRoom = (name: string) => Game.rooms[name];
export const getCreepMemory = (name: string) => Memory.creeps[name];
export const getCreep = (memory: CreepMemory) => Game.creeps[memory.name];
