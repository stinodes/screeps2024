export const doOrMove = (creep: Creep, action: keyof Creep, ...args: Parameters<Creep[A]>) => {
  if (creep[action](...args) === ERR_NOT_IN_RANGE) {
    creep.moveTo(args[0]);
  }
};

export const pickUp = (creep: Creep, target: Resource) => {
  doOrMove(creep, "pickup", target);
};

export const transfer = (
  creep: Creep,
  target: AnyStoreStructure,
  resourceType: ResourceConstant = RESOURCE_ENERGY
) => {
  doOrMove(creep, "transfer", target, resourceType);
};

export const build = (creep: Creep, target: ConstructionSite) => {
  doOrMove(creep, "build", target);
};

export const repair = (creep: Creep, target: Structure) => {
  doOrMove(creep, "repair", target);
};

export const upgrade = (creep: Creep, target: StructureController) => {
  doOrMove(creep, "upgrade", target);
};
