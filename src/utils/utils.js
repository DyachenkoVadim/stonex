export const getStarDirection = (side) => {
  if (side === "left") return { x: 1, y: Math.random() > 0.5 ? 1 : -1 };
  if (side === "right") return { x: -1, y: Math.random() > 0.5 ? 1 : -1 };
  if (side === "top") return { x: Math.random() > 0.5 ? 1 : -1, y: 1 };
};

export const getCometDirection = (side) => {
  if (side === "left") return { x: 1, y: 1 };
  if (side === "right") return { x: -1, y: -1 };
  if (side === "top") return { x: -1, y: 1 };
};
