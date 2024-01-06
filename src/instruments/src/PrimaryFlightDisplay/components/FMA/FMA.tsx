import React, { FC, useEffect, useState } from 'react'
import { getStyleForATMode, GetStringForATMode, ATModeTypes } from './FMA_Annunciators'
import { reverseVideo } from 'instruments/common/util/reverseVideo'
import './fma.scss'

export type FMAVars = {
  vAtMode: number
  vApStatus: number
  vLateralMode: number
  vVerticalMode: number
  vArmedAtMode: number
  vAtStatus: number
  vArmedLateralMode: number
  vArmedVerticalMode: number
  vSelectionSource: number
}

type T_FMAProps = {
  x: number
  y: number
  vars: FMAVars
}

export const FMA: FC<T_FMAProps> = (props: T_FMAProps): JSX.Element => {
  const AtMode = props.vars.vAtMode
  const ApStatus = props.vars.vApStatus
  const LateralMode = props.vars.vLateralMode
  const VerticalMode = props.vars.vVerticalMode
  const ArmedAtMode = props.vars.vArmedAtMode
  const AtStatus = props.vars.vAtStatus
  const ArmedLateralMode = props.vars.vArmedLateralMode
  const ArmedVerticalMode = props.vars.vArmedVerticalMode
  const SelectionSource = props.vars.vSelectionSource

  /**
   * todo: add logic for reverse video, dependent on the mode for each box, the prop is a boolean and we will just pass true if the mode has reverse video
   */
  const [sReverseVideo, setSReverseVideo] = useState<boolean>(true)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSReverseVideo((prevValue) => !prevValue)
    }, 500)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  type T_Colors = {
    bg: string
    color: string
  }
  const GetAtModeBoxColor = (): T_Colors => {
    if (AtMode === ATModeTypes.AT_r_rv) {
      return {
        bg: reverseVideo({ color: 'red', backgroundColor: 'white', reverse: sReverseVideo }).backgroundColor,
        color: reverseVideo({ color: 'red', backgroundColor: 'white', reverse: sReverseVideo }).color
      }
    } else if (AtMode === ATModeTypes.AT_g_rv) {
      return {
        bg: reverseVideo({ color: 'green', backgroundColor: 'white', reverse: sReverseVideo }).backgroundColor,
        color: reverseVideo({ color: 'green', backgroundColor: 'white', reverse: sReverseVideo }).color
      }
    } else return { bg: getStyleForATMode(AtMode).backgroundColor, color: getStyleForATMode(AT_Mode_).color }
  }

  return (
    <div className="fma-container" style={{ left: props.x, top: props.y }}>
      <FMAGrid
        AT_Mode_Box={{
          backgroundColor: GetAtModeBoxColor().bg,
          element: (
            <GetStringForATMode
              ovrdFontColor={GetAtModeBoxColor().color}
              style={getStyleForATMode(AtMode)}
              mode={AtMode}
            />
          )
        }}
        AP_Status_Box={{
          backgroundColor: getStyleForATMode(ApStatus).backgroundColor,
          element: <GetStringForATMode style={getStyleForATMode(ApStatus)} mode={ApStatus} />
        }}
        AP_AT_Source_box={{
          backgroundColor: getStyleForATMode(SelectionSource).backgroundColor,
          element: <GetStringForATMode style={getStyleForATMode(SelectionSource)} mode={SelectionSource} />
        }}
        Lateral_Mode_Box={{
          backgroundColor: getStyleForATMode(Lateral_Mode_).backgroundColor,
          element: <GetStringForATMode style={getStyleForATMode(Lateral_Mode_)} mode={Lateral_Mode_} />
        }}
        Vertical_Mode_Box={{
          backgroundColor: getStyleForATMode(Vertical_Mode_).backgroundColor,
          element: <GetStringForATMode style={getStyleForATMode(Vertical_Mode_)} mode={Vertical_Mode_} />
        }}
        Armed_AT_Mode_Box={{
          backgroundColor: getStyleForATMode(Armed_AT_Mode_).backgroundColor,
          element: <GetStringForATMode style={getStyleForATMode(Armed_AT_Mode_)} mode={Armed_AT_Mode_} />
        }}
        AT_Status_Box={{
          backgroundColor: getStyleForATMode(AT_Status_).backgroundColor,
          element: <GetStringForATMode style={getStyleForATMode(AT_Status_)} mode={AT_Status_} />
        }}
        Armed_Lateral_Mode_Box={{
          backgroundColor: getStyleForATMode(Armed_Lateral_Mode_).backgroundColor,
          element: <GetStringForATMode style={getStyleForATMode(Armed_Lateral_Mode_)} mode={Armed_Lateral_Mode_} />
        }}
        Armed_Vertical_Mode_Box={{
          backgroundColor: getStyleForATMode(Armed_Vertical_Mode_).backgroundColor,
          element: <GetStringForATMode style={getStyleForATMode(Armed_Vertical_Mode_)} mode={Armed_Vertical_Mode_} />
        }}
        SelectionSourceBox={{
          backgroundColor: getStyleForATMode(SelectionSource).backgroundColor,
          element: <GetStringForATMode style={getStyleForATMode(SelectionSource)} mode={SelectionSource} />
        }}
      />
    </div>
  )
}

type T_BoxProps = {
  backgroundColor: string
  element: JSX.Element
  reverseVideo?: boolean
}

type T_FMAGridProps = {
  AT_Mode_Box: T_BoxProps
  AP_Status_Box: T_BoxProps
  AP_AT_Source_box: T_BoxProps
  Lateral_Mode_Box: T_BoxProps
  Vertical_Mode_Box: T_BoxProps
  Armed_AT_Mode_Box: T_BoxProps
  AT_Status_Box: T_BoxProps
  Armed_Lateral_Mode_Box: T_BoxProps
  Armed_Vertical_Mode_Box: T_BoxProps
  SelectionSourceBox: T_BoxProps
}

const FMAGrid: FC<T_FMAGridProps> = (props: T_FMAGridProps): JSX.Element => {
  return (
    <svg className="fma-svg" viewBox="0 0 374 56" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="1.5"
        y="1.5"
        width="371"
        height="53"
        fill="transparent"
        stroke="white"
        strokeWidth={3}
        strokeLinejoin="round"
        strokeMiterlimit={'round'}
        rx={2}
        ry={2}
      />
      <rect id="AT_Mode_Box" x="3" y="3" width="100" height="26" fill={props.AT_Mode_Box.backgroundColor} />
      <text x={50} y={25} textAnchor="middle" color="red" fontSize={25}>
        {props.AT_Mode_Box.element}
      </text>
    </svg>
  )
}
