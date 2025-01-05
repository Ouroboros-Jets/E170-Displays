import React, { useState, useEffect } from 'react'
import { useObjLocalVar } from 'instruments/common/Hooks/simVars'
import { Status } from '../pages/Status/Status'
import { MapLayer } from '../MapLayer/MapLayer'
import { type T_FlightPlan } from 'instruments/common/WaypointTypes/WaypointTypes'

const MfdRouter = (
  isCallingTop: boolean,
  system: boolean,
  topPageArg?: number,
  bottomPageArg?: number
): JSX.Element => {
  const [topPage] = useObjLocalVar('MFD_ROUTER_TOP', 'Number')
  const [bottomPage] = useObjLocalVar('MFD_ROUTER_BOTTOM', 'Number')
  const [systemPage] = useObjLocalVar('MFD_ROUTER_SYSTEM', 'Number')

  /**
   * sample flight plan for testing, array[0] will be starting airport, array[1] first waypoint, etc
   */
  const sampleFlightPlan: T_FlightPlan = [
    { name: 'KPHX', lon: -112.01385, lat: 33.43717, altitude: 1135, active: false },
    { name: 'KONTE', lon: -111.95, lat: 33.43, altitude: 5000, active: true },
    { name: 'KIWA', lon: -111.65405, lat: 33.30471, altitude: 1384, active: false }
  ]

  const [flightPlanPath, setFlightPlanPath] = useState<Array<[number, number]>>([])
  const [activeFlightPlanPath, setActiveFlightPlanPath] = useState<Array<[number, number]>>([])
  const setPathCoords = (): void => {
    const pathCoords: Array<[number, number]> = []
    const activeCoords: Array<[number, number]> = []
    for (let i = 0; i < sampleFlightPlan.length; i++) {
      if (sampleFlightPlan[i].active) {
        if (i !== 0) {
          activeCoords.push(
            [sampleFlightPlan[i].lat, sampleFlightPlan[i].lon],
            [sampleFlightPlan[i - 1].lat, sampleFlightPlan[i - 1].lon]
          )
        }
      }
      pathCoords.push([sampleFlightPlan[i].lat, sampleFlightPlan[i].lon])
    }
    setFlightPlanPath(pathCoords)
    setActiveFlightPlanPath(activeCoords)
  }

  // pretty sure the best way to handle this will be in js but we may also want to try it in rust
  useEffect(() => {
    setPathCoords()
  }, [])

  let returnPage: JSX.Element = <></>
  if (isCallingTop) {
    if (system) {
      switch (systemPage) {
        case 0:
          returnPage = <Status />
          break
        case 1:
          returnPage = <div>FLIGHT CTRL</div>
          break
        case 2:
          returnPage = <div>HYDRAULICS</div>
          break
        case 3:
          returnPage = <div>FUEL</div>
          break
        case 4:
          returnPage = <div>ELECTRICAL</div>
          break
        case 5:
          returnPage = <div>ECS</div>
          break
        case 6:
          returnPage = <div>ANTI-ICE</div>
          break
        default:
          returnPage = <></>
      }
    } else {
      switch (topPage) {
        case 0:
          returnPage = (
            <MapLayer
              sampleFlightPlan={sampleFlightPlan}
              flightPlanPath={flightPlanPath}
              activeFlightPlanPath={activeFlightPlanPath}
            />
          )
          break
        case 1:
          returnPage = <div>PLAN</div>
          break
        case 2:
          returnPage = <div>SYSTEM</div>
          break
        default:
          returnPage = <></>
      }
    }
  } else {
    switch (bottomPage) {
      case 0:
        returnPage = <div>TCAS</div>
        break
      case 1:
        returnPage = <div>WEATHER</div>
        break
      case 2:
        returnPage = <div>CHECKLIST</div>
        break
      default:
        returnPage = <></>
    }
  }

  return returnPage
}

export const getTopPage = (): number => {
  const [topPage] = useObjLocalVar('MFD_ROUTER_TOP', 'Number')
  return topPage as number
}

export default MfdRouter
