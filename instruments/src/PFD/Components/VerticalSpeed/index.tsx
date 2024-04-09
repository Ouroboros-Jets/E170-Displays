import { type ComponentProps, DisplayComponent, type EventBus, FSComponent, type VNode } from '@microsoft/msfs-sdk'
import './index.scss'
import type { PFDSimvars } from '../PFDSimVarPublisher'

type T_VerticalSpeedIndicatorProps = ComponentProps & {
  bus: EventBus
}

const fpmToPixel = (fpm: number): number => {
  return -fpm * 5 * 1.1 * 0.005
}

const renderMarkers = (): JSX.Element[] => {
  const stroke = 'white'
  const xAxis = 254
  const leftBound = 560
  const smallCount = 5
  const smallSpacing = 5
  const smallTilt = 1
  const bigCount = 5
  const bigSpacing = smallSpacing * 5
  const bigTiltFactor = 0.1

  const markers: JSX.Element[] = []

  // Small markers
  for (let y = smallCount; y < smallCount * smallSpacing; y += smallSpacing) {
    console.log(y)
    markers.push(
      <path
        d={`M 565 ${xAxis + y} L ${leftBound}  ${xAxis + y + smallTilt}`}
        stroke={stroke}
        stroke-width={2}
        stroke-linecap="round"
      />
    )
  }

  for (let y = smallCount; y < smallCount * smallSpacing; y += smallSpacing) {
    console.log(y)
    markers.push(
      <path
        d={`M 565 ${xAxis - y} L ${leftBound}  ${xAxis - y - smallTilt}`}
        stroke={stroke}
        stroke-width={2}
        stroke-linecap="round"
      />
    )
  }

  // Big markers
  for (let y = 0; y < bigCount * bigSpacing; y += bigSpacing) {
    console.log(y)
    markers.push(
      <path
        d={`M 570 ${xAxis + y} L ${leftBound}  ${xAxis + y + bigTiltFactor * y}`}
        stroke={stroke}
        stroke-width={2}
        stroke-linecap="round"
      />
    )
  }

  for (let y = 0; y < bigCount * bigSpacing; y += bigSpacing) {
    markers.push(
      <path
        d={`M 570 ${xAxis - y} L ${leftBound}  ${xAxis - y - bigTiltFactor * y}`}
        stroke={stroke}
        stroke-width={2}
        stroke-linecap="round"
      />
    )
  }

  return markers
}

export default class VerticalSpeedIndicator extends DisplayComponent<T_VerticalSpeedIndicatorProps> {
  vSpdRef = FSComponent.createRef<SVGPathElement>()

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()
    sub
      .on('vertical_speed')
      .whenChanged()
      .handle((alt) => {
        alt = Math.min(Math.max(alt, -4000), 4000)
        const vSpd = fpmToPixel(alt)
        console.log(vSpd)

        this.vSpdRef.instance.setAttribute('d', `M 560 ${vSpd + 254} L 595  254`)
      })
  }

  public render(): VNode {
    return (
      <g>
        {renderMarkers()}

        <g>
          <clipPath id="vsClip">
            <path d="M 545 108 L 545 408 L 570 408 L 595 358 L 595 158 L 570 108 L 545 108" />
          </clipPath>

          <path
            ref={this.vSpdRef}
            stroke="#04E304"
            stroke-width={4}
            fill="transparent"
            stroke-linecap="round"
            clip-path="url(#vsClip)"
          />
        </g>

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
