import React from 'react'
import { useObjLocalVar } from 'instruments/common/Hooks/simVars'
import '../buttonBars.scss'

type T_SystemButtonProps = {
  text: string
  routeTo: number
  disabled?: boolean
}

export const SystemButton: React.FC<T_SystemButtonProps> = (props: T_SystemButtonProps): JSX.Element => {
  const [systemPage, setSystemPage] = useObjLocalVar('MFD_ROUTER_SYSTEM', 'Number')
  const handleSystemButtonClick = (route: number): void => {
    setSystemPage(route)
  }
  let isActive: boolean = false
  if (systemPage === props.routeTo) {
    isActive = true
  } else {
    isActive = false
  }

  return (
    <div>
      <div
        className={`system-button ${isActive ? 'active' : ''}`}
        onClick={() => {
          handleSystemButtonClick(props.routeTo)
        }}
      >
        {props.text}
      </div>
    </div>
  )
}
