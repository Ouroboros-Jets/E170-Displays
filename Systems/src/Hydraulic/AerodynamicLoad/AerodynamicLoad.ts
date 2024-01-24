type T_GetAerodynamicDragArgs = {
  coefOfDrag: number // Coefficient of drag (Cd)
  area: number // Reference area (A)
  airDensity: number // Air density (ρ)
  airspeed: number // Airspeed (V)
}

/**
 * Calculate aerodynamic drag force using the formula: F = 1/2 * Cd * A * ρ * V^2
 *
 * @param args - Arguments for the calculation.
 *   - `coefOfDrag`: Coefficient of drag (Cd) represents the drag characteristics of the object.
 *   - `area`: Reference area (A) is the cross-sectional area of the object exposed to the air.
 *   - `airDensity`: Air density (ρ) is the density of the air through which the object is moving.
 *   - `airspeed`: Airspeed (V) is the speed of the object relative to the air.
 *
 * @returns - Aerodynamic drag force.
 */
export const getAerodynamicDrag = (args: T_GetAerodynamicDragArgs): number => {
  // F = 1/2 * Cd * A * ρ * V^2
  const { coefOfDrag, area, airDensity, airspeed } = args

  return 0.5 * coefOfDrag * area * airDensity * Math.pow(airspeed, 2)
}
