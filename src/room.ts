import { creep } from "creeps";
import { creepsQuery } from "utils/accessors";
import { findNeighbours } from "utils";

declare global {
  interface RoomMemory {
    scans: string[];
    name: string;
    sources: Id<Source>[];
    designations: { id: Id<Source>; pos: RoomPosition }[];
  }
}

const sourceScan = (memory: RoomMemory): RoomMemory => {
  const name = "sources";
  if (memory.scans.indexOf(name) !== -1) return memory;

  const roomObj = Game.rooms[memory.name];
  const sources = roomObj.find(FIND_SOURCES);
  const designations = sources
    .map(source =>
      findNeighbours(source.pos)
        .filter(pos => roomObj.getTerrain().get(pos.x, pos.y) === 0)
        .map(pos => ({ pos, id: source.id }))
    )
    .reduce((prev, v) => prev.concat(v));

  memory.scans.push(name);
  memory.sources = sources.map(s => s.id);
  memory.designations = designations;

  return memory;
};

const scans = [sourceScan];

const scanRoom = (name: string) => {
  const memory = Game.rooms[name].memory;
  memory.name = name;

  scans.forEach(s => s(memory));
};

export const room = (name: string) => {
  console.log(`Running for ${name}`);

  // Scan
  if (Game.time % 100 === 0) scanRoom(name);

  // Spawn

  // Run
  creepsQuery().hasRoom(name).finish().forEach(creep);
};
