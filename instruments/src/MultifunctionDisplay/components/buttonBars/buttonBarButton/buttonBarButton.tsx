import React from 'react'
import '../buttonBars.scss'
import { useObjLocalVar } from 'instruments/common/Hooks/simVars'

type T_ButtonBarButtonProps = {
  isSystemButton: boolean
  text: string
  isTop: boolean
  routeTo: number
  setSystemMenu: React.Dispatch<React.SetStateAction<boolean>>
  systemMenu: boolean
  setShowSystems: React.Dispatch<React.SetStateAction<boolean>>
  showSystems: boolean
}

export const ButtonBarButton: React.FC<T_ButtonBarButtonProps> = (props: T_ButtonBarButtonProps): JSX.Element => {
  const [topPage, setTopPage] = useObjLocalVar('MFD_ROUTER_TOP', 'Number')
  const [bottomPage, setBottomPage] = useObjLocalVar('MFD_ROUTER_BOTTOM', 'Number')
  const handleButtonClick = (to: number): void => {
    if (props.isTop !== null && props.isTop !== undefined && props.isTop) {
      setTopPage(to)
      props.setShowSystems(false)
    } else {
      setBottomPage(to)
    }
  }

  const handleSystemButtonClick = (): void => {
    if (!props.showSystems) {
      props.setShowSystems(true)
    } else {
      props.setSystemMenu(!props.systemMenu)
    }
  }

  return (
    <div
      onClick={() => {
        props.isSystemButton ? handleSystemButtonClick() : handleButtonClick(props.routeTo)
      }}
      className="button-container"
    >
      <div className="button-center">
        <div className="button-children">{props.text}</div>
      </div>
      <div className="button-background" />
    </div>
  )
}
