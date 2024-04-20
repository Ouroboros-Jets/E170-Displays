import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import Colors from 'instruments/common/util/Colors'
import { type PFDSimvars } from '../PFDSimVarPublisher'

type StallSpeedTapeProps = ComponentProps & {
  bus: EventBus
  minSpeed: number
  maxSpeed: number
  stretch: number
}

export class StallSpeedTape extends DisplayComponent<StallSpeedTapeProps> {
  private readonly yellowLsaRef = FSComponent.createRef<SVGRectElement>()
  private readonly redLsaRef = FSComponent.createRef<SVGRectElement>()

  private onGround: boolean
  private stall: number

  private readonly checkStall = (): void => {
    if (!this.onGround) {
      if (this.stall <= 30) {
        this.redLsaRef.instance.style.visibility = 'hidden'
        this.yellowLsaRef.instance.style.visibility = 'hidden'
        return
      }

      this.redLsaRef.instance.style.visibility = 'visible'
      this.yellowLsaRef.instance.style.visibility = 'visible'

      const stallPosition =
        (this.props.maxSpeed - this.stall) * this.props.stretch + this.props.minSpeed * this.props.stretch

      this.redLsaRef.instance.setAttribute('height', `${stallPosition - this.props.minSpeed}`)
      this.redLsaRef.instance.style.y = `${stallPosition - this.props.minSpeed}`

      this.yellowLsaRef.instance.setAttribute('height', `${stallPosition - this.props.minSpeed * 2}`)
      this.yellowLsaRef.instance.style.y = `${stallPosition - this.props.minSpeed * 2}`
    } else {
      this.redLsaRef.instance.style.visibility = 'hidden'
      this.yellowLsaRef.instance.style.visibility = 'hidden'
    }
  }

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()

    sub
      .on('onGround')
      .whenChanged()
      .handle((onGround) => {
        this.onGround = onGround
        this.checkStall()
      })

    sub
      .on('vstall')
      .whenChanged()
      .handle((stall) => {
        this.stall = stall
        this.checkStall()
      })
  }

  public render(): VNode {
    return (
      <g id="LSA">
        <rect x={66} y={0} width={10} height={0} fill={Colors.YELLOW} ref={this.yellowLsaRef} />
        <rect x={66} y={0} width={10} height={0} fill={Colors.RED} ref={this.redLsaRef} />
      </g>
    )
  }
}
