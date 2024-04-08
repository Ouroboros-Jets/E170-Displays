import { type ComponentProps, DisplayComponent, type EventBus, FSComponent, type VNode } from '@microsoft/msfs-sdk'
import './index.scss'
import { PathWithBlackBackground } from '../../Util/PathWithBlackBackground'

type T_VerticalSpeedIndicatorProps = ComponentProps & {
  bus: EventBus
}

const fpmToPixels = (fpm: number): number => {
  const seg1 = 0.104 * Math.min(Math.abs(fpm), 1000)
  const seg2 = 0.04 * Math.min(Math.max(Math.abs(fpm) - 1000, 0), 1000)
  const seg3 = 0.042 * Math.max(Math.abs(fpm) - 2000, 0)
  const pixels = fpm > 6000 || fpm < -6000 ? 180 : seg1 + seg2 + seg3
  return fpm > 0 ? -pixels : pixels
}

export default class VerticalSpeedIndicator extends DisplayComponent<T_VerticalSpeedIndicatorProps> {
  verticalSpeed = 0
  constrainedVSpeed = 0
  vsiReadout = 0
  vsiReadoutBox = false
  vsiWarning = false

  public render(): VNode {
    return (
      <g>
        <path d="M 545 100 L 545 400 L 570 400 L 595 350 L 595 150 L 570 100 L 545 100" fill="black" opacity={0.3} />
        <clipPath d="M 545 100 L 545 400 L 570 400 L 595 350 L 595 150 L 570 100 L 545 100"></clipPath>

        <path d="M 565 247 L 560  246" stroke="white" stroke-width={2} fill="transparent" stroke-linecap="round" />

        <path d="M 565 242 L 560  241" stroke="white" stroke-width={2} fill="transparent" stroke-linecap="round" />

        <path d="M 565 237 L 560  236" stroke="white" stroke-width={2} fill="transparent" stroke-linecap="round" />

        <path d="M 565 232 L 560  230" stroke="white" stroke-width={2} fill="transparent" stroke-linecap="round" />

        <path d="M 570 229 L 560  225" stroke="white" stroke-width={2} fill="transparent" stroke-linecap="round" />

        <path d="M 570 204 L 560  200" stroke="white" stroke-width={2} fill="transparent" stroke-linecap="round" />

        <path d="M 570 179 L 560  175" stroke="white" stroke-width={2} fill="transparent" stroke-linecap="round" />

        <path d="M 570 154 L 560  150" stroke="white" stroke-width={2} fill="transparent" stroke-linecap="round" />

        <path d="M 570 129 L 560  125" stroke="white" stroke-width={2} fill="transparent" stroke-linecap="round" />

        <path
          d="M 545 100 L 545 400 L 570 400 L 595 350 L 595 150 L 570 100 L 545 100"
          stroke="white"
          stroke-width={3}
          fill="transparent"
          stroke-linecap="round"
        />
      </g>
    )
  }
}
