import Colors from 'instruments/common/util/Colors'

import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import { type PFDSimvars } from '../PFDSimVarPublisher'

type T_NavSourceAnnunciatorProps = ComponentProps & {
  bus: EventBus
}

enum Annunciators {
  'VOR',
  'LOC',
  'FMS'
}

export default class NavSourceAnnunciator extends DisplayComponent<T_NavSourceAnnunciatorProps> {
  private readonly primaryNavSourceRef = FSComponent.createRef<SVGTextElement>()
  private readonly primaryNavIdRef = FSComponent.createRef<SVGTextElement>()
  private readonly primaryNavDistanceReadOutRef = FSComponent.createRef<SVGTextElement>()
  private readonly primaryNavDistanceTimeEnroute = FSComponent.createRef<SVGTextElement>()

  private activeAnnunciator: Annunciators = Annunciators.FMS
  private nextTargetDistanceNm: number
  private trueAirspeed: number

  private readonly checkDistance = (): void => {
    const minutes = Math.round((this.nextTargetDistanceNm / this.trueAirspeed) * 60).toString()
    if (this.activeAnnunciator === Annunciators.FMS) {
      this.primaryNavDistanceTimeEnroute.instance.textContent = minutes === 'Infinity' ? '∞' : minutes
    } else {
      this.primaryNavDistanceTimeEnroute.instance.textContent = minutes === 'Infinity' ? '∞' : minutes
    }
  }

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()

    sub
      .on('gps_waypoint_active')
      .whenChanged()
      .handle((wpMode) => {
        if (wpMode) {
          this.activeAnnunciator = Annunciators.FMS
          this.primaryNavSourceRef.instance.textContent = 'FMS1'
          this.primaryNavSourceRef.instance.setAttribute('fill', `${Colors.PINK}`)
          this.primaryNavIdRef.instance.setAttribute('fill', `${Colors.PINK}`)
          this.primaryNavDistanceReadOutRef.instance.setAttribute('fill', `${Colors.PINK}`)
          this.primaryNavDistanceTimeEnroute.instance.setAttribute('fill', `${Colors.PINK}`)
        } else {
          this.primaryNavSourceRef.instance.setAttribute('fill', `${Colors.GREEN}`)
          this.primaryNavIdRef.instance.setAttribute('fill', `${Colors.GREEN}`)
          this.primaryNavDistanceReadOutRef.instance.setAttribute('fill', `${Colors.GREEN}`)
          this.primaryNavDistanceTimeEnroute.instance.setAttribute('fill', `${Colors.GREEN}`)

          if (this.activeAnnunciator === Annunciators.LOC) {
            this.activeAnnunciator = Annunciators.LOC
            this.primaryNavSourceRef.instance.textContent = 'LOC1'
          } else {
            this.activeAnnunciator = Annunciators.VOR
            this.primaryNavSourceRef.instance.textContent = 'VOR1'
          }
        }
      })

    sub
      .on('gps_next_waypoint_id')
      .whenChanged()
      .handle((wpId) => {
        if (this.activeAnnunciator === Annunciators.FMS) {
          this.primaryNavIdRef.instance.textContent = wpId
        }
      })

    sub
      .on('gps_next_waypoint_distance')
      .whenChanged()
      .handle((wpDist) => {
        if (this.activeAnnunciator === Annunciators.FMS) {
          this.nextTargetDistanceNm = Math.round(wpDist / 1852)
          this.primaryNavDistanceReadOutRef.instance.textContent = this.nextTargetDistanceNm.toString()
        }
      })

    sub
      .on('true_airspeed')
      .whenChanged()
      .handle((airspd) => {
        this.trueAirspeed = airspd
        this.checkDistance()
      })

    sub
      .on('nav_ident')
      .whenChanged()
      .handle((navIdent) => {
        if (this.activeAnnunciator !== Annunciators.FMS) {
          this.primaryNavIdRef.instance.textContent = navIdent
        }
      })

    sub
      .on('nav_dme')
      .whenChanged()
      .handle((navDme) => {
        if (this.activeAnnunciator !== Annunciators.FMS) {
          this.nextTargetDistanceNm = navDme
          this.primaryNavDistanceReadOutRef.instance.textContent = navDme.toString()
        }
        this.checkDistance()
      })
  }

  public render(): VNode {
    return (
      <g>
        <text
          x="5"
          y="70"
          fill={Colors.PINK}
          font-size={25}
          text-anchor="start"
          letter-spacing={-1}
          ref={this.primaryNavSourceRef}
        >
          FMS1
        </text>
        <text
          x="5"
          y="95"
          fill={Colors.PINK}
          font-size={20}
          text-anchor="start"
          letter-spacing={-1}
          ref={this.primaryNavIdRef}
        >
          ---
        </text>
        <text
          x="50"
          y="115"
          fill={Colors.YELLOW}
          font-size={20}
          text-anchor="end"
          letter-spacing={-1}
          ref={this.primaryNavDistanceReadOutRef}
        >
          ---
        </text>
        <text x="53" y="115" fill="white" font-size={20} text-anchor="start" letter-spacing={-1}>
          NM
        </text>
        <text
          x="50"
          y="135"
          fill={Colors.YELLOW}
          font-size={20}
          text-anchor="end"
          letter-spacing={-1}
          ref={this.primaryNavDistanceTimeEnroute}
        >
          ---
        </text>
        <text x="53" y="135" fill="white" font-size={20} text-anchor="start" letter-spacing={-1}>
          MIN
        </text>
      </g>
    )
  }
}
