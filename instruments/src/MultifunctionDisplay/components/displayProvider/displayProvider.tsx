import React from 'react'
import './displayProvider.scss'
import { LowerButtonBar, UpperButtonBar } from '../buttonBars/buttonBars'
import { getTopPage } from '../router/router'

type T_DisplayProviderProps = {
  porportionSize: number
  topPage: JSX.Element
  bottomPage: JSX.Element
}

const DisplayProvider: React.FC<T_DisplayProviderProps> = (props: T_DisplayProviderProps): JSX.Element => {
  // const resizePerportion: number = props.porportionSize
  /**
   * we need to resize the components in some combinations,
   * this will be done automatically by flexbox unless we need to do it maually (thats why this prop is here)
   */

  return (
    <div className="MFD-container">
      <UpperButtonBar currentPage={getTopPage()} />
      <div className="upper-content-container">{props.topPage}</div>
      <div className="center-divider" />
      <div className="lower-content-container">{props.bottomPage}</div>
      <LowerButtonBar />
    </div>
  )
}

export default DisplayProvider
