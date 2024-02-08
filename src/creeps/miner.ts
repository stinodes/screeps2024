import { Class, definePhase, ok, registerClass } from "./phases";

interface MinerMemory extends CreepMemory {
  role: "miner";
  pos: RoomPosition;
  resource: Id<Source>;
}
export type Miner = Class<MinerMemory, "moveTo" | "mine", Source>;

export const miner = registerClass<Miner>({
  name: "miner",
  moveTo: definePhase((memory, creep) => {
    if (creep.pos.isEqualTo(memory)) return ok("mine");
    creep.moveTo(memory);
    return ok("moveTo");
  }),
  mine: definePhase((_, creep, target: null | Source) => {
    if (target) creep.harvest(target);
    return ok("mine");
  })
});
