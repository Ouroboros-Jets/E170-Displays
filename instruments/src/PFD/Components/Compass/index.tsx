import type { PFDSimvars } from '../PFDSimVarPublisher'
import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import RealHdgIndicator from './RealHdg'
import LockHdgIndicator from './LockHdg'

type T_CompassProps = ComponentProps & {
  bus: EventBus
}

const compassFigures: Record<number, string> = {
  0: 'N',
  30: '3',
  60: '6',
  90: 'E',
  120: '12',
  150: '15',
  180: 'S',
  210: '21',
  240: '24',
  270: 'W',
  300: '30',
  330: '33'
}

const drawCompassTicks = (): JSX.Element[] => {
  const ticks: JSX.Element[] = []
  for (let i = 0; i < 360; i++) {
    if (i % 5 === 0) {
      ticks.push(
        <g transform={`rotate(${i}, 275, 188)`}>
          <path d="M 275, 60 L 275 70" stroke="white" stroke-width={2.25} />
        </g>
      )
    }
    if (i % 10 === 0) {
      ticks.push(
        <g transform={`rotate(${i}, 275, 188)`}>
          <path d="M 275, 60 L 275 80" stroke="white" stroke-width={2.25} />
        </g>
      )
    }

    if (i in compassFigures) {
      ticks.push(
        <g transform={`rotate(${i}, 275, 188)`}>
          <text text-anchor="middle" x={275} y={95} font-size={15} font-weight="bold" fill="white">
            {compassFigures[i]}
          </text>
        </g>
      )
    }
  }

  return ticks
}

const drawStaticCompassTicks = (): JSX.Element[] => {
  const ticks: JSX.Element[] = []
  for (let i = 1; i < 360; i++) {
    if (i % 45 === 0) {
      ticks.push(
        <g transform={`rotate(${i}, 275, 188)`}>
          <path d="M 275, 48 L 275 58" stroke="white" stroke-width={2.25} />
        </g>
      )
    }
  }

  return ticks
}

export default class Compass extends DisplayComponent<T_CompassProps> {
  private readonly compassRef = FSComponent.createRef<SVGElement>()

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()
    sub
      .on('heading')
      .whenChanged()
      .handle((alt) => {
        this.compassRef.instance?.setAttribute('transform', `rotate(${-alt}, 275, 188)`)
      })
  }

  public render(): VNode {
    return (
      <g>
        <g ref={this.compassRef}>{drawCompassTicks()}</g>
        <g>{drawStaticCompassTicks()}</g>
        <LockHdgIndicator bus={this.props.bus} />
        <RealHdgIndicator bus={this.props.bus} />
      </g>
    )
  }
}
