import Colors from 'instruments/common/util/Colors'
import type { PFDSimvars } from '../PFDSimVarPublisher'
import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'

type T_RadioProps = ComponentProps & {
  bus: EventBus
}

export default class Radio extends DisplayComponent<T_RadioProps> {
  private readonly comFrequecyRef = FSComponent.createRef<SVGTextElement>()
  private readonly comStandByFrequecyRef = FSComponent.createRef<SVGTextElement>()
  private readonly navFrequecyRef = FSComponent.createRef<SVGTextElement>()
  private readonly navStandByFrequecyRef = FSComponent.createRef<SVGTextElement>()

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()

    sub
      .on('com_frequency')
      .whenChanged()
      .handle((comFreq) => {
        this.comFrequecyRef.instance.textContent = parseFloat(comFreq).toFixed(2).toString()
      })

    sub
      .on('com_standby_frequency')
      .whenChanged()
      .handle((comStandByFreq) => {
        this.comStandByFrequecyRef.instance.textContent = parseFloat(comStandByFreq).toFixed(2).toString()
      })

    sub
      .on('nav_frequency')
      .whenChanged()
      .handle((navFreq) => {
        this.navFrequecyRef.instance.textContent = parseFloat(navFreq).toFixed(2).toString()
      })

    sub
      .on('nav_standby_frequency')
      .whenChanged()
      .handle((navStandByFreq) => {
        this.navStandByFrequecyRef.instance.textContent = parseFloat(navStandByFreq).toFixed(2).toString()
      })
  }

  public render(): VNode {
    return (
      <g>
        <rect x="3" y="263" width="90" height="70" fill="black" stroke="white" stroke-width="5" />
        <text x="50" y="286" fill="white" font-size={20} text-anchor="middle">
          COM1
        </text>
        <text x="8" y="304" fill={Colors.GREEN} font-size={20} text-anchor="start" ref={this.comFrequecyRef}>
          ---
        </text>
        <text x="8" y="324" fill="white" font-size={20} text-anchor="start" ref={this.comStandByFrequecyRef}>
          ---
        </text>
        <rect x="507" y="263" width="90" height="70" fill="black" stroke="white" stroke-width="5" />
        <text x="554" y="286" fill="white" font-size={20} text-anchor="middle">
          NAV1
        </text>
        <text x="512" y="304" fill={Colors.GREEN} font-size={20} text-anchor="start" ref={this.navFrequecyRef}>
          ---
        </text>
        <text x="512" y="324" fill="white" font-size={20} text-anchor="start" ref={this.navStandByFrequecyRef}>
          ---
        </text>
      </g>
    )
  }
}
