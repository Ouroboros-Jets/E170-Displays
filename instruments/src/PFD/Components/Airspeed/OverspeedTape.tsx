import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import Colors from 'instruments/common/util/Colors'
import { type PFDSimvars } from '../PFDSimVarPublisher'

type OverspeedTapeProps = ComponentProps & {
  bus: EventBus
  minSpeed: number
  maxSpeed: number
  stretch: number
}

export class OverspeedTape extends DisplayComponent<OverspeedTapeProps> {
  private readonly overspdRef = FSComponent.createRef<SVGGElement>()

  private onGround: boolean
  private overspeed: number
  private ias: number

  offset = 10
  tilt = this.offset / 2

  private readonly renderLine = (): JSX.Element[] => {
    const elements: JSX.Element[] = []
    const maxSpeed = this.props.maxSpeed * 2 * this.props.stretch

    elements.push(<rect x={72} y={80} width={8} height={maxSpeed * 2} fill={Colors.RED} />)

    for (let i = -maxSpeed; i < maxSpeed; i += this.offset) {
      elements.push(
        <line
          x1={58}
          x2={85}
          y1={maxSpeed + i - this.offset}
          y2={maxSpeed + i - this.offset * this.tilt}
          stroke="white"
          stroke-width={2}
        />
      )
    }

    return elements
  }

  private readonly checkOverspeed = (): void => {
    if (!this.onGround) {
      const overspdPosition =
        (this.props.maxSpeed - this.overspeed) * this.props.stretch +
        this.props.minSpeed * this.props.stretch -
        this.props.minSpeed * this.props.stretch

      this.overspdRef.instance.setAttribute('height', `${overspdPosition}`)
    }

    if (this.ias >= this.overspeed) {
      this.overspdRef.instance.setAttribute('width', '8')
      this.overspdRef.instance.setAttribute('x', '72')
    } else {
      this.overspdRef.instance.setAttribute('width', '4')
      this.overspdRef.instance.setAttribute('x', '76')
    }
  }

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)
    const sub = this.props.bus.getSubscriber<PFDSimvars>()

    sub
      .on('on_ground')
      .whenChanged()
      .handle((onGround) => {
        this.onGround = onGround
      })

    sub
      .on('indicated_airspeed')
      .whenChanged()
      .handle((ias) => {
        this.ias = ias
        this.checkOverspeed()
      })

    sub
      .on('overspeed')
      .whenChanged()
      .handle((overspd) => {
        this.overspeed = overspd
        this.checkOverspeed()
      })
  }

  public render(): VNode {
    return (
      <g id="OBP">
        {/*
        OLD CODE
        <defs>
          <pattern
            id="overspeedPattern"
            width={10}
            height={10}
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line x1={0} x2={0} y1={0} y2={10} stroke={Colors.RED} stroke-width={20} />
            <line x1={5} x2={5} y1={0} y2={10} stroke="white" stroke-width={4} />
          </pattern> 
        </defs>
      */}
        <defs>
          <clipPath id="overspeedTape">
            <rect x={76} y={this.props.minSpeed * 2} width={4} height={0} ref={this.overspdRef} />
          </clipPath>
        </defs>

        <g clip-path="url(#overspeedTape)">{this.renderLine()}</g>
      </g>
    )
  }
}
