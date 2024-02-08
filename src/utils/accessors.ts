export const creepsQuery = () => {
  let data: CreepMemory[] = Object.values(Memory.creeps);

  const query = {
    hasRoom: (room: string) => {
      data = data.filter(creep => creep.spawnRoom === room);
      return query;
    },
    hasClass: (role: string) => {
      data = data.filter(creep => creep.role === role);
      return query;
    },
    finish: () => data,
    finishOne: () => data[0]
  };
  return query;
};
