import React from 'react'
import { useObjLocalVar } from 'instruments/common/Hooks/simVars'
import '../buttonBars.scss'

type T_SystemButtonProps = {
  text: string
  routeTo: number
  disabled?: boolean
  setShown: React.Dispatch<React.SetStateAction<boolean>>
}

export const SystemButton: React.FC<T_SystemButtonProps> = (props: T_SystemButtonProps): JSX.Element => {
  const [systemPage, setSystemPage] = useObjLocalVar('MFD_ROUTER_SYSTEM', 'Number')
  const handleSystemButtonClick = (route: number): void => {
    setSystemPage(route)
    props.setShown(false)
  }
  const isActive = systemPage === props.routeTo
  const [isHovered, setIsHovered] = React.useState<boolean>(false)

  return (
    <div
      onMouseEnter={() => {
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
      }}
      className="system-button-wrapper"
    >
      {isHovered && (
        <div
          onClick={() => {
            props.setShown(false)
          }}
          className="system-menu-close-button"
          style={{ top: `${props.routeTo * 45}px` }}
        >
          <div className="system-button-center-close">
            <div className="system-button-children-close">X</div>
          </div>
          <div className="system-button-background-close"></div>
        </div>
      )}
      <div
        className={`system-button-container`}
        style={{ top: `${props.routeTo * 45}px` }}
        onClick={() => {
          handleSystemButtonClick(props.routeTo)
        }}
      >
        <div className="system-button-center">
          <div className="system-button-children">
            {props.text}
            <div className="active-circle-outer">{isActive && <div className="active-circle-inner"></div>}</div>
          </div>
        </div>
        <div className="system-button-background"></div>
      </div>
    </div>
  )
}
