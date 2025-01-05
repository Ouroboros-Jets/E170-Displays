import './index.scss'
import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'

type VSpeedBugsProps = ComponentProps & {
  bus: EventBus
}

class VSpeedBugs extends DisplayComponent<VSpeedBugsProps> {
  public render(): VNode {
    return <g></g>
  }
}

export default VSpeedBugs
