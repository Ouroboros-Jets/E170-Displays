import React from 'react'
import { useObjLocalVar } from 'instruments/common/Hooks/simVars'

const MfdRouter = (isCallingTop: boolean, topPageArg?: number, bottomPageArg?: number): JSX.Element => {
  const [topPage] = useObjLocalVar('MFD_ROUTER_TOP', 'Number')
  const [bottomPage] = useObjLocalVar('MFD_ROUTER_BOTTOM', 'Number')

  let returnPage: JSX.Element = <></>

  if (isCallingTop) {
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
