export type T_Waypoint = {
  lon: number
  lat: number
  name: string
  altitude: number
}
// a waypoint will be a single entry in the flight plan, a flight plan will be comprised of an array of waypoints, we will draw accordingly

export type T_FlightPlan = T_Waypoint[]
