import { type ComponentProps, DisplayComponent, type EventBus, FSComponent, type VNode } from '@microsoft/msfs-sdk'
import './index.scss'
import type { PFDSimvars } from '../PFDSimVarPublisher'
import Colors from 'instruments/common/util/Colors'

type T_VerticalSpeedIndicatorProps = ComponentProps & {
  bus: EventBus
}

// Static markers settings
const stroke = 'white'
const xAxis = 254
const leftBound = 560
const smallCount = 5
const bigCount = 5
const smallSpacing = 5
const bigSpacing = 20
const bigOffset = 35
const tiltFactor = 0.1
const firstBigMarkerOffset = 24

const fpmToPixel = (fpm: number): number => {
  // TODO
  return fpm
}

const renderMarkers = (): JSX.Element[] => {
  const markers: JSX.Element[] = []

  // Small markers
  for (let y = smallSpacing; y < smallCount * smallSpacing; y += smallSpacing) {
    markers.push(
      <path
        d={`M 565 ${xAxis + y} L ${leftBound}  ${xAxis + y + tiltFactor * y}}`}
        stroke={stroke}
        stroke-width={2}
        stroke-linecap="round"
      />
    )
  }

  for (let y = smallSpacing; y < smallCount * smallSpacing; y += smallSpacing) {
    markers.push(
      <path
        d={`M 565 ${xAxis - y} L ${leftBound}  ${xAxis - y - tiltFactor * y}}`}
        stroke={stroke}
        stroke-width={2}
        stroke-linecap="round"
      />
    )
  }

  // Big/Small Markers
  markers.push(
    <path
      d={`M 570 ${xAxis + firstBigMarkerOffset} L ${leftBound}  ${xAxis + 2 * 2 + firstBigMarkerOffset}`}
      stroke={stroke}
      stroke-width={2}
      stroke-linecap="round"
    />
  )

  markers.push(
    <path
      d={`M 570 ${xAxis - firstBigMarkerOffset} L ${leftBound}  ${xAxis - 2 * 2 - firstBigMarkerOffset}`}
      stroke={stroke}
      stroke-width={2}
      stroke-linecap="round"
    />
  )

  // Big markers
  for (let y = bigSpacing; y < bigCount * bigSpacing; y += bigSpacing) {
    markers.push(
      <path
        d={`M 570 ${xAxis + y + bigOffset} L ${leftBound}  ${xAxis + y + bigOffset + tiltFactor * y * 2 + 4}`}
        stroke={stroke}
        stroke-width={2}
        stroke-linecap="round"
      />
    )
  }

  for (let y = bigSpacing; y < bigCount * bigSpacing; y += bigSpacing) {
    markers.push(
      <path
        d={`M 570 ${xAxis - y - bigOffset} L ${leftBound}  ${xAxis - y - bigOffset - tiltFactor * y * 2 - 4}`}
        stroke={stroke}
        stroke-width={2}
        stroke-linecap="round"
      />
    )
  }

  return markers
}

export default class VerticalSpeedIndicator extends DisplayComponent<T_VerticalSpeedIndicatorProps> {
  vSpdNeedleRef = FSComponent.createRef<SVGPathElement>()
  vSpdValueRef = FSComponent.createRef<SVGTextElement>()
  vSpdBoxRef = FSComponent.createRef<SVGGElement>()

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()
    sub
      .on('vertical_speed')
      .whenChanged()
      .handle((vs) => {
        vs *= 60
        const vSpd = fpmToPixel(Math.min(Math.max(vs, -4000), 4000))
        this.vSpdNeedleRef.instance.setAttribute('d', `M 560 ${vSpd + 254} L 630  254`)

        if (vs >= 500 || vs <= -500) {
          this.vSpdBoxRef.instance.setAttribute('opacity', '1')
          this.vSpdValueRef.instance.textContent = (
            Math.round(Math.min(Math.max(vs, -9900), 9900) / 100) * 100
          ).toString()
        } else {
          this.vSpdBoxRef.instance.setAttribute('opacity', '0')
        }
      })
  }

  public render(): VNode {
    return (
      <g>
        <path
          d="M 545 104 L 545 404 L 570 404 L 595 354 L 595 154 L 570 104 L 545 104"
          fill="black"
          stroke-linecap="round"
          opacity={0.3}
        />
        {renderMarkers()}
        <g>
          <clipPath id="vsClip">
            <path d="M 545 108 L 545 408 L 570 408 L 595 358 L 595 158 L 570 108 L 545 108" />
          </clipPath>

          <path
            ref={this.vSpdNeedleRef}
            stroke={Colors.GREEN}
            stroke-width={4}
            fill="transparent"
            stroke-linecap="round"
            clip-path="url(#vsClip)"
          />
        </g>
        <path
          d="M 545 104 L 545 404 L 570 404 L 595 354 L 595 154 L 570 104 L 545 104"
          stroke="white"
          stroke-width={2}
          fill="transparent"
          stroke-linecap="round"
        />

        <g ref={this.vSpdBoxRef}>
          <rect x="546" y={xAxis - 9} width="48" height="18" fill="black" clip-path="url(#vsClip)" />
          <text x={588} y={260} text-anchor="end" font-size={17} fill={Colors.GREEN} ref={this.vSpdValueRef} />
          <path
            d={`M 546 ${xAxis - 9} L 594 ${xAxis - 9} M 546 ${xAxis + 9} L 594 ${xAxis + 9}`}
            stroke="white"
            stroke-width={2}
            stroke-linecap="round"
          />
        </g>
      </g>
    )
  }
}
