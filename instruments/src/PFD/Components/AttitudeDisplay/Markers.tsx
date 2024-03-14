import { FSComponent, DisplayComponent, type VNode } from '@microsoft/msfs-sdk'
import { PathWithBlackBackground } from '../../Util/PathWithBlackBackground'

export class AttitudeMarkers extends DisplayComponent<any> {
  public render(): VNode {
    return (
      <g>
        <PathWithBlackBackground
          d="M 166 249 L 217 249  L 217 268 L 209 268 L 209 258 L 166 258 L 166 249"
          fill="black"
          fillTop="white"
          StrokeWidth={3}
          strokeWidthTop={2}
          fillTop2="black"
        />

        <PathWithBlackBackground
          d="M 384 249 L 333 249 L 333 268 L 341 268 L 341 258 L 384 258 L 384 249"
          fill="black"
          fillTop="white"
          StrokeWidth={3}
          strokeWidthTop={2}
          fillTop2="black"
        />

        <PathWithBlackBackground
          d="M 280 249 L 270 249 L 270 258 L 280 258 L 280 258 L 280 249"
          fill="black"
          fillTop="white"
          StrokeWidth={3}
          strokeWidthTop={2}
          fillTop2="black"
        />
      </g>
    )
  }
}
