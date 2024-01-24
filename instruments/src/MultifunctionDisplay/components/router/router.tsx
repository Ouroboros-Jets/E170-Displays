import React from 'react'
import { useObjLocalVar } from 'instruments/common/Hooks/simVars'
import { Status } from '../pages/Status/Status'

const MfdRouter = (
  isCallingTop: boolean,
  system: boolean,
  topPageArg?: number,
  bottomPageArg?: number
): JSX.Element => {
  const [topPage] = useObjLocalVar('MFD_ROUTER_TOP', 'Number')
  const [bottomPage] = useObjLocalVar('MFD_ROUTER_BOTTOM', 'Number')
  const [systemPage] = useObjLocalVar('MFD_ROUTER_SYSTEM', 'Number')

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
          returnPage = <div>MAP</div>
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
