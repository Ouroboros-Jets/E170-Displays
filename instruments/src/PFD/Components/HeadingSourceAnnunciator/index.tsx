import Colors from 'instruments/common/util/Colors'

import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'

type T_HeadingSourceAnnunciatorProps = ComponentProps & {
  bus: EventBus
}

export default class HeadingSourceAnnunciator extends DisplayComponent<T_HeadingSourceAnnunciatorProps> {
  public render(): VNode {
    return (
      <g>
        <text x="180" y="20" fill={Colors.GREEN} font-size={17} text-anchor="middle">
          MAG1
        </text>
      </g>
    )
  }
}
