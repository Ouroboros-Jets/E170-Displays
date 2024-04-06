import { type T_FlightPlan } from 'instruments/common/WaypointTypes/WaypointTypes'
import React, { useEffect, useRef, type FC } from 'react'
import { MapContainer, TileLayer, Polyline, Marker, Popup, Tooltip } from 'react-leaflet'
import { Compass } from './Compass'
import './mapLayer.scss'
import 'leaflet/dist/leaflet.css'
import { useObjLocalVar, useSimVar } from 'instruments/common/Hooks/simVars'
import { Icon as OgIcon, type Map } from 'leaflet'

type T_MapLayerProps = {
  sampleFlightPlan: T_FlightPlan
  flightPlanPath: Array<[number, number]>
  activeFlightPlanPath: Array<[number, number]>
}

export const MapLayer: FC<T_MapLayerProps> = (props: T_MapLayerProps) => {
  const [heading] = useSimVar('PLANE HEADING DEGREES MAGNETIC', 'radians')
  const [zoom] = useObjLocalVar('MFD_MAP_ZOOM', 'number')

  // const correctedHeading = heading * (180 / Math.PI) // use this in the sim, ace gonna use degrees
  const correctedHeading = heading
  const mapStyle = {
    // top: '10px',
    height: '600px',
    overflow: 'hidden',
    width: '600px',
    // transform: `rotate(${correctedHeading}deg)`,
    backgroundColor: 'rgba(255,0,0,0)'
  }
  const activePathOptions = { color: '#d202d4' }
  // const activePathOptions = { color: 'lime' }
  const inactivePathOptions = { color: 'white' }
  const mapRef = useRef<HTMLDivElement>(null)
  const zoomRef = useRef<Map>(null)

  useEffect(() => {
    zoomRef.current?.setZoom(zoom)
  }, [])

  useEffect(() => {
    if (mapRef.current) mapRef.current.style.transform = `rotate(${-correctedHeading}deg)`

    return () => {
      if (mapRef.current) mapRef.current.style.transform = 'none'
    }
  }, [correctedHeading])

  // useEffect(() => {
  //   zoomRef.current?.setView()
  // })

  useEffect(() => {
    zoomRef.current?.setZoom(zoom)
  }, [zoom])

  const waypointIcon = new OgIcon({
    iconUrl: 'https://i.ibb.co/wRwsWpq/Untitled-1-01.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, 0]
  })

  return (
    <div>
      <svg viewBox="0 0 600 455" className="compass-svg">
        <Compass heading={correctedHeading} range={100} />
      </svg>
      <svg viewBox="0 0 600 455" className="compass-svg-mask">
        <rect x={0} y={315} width={600} height={1000} />
        <path d="M 33, 315 A 265 265 0 1 1 567 315 L 600 315 L 600 0 L 0 0 L 0 315 L 33 315" fill="black" />
        <g transform="translate(275, 288)">
          <g transform="scale(0.045)">
            <path
              fill="white"
              d="M552.5,39v920.3l-158.2,103.8v-81.7l117.5-110.6L481,586.8l-370.8,97v-95.3l362.3-207.5V161.1
	c0-34.8,11.9-68.7,34.5-95.2C519.7,51,535.3,39,552.5,39z"
            />
            <path
              fill="white"
              d="M552.4,39v920.3l158.2,103.8v-81.7L593.2,870.9l30.7-284.1l370.8,97v-95.3L632.4,381V124.1
	C632.4,124.1,598.4,39,552.4,39z"
            />
            <path
              fill="#666666"
              d="M552.5,39v920.3l158.1,103.8v-43.9L579.3,911.4l14.5-47.3l30-277.3l370.8,97v-50.7L633.2,492.6l-0.7-332.5
	c-0.1-34.4-11.9-67.9-34.1-94.2C585.7,51,570.1,39,552.5,39z"
            />
            <polygon fill="#666666" points="110.2,683.7 481,586.8 472.6,492.6 110.2,633.1 " />
            <polygon fill="#666666" points="394.3,1063.1 544.2,964.8 525.5,911.4 394.3,1019.1 " />
          </g>
        </g>
      </svg>
      <div className="map-wrapper" ref={mapRef}>
        <MapContainer
          fadeAnimation={false}
          zoomAnimation={false}
          inertia={false}
          keyboard={false}
          tap={false}
          zoomSnap={0.1}
          id="MAP"
          ref={zoomRef}
          center={[33.43717, -112.01385]}
          zoom={zoom}
          attributionControl={false}
          scrollWheelZoom={true}
          style={mapStyle}
          zoomControl={false}
        >
          <TileLayer url="" />

          <Marker icon={waypointIcon} position={[props.sampleFlightPlan[0].lat, props.sampleFlightPlan[0].lon]}>
            <Tooltip direction="top" offset={[0, -15]} permanent>
              <div style={{ color: '#d202d4', transform: `rotate(${correctedHeading}deg)` }}>
                {props.sampleFlightPlan[0].name}
              </div>
            </Tooltip>
          </Marker>
          <Marker icon={waypointIcon} position={[props.sampleFlightPlan[1].lat, props.sampleFlightPlan[1].lon]}>
            <Tooltip direction="top" offset={[0, -15]} permanent>
              <div style={{ color: '#d202d4', transform: `rotate(${correctedHeading}deg)` }}>
                {props.sampleFlightPlan[1].name}
              </div>
            </Tooltip>
          </Marker>
          <Marker icon={waypointIcon} position={[props.sampleFlightPlan[2].lat, props.sampleFlightPlan[2].lon]}>
            <Tooltip direction="top" offset={[0, -20]} permanent>
              <div style={{ color: '#d202d4', transform: `rotate(${correctedHeading}deg)` }}>
                {props.sampleFlightPlan[2].name}
              </div>
            </Tooltip>
          </Marker>
          <Polyline pathOptions={inactivePathOptions} positions={props.flightPlanPath} />
          <Polyline pathOptions={activePathOptions} positions={props.activeFlightPlanPath} />
        </MapContainer>
      </div>
    </div>
  )
}
