import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import Colors from 'instruments/common/util/Colors'
import { type PFDSimvars } from '../PFDSimVarPublisher'

type LowAltitudeAwarenessDisplayProps = ComponentProps & {
  bus: EventBus
  baseline: number
  stretch: number
  minAltitude: number
  maxAltitude: number
}

export class LowAltitudeAwarenessDisplay extends DisplayComponent<LowAltitudeAwarenessDisplayProps> {
  private readonly grndBox = FSComponent.createRef<SVGRectElement>()
  private readonly grndBoxInsideClipPathRef = FSComponent.createRef<SVGRectElement>()
  private readonly grndBoxOutsideClipPathRef = FSComponent.createRef<SVGRectElement>()
  private readonly wholeBoxRef = FSComponent.createRef<SVGGElement>()

  private grndAlt
  private altAgl

  private readonly offset = 15
  private readonly tilt = this.offset / 2

  private readonly renderLines = (): JSX.Element[] => {
    const lines: JSX.Element[] = []

    const clipPathHeight = this.props.maxAltitude * this.props.stretch

    for (let i = -clipPathHeight * 1.005; i < clipPathHeight * 1.005; i += this.offset) {
      lines.push(
        <line
          x1={455}
          y1={clipPathHeight + i - this.offset}
          x2={537}
          y2={clipPathHeight + i - this.offset * this.tilt}
          stroke={Colors.YELLOW}
          stroke-width={2}
        />
      )
    }
    return lines
  }

  private checkTape(): void {
    if (this.altAgl > 550) {
      this.wholeBoxRef.instance.style.visibility = 'hidden'
      this.grndBoxOutsideClipPathRef.instance.setAttribute('y', `${0}`)
      this.grndBoxOutsideClipPathRef.instance.setAttribute('height', `${this.props.maxAltitude * this.props.stretch}`)
    } else {
      this.wholeBoxRef.instance.style.visibility = 'visible'

      const boxPosition = this.props.maxAltitude * this.props.stretch - this.grndAlt * this.props.stretch

      this.grndBox.instance.setAttribute('height', `${boxPosition}`)
      this.grndBox.instance.setAttribute('y', `${boxPosition}`)

      this.grndBoxInsideClipPathRef.instance.setAttribute('height', `${boxPosition}`)
      this.grndBoxInsideClipPathRef.instance.setAttribute('y', `${boxPosition}`)

      const clipPathHeight = this.props.maxAltitude * this.props.stretch
      this.grndBoxOutsideClipPathRef.instance.setAttribute('height', `${clipPathHeight}`)
      this.grndBoxOutsideClipPathRef.instance.setAttribute('y', `${boxPosition - clipPathHeight}`)
    }
  }

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()

    sub
      .on('ground_altitude')
      .whenChanged()
      .handle((grndAlt) => {
        this.grndAlt = grndAlt * 3.281
        this.checkTape()
      })

    sub
      .on('altitude_agl')
      .whenChanged()
      .handle((alt) => {
        this.altAgl = alt
        this.checkTape()
      })
  }

  public render(): VNode {
    return (
      <g>
        <defs>
          <clipPath id="laadInsideClipPath">
            <rect x={455} y={0} width={82} height={0} ref={this.grndBoxInsideClipPathRef} />
          </clipPath>

          <clipPath id="laadClipPath">
            <rect x={455} y={0} width={82} height={0} ref={this.grndBoxOutsideClipPathRef} />
          </clipPath>
        </defs>

        <g ref={this.wholeBoxRef}>
          <g clip-path="url(#laadInsideClipPath)">
            <g>{this.renderLines()}</g>
          </g>

          <rect
            x={455}
            y={0}
            width={81}
            height={0}
            fill="transparent"
            stroke={Colors.YELLOW}
            stroke-width={2}
            ref={this.grndBox}
          />
        </g>
      </g>
    )
  }
}
