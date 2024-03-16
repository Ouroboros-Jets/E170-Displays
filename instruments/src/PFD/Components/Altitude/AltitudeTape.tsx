import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import { createArray } from 'instruments/common/util/createArray'
import { PathWithBlackBackground } from '../../Util/PathWithBlackBackground'
import { type PFDSimvars } from '../PFDSimVarPublisher'

const drawChevron = (double: boolean, y: number): JSX.Element => {
  const offset = -y / 3.31
  if (double) {
    return (
      <g>
        <PathWithBlackBackground
          d={`M 70 ${offset + 265} L30 ${offset + 223} L 70 ${offset + 181}`}
          fill="black"
          fillTop="white"
          strokeWidthTop={2}
          StrokeWidth={4}
          fillTop2="transparent"
          forceTransparent
          forceEndCap
        />
        <PathWithBlackBackground
          d={`M 70 ${offset + 300} L 70 ${offset + 255} L38 ${offset + 223} L 70 ${offset + 190} L 70 ${offset + 148}`}
          fill="black"
          fillTop="white"
          strokeWidthTop={2}
          StrokeWidth={4}
          fillTop2="transparent"
          forceTransparent
          forceEndCap
        />

        {drawNumber(y)}
      </g>
    )
  } else {
    return (
      <g>
        <PathWithBlackBackground
          d={`M 70 ${offset + 300} L 70 ${offset + 265} L30 ${offset + 223} L 70 ${offset + 181} L 70 ${offset + 148}`}
          fill="black"
          fillTop="white"
          strokeWidthTop={2}
          StrokeWidth={4}
          fillTop2="transparent"
          forceTransparent
          forceEndCap
        />
        {drawNumber(y)}
      </g>
    )
  }
}

const drawTick = (y: number) => {
  const offset = -y / 3.31
  return (
    <PathWithBlackBackground
      d={`M 30 ${offset + 222} L ${42} ${offset + 222}`}
      fill="black"
      fillTop="white"
      strokeWidthTop={2}
      StrokeWidth={4}
    />
  )
}
const drawNumber = (y: number) => {
  const offset = -y / 3.31
  return (
    <text
      x="46"
      y={(offset + 224).toString()}
      stroke="black"
      stroke-width="2"
      paint-order="stroke"
      fill="white"
      font-size="22px"
      text-anchor="start"
      dominant-baseline="middle"
    >
      {y.toString()}
    </text>
  )
}

type AltitudeTapeProps = ComponentProps & {
  bus: EventBus
}

// `translate(0, ${props.altitude / 3.309})`

export class AltitudeTape extends DisplayComponent<AltitudeTapeProps> {
  private readonly tapeRef = FSComponent.createRef<SVGElement>()

  private readonly tickMarks = createArray(600)
  private readonly negativeTickMarks = createArray(30)
  private readonly tape = this.tickMarks.map((tick: number) => {
    if (tick % 10 === 0) {
      return drawChevron(true, tick * 100)
    }
    if (tick % 5 === 0) {
      return drawChevron(false, tick * 100)
    }
    return drawTick(tick * 100)
  })

  negativeTape = this.negativeTickMarks.map((tick: number) => {
    if (tick % 10 === 0) {
      return drawChevron(true, tick * -100)
    }
    if (tick % 5 === 0) {
      return drawChevron(false, tick * -100)
    }
    return drawTick(tick * -100)
  })

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()
    sub
      .on('altitude')
      .whenChanged()
      .handle((alt) => {
        this.tapeRef.instance?.setAttribute('transform', `translate(0, ${alt / 3.309})`)
      })
  }

  public render(): VNode {
    return (
      <g>
        <defs>
          <clipPath id="AltitudetapeClip">
            <rect x={29} y={60} width={83} height={333} />
          </clipPath>
        </defs>

        <g clip-path="url(#AltitudetapeClip)">
          <g ref={this.tapeRef}>
            {this.negativeTape}
            {this.tape}
          </g>
        </g>
        <path d="M 29 58 L 29 391" stroke="white" stroke-width="2" fill="none" />
      </g>
    )
  }
}
