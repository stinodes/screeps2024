import { getCreep } from "memory";

enum Code {
  OK,
  NEW_TARGET
}
interface PhaseReturnCode<P extends string> {
  code: Code;
  phase: P;
}

export interface Phase<C extends CreepMemory, P extends string, T extends _HasId> {
  exec: (memory: C, creep: Creep, target: null | T) => PhaseReturnCode<P>;
  getTarget: (memory: C, creep: Creep) => null | undefined | Id<T>;
}
export type Class<C extends CreepMemory, P extends string, T extends _HasId> = Record<
  P,
  Phase<C, P, T>
> & { name: string; body: BodyPartConstant[] };

export const newTarget = <P extends string>(phase: P): PhaseReturnCode<P> => ({
  code: Code.NEW_TARGET,
  phase
});
export const ok = <P extends string>(phase: P): PhaseReturnCode<P> => ({
  code: Code.OK,
  phase
});

export const definePhase = <C extends CreepMemory, P extends string, T extends _HasId>(
  exec: Phase<C, P, T>["exec"],
  getTarget: Phase<C, P, T>["getTarget"] = () => null
) => ({
  exec,
  getTarget
});

export const doPhase = <
  C extends CreepMemory,
  P extends string,
  T extends _HasId,
  Defs extends Class<C, P, T> = Class<C, P, T>
>(
  memory: C,
  phaseDefs: Defs
) => {
  const currentPhase = memory.phase as P;
  const phase = phaseDefs[currentPhase];
  const creep = getCreep(memory);
  if (!memory.target) memory.target = phase.getTarget(memory, creep) || null;
  const target = memory.target && Game.getObjectById(memory.target as Id<T>);
  const newPhase = phase.exec(memory, creep, target);
  if (newPhase.phase !== memory.phase || newPhase.code === Code.NEW_TARGET) {
    memory.phase = newPhase.phase;
    memory.target = phase.getTarget(memory, creep) || null;
  }
};

const classes: { [name: string]: Class<unknown, unknown, unknown> } = {};

export const registerClass = <C extends Class<unkown, unknown, unknown>>(classDef: C) => {
  classes[classDef.name] = classDef;
  return classDef;
};
export const getClass = <C extends CreepMemory, P extends string, T extends _HasId>(
  name: string
): Class<C, P, T> => {
  return classes[name];
};
