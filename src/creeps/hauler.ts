import { Class, definePhase, newTarget, ok, registerClass } from "./phases";
import { pickUp, transfer } from "./actions";

export type Hauler = Class<CreepMemory, "pickup" | "deposit", Resource | AnyStoreStructure>;
export const hauler = registerClass<Hauler>({
  name: "hauler",
  deposit: definePhase(
    (_, creep, target) => {
      if (target instanceof Structure) {
        transfer(creep, target);
      }
      if (creep.store.getUsedCapacity() === 0) return ok("pickup");
      else if (target instanceof Structure && target.store.getFreeCapacity() === 0)
        return newTarget("deposit");
      return ok("deposit");
    },
    (_, creep) =>
      (
        creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
          filter: structure => "store" in structure && structure.store.getFreeCapacity() !== 0
        }) as AnyStoreStructure
      )?.id
  ),
  pickup: definePhase(
    (_, creep, target) => {
      if (target instanceof Resource) {
        pickUp(creep, target);
      }
      if (creep.store.getFreeCapacity() === 0) return ok("deposit");
      if (target instanceof Resource && target.amount === 0) return newTarget("pickup");
      return ok("pickup");
    },
    (_, creep) => creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES)?.id
  )
});
