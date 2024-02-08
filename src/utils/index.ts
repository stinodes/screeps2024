export const findNeighbours = (pos: RoomPosition) => {
  const offsets = [-1, 0, 1];
  const positions: RoomPosition[] = [];
  offsets.forEach(x => {
    offsets.forEach(y => {
      positions.push({ x: pos.x + x, y: pos.y + y });
    });
  }, []);
  return positions;
};
