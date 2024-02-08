import { doPhase, getClass } from "./phases";

declare global {
  interface CreepMemory {
    name: string;
    spawnRoom: string;
    role: string;
    target: null | Id<_HasId>;
    phase: string;
  }
}

export const creep = (memory: CreepMemory) => {
  const classRole = getClass(memory.role);
  doPhase(memory, classRole);
};
