import './index.scss'
import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import { ClampValue } from '../../Util/ClampValue'
import { PathWithBlackBackground } from '../../Util/PathWithBlackBackground'
import { createArray } from 'instruments/common/util/createArray'
import { type PFDSimvars } from '../PFDSimVarPublisher'

type AirspeedTapeProps = ComponentProps & {
  bus: EventBus
}

const drawTick = (small: boolean, y: number): any => {
  return (
    <PathWithBlackBackground
      d={`M 81 ${-y} L ${small ? 70 : 58} ${-y}`}
      fill="black"
      fillTop="white"
      strokeWidthTop={3}
      StrokeWidth={5}
    />
  )
}
//
export class AirspeedTape extends DisplayComponent<AirspeedTapeProps> {
  private readonly asTapeRef = FSComponent.createRef<SVGElement>()
  private readonly tapeLength = 942
  private readonly spacing = 3.95
  private readonly startOffset = 200
  private readonly airspeedTapeScaling = 3.95
  private readonly array = createArray(this.tapeLength)

  private readonly Tape = this.array.map((item, index) => {
    if (index < 30) {
      return null
    }
    if (index < 200) {
      if (index % 10 === 0) {
        return (
          <g key={index}>
            {drawTick(false, index * this.spacing)}
            <text
              x="53"
              y={-index * this.spacing + 9}
              stroke="black"
              stroke-width={2}
              paint-order="stroke"
              text-anchor="end"
              fill="white"
              font-size="22"
            >
              {index.toString()}
            </text>
          </g>
        )
      } else return null
    } else {
      if (index % 20 === 0) {
        return (
          <g key={index}>
            {drawTick(false, index * this.spacing)}
            <text
              x="53"
              y={-index * this.spacing + 9}
              stroke="black"
              stroke-width={2}
              paint-order="stroke"
              text-anchor="end"
              fill="white"
              font-size="22"
            >
              {index.toString()}
            </text>
          </g>
        )
      } else if (index % 20 === 10) {
        return drawTick(false, index * this.spacing)
      } else return null
    }
  })

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()
    sub
      .on('airspeed')
      .whenChanged()
      .handle((asi) => {
        this.asTapeRef.instance?.setAttribute(
          'transform',
          `translate(0,${ClampValue(asi, 30, 900) * this.airspeedTapeScaling + this.startOffset})`
        )
      })
  }

  public render(): VNode {
    return (
      <g transform="translate(0 54)">
        <rect x={0} y={0} width={82} height={396} fill="black" opacity={0.3} />

        <defs>
          <clipPath id="tapeClip">
            <rect x={0} y={34} width={81} height={330} />
          </clipPath>
        </defs>

        <g clip-path="url(#tapeClip)">
          <g ref={this.asTapeRef}>{this.Tape}</g>
        </g>
        <PathWithBlackBackground d="M 81 32 L 81 364" fill="black" fillTop="white" strokeWidthTop={2} StrokeWidth={3} />
      </g>
    )
  }
}
