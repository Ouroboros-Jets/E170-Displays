import { FSComponent, DisplayComponent, type VNode, type ComponentProps } from '@microsoft/msfs-sdk'

type PathWithBlackBackgroundProps = ComponentProps & {
  d: string
  fill: string
  fillTop: string
  strokeWidth: number
  strokeWidthTop: number
  forceTransparent?: boolean
  fillTop2?: string
  forceEndCap?: boolean
}

export class PathWithBlackBackground extends DisplayComponent<PathWithBlackBackgroundProps> {
  public render(): VNode {
    return (
      <g>
        <path
          d={this.props.d}
          fill={this.props.forceTransparent !== null && this.props.forceTransparent === true ? 'transparent' : 'black'}
          stroke-width={this.props.strokeWidth}
          stroke={this.props.fill}
          stroke-linecap={this.props.forceEndCap !== null && this.props.forceEndCap === true ? 'butt' : 'round'}
          stroke-linejoin="round"
        />
        <path
          d={this.props.d}
          fill={this.props.fillTop2 !== null ? this.props.fillTop2 : this.props.fillTop}
          stroke-width={this.props.strokeWidthTop}
          stroke={this.props.fillTop}
          stroke-linecap={this.props.forceEndCap !== null && this.props.forceEndCap === true ? 'butt' : 'round'}
          stroke-linejoin="round"
        />
      </g>
    )
  }
}
