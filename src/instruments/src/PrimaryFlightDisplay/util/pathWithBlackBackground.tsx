import React, { type FC } from 'react'

type T_pathWithBlackBackgroundProps = {
  d: string
  fill: string
  fillTop: string
  StrokeWidth: number
  strokeWidthTop: number
  forceTransparent?: boolean
  fillTop2?: string
  forceEndCap?: boolean
}

export const PathWithBlackBackground: FC<T_pathWithBlackBackgroundProps> = (
  props: T_pathWithBlackBackgroundProps
): JSX.Element => {
  return (
    <g>
      <path
        d={props.d}
        fill={props.forceTransparent !== null && props.forceTransparent === true ? 'transparent' : 'black'}
        strokeWidth={props.StrokeWidth}
        stroke={props.fill}
        strokeLinecap={props.forceEndCap !== null && props.forceEndCap === true ? 'butt' : 'round'}
        strokeLinejoin="round"
      />
      <path
        d={props.d}
        fill={props.fillTop2 !== null ? props.fillTop2 : props.fillTop}
        strokeWidth={props.strokeWidthTop}
        stroke={props.fillTop}
        strokeLinecap={props.forceEndCap !== null && props.forceEndCap === true ? 'butt' : 'round'}
        strokeLinejoin="round"
      />
    </g>
  )
}
