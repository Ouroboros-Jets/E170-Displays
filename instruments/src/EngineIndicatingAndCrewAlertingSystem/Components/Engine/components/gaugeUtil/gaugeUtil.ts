type T_Coords = {
  x: number;
  y: number;
};
/**
 *
 * @param centerX center of the circle you are trying to find the coords on X axis
 * @param centerY center of the circle you are trying to find the coords on Y axis
 * @param radius radius of the circle you are trying to find the coords on
 * @param angle input from sim (shits gonna be in radians so we convert it to degrees in the function)
 * @returns object with x and y coords
 */
export const findCoordsOnCircle = (centerX: number, centerY: number, radius: number, angle: number): T_Coords => {
  let x = centerX + radius * Math.sin((angle * Math.PI) / 180);
  let y = centerY - radius * Math.cos((angle * Math.PI) / 180);
  return { x: x, y: y };
};
