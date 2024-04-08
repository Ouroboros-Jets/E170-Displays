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
        <path d="M 545 108 L 545 408 L 570 408 L 595 358 L 595 158 L 570 108 L 545 108" fill="black" opacity={0.3} />
        <clipPath d="M 545 108 L 545 408 L 570 408 L 595 358 L 595 158 L 570 108 L 545 108"></clipPath>

        <path d="M 565 247 L 560  246" stroke="white" stroke-width={2} fill="transparent" stroke-linecap="round" />

        <path d="M 565 242 L 560  241" stroke="white" stroke-width={2} fill="transparent" stroke-linecap="round" />

        <path d="M 565 237 L 560  236" stroke="white" stroke-width={2} fill="transparent" stroke-linecap="round" />

        <path d="M 565 232 L 560  231" stroke="white" stroke-width={2} fill="transparent" stroke-linecap="round" />

        <path d="M 570 229 L 560  225" stroke="white" stroke-width={2} fill="transparent" stroke-linecap="round" />

        <path d="M 570 206 L 560  200" stroke="white" stroke-width={2} fill="transparent" stroke-linecap="round" />

        <path d="M 570 183 L 560  175" stroke="white" stroke-width={2} fill="transparent" stroke-linecap="round" />

        <path d="M 570 160 L 560  150" stroke="white" stroke-width={2} fill="transparent" stroke-linecap="round" />

        <path d="M 570 137 L 560  125" stroke="white" stroke-width={2} fill="transparent" stroke-linecap="round" />

        <></>

        <path d="M 565 261 L 560  262" stroke="white" stroke-width={2} fill="transparent" stroke-linecap="round" />

        <path d="M 565 266 L 560  267" stroke="white" stroke-width={2} fill="transparent" stroke-linecap="round" />

        <path d="M 565 271 L 560  272" stroke="white" stroke-width={2} fill="transparent" stroke-linecap="round" />

        <path d="M 565 276 L 560  277" stroke="white" stroke-width={2} fill="transparent" stroke-linecap="round" />

        <path d="M 570 279 L 560  283" stroke="white" stroke-width={2} fill="transparent" stroke-linecap="round" />

        <path d="M 570 304 L 560  310" stroke="white" stroke-width={2} fill="transparent" stroke-linecap="round" />

        <path d="M 570 329 L 560  337" stroke="white" stroke-width={2} fill="transparent" stroke-linecap="round" />

        <path d="M 570 354 L 560  364" stroke="white" stroke-width={2} fill="transparent" stroke-linecap="round" />

        <path d="M 570 379 L 560  391" stroke="white" stroke-width={2} fill="transparent" stroke-linecap="round" />

        <path
          d="M 545 108 L 545 408 L 570 408 L 595 358 L 595 158 L 570 108 L 545 108"
          stroke="white"
          stroke-width={3}
          fill="transparent"
          stroke-linecap="round"
        />
      </g>
    )
  }
}
