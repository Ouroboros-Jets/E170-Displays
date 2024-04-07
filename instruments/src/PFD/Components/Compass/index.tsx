import './index.scss'
import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'

type CompassProps = ComponentProps & {
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

    if (i % 45 === 0) {
      ticks.push(
        <g transform={`rotate(${i}, 275, 188)`}>
          <path d="M 275, 48 L 275 58" stroke="white" stroke-width={2.25} />
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

export default class Compass extends DisplayComponent<CompassProps> {
  public render(): VNode {
    return (
      <svg viewBox="0 0 600 800">
        <g>{drawCompassTicks()}</g>
      </svg>
    )
  }
}
