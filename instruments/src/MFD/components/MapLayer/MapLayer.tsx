import { type T_FlightPlan } from 'instruments/common/WaypointTypes/WaypointTypes'
import React, { type FC } from 'react'
import { MapContainer, TileLayer, SVGOverlay, Polyline } from 'react-leaflet'

type T_MapLayerProps = {
  sampleFlightPlan: T_FlightPlan
  flightPlanPath: Array<[number, number]>
}

export const MapLayer: FC<T_MapLayerProps> = (props: T_MapLayerProps) => {
  const mapStyle = {
    height: '400px',
    overflow: 'hidden',
    width: '100%',
    backgroundColor: 'black',
    cursor: 'default', // Disable cursor for dragging
    touchAction: 'none' // Disable touch actions for dragging on touch devices
  }
  const activePathOptions = { color: '#d202d4' }
  return (
    <MapContainer
      id="MAP"
      center={[33.43717, -112.01385]}
      zoom={10}
      attributionControl={false}
      scrollWheelZoom={true}
      style={mapStyle}
      zoomControl={false}
    >
      <TileLayer url="" />
      <SVGOverlay
        attributes={{ stroke: 'red' }}
        bounds={[
          [props.sampleFlightPlan[0].lat - 0.001, props.sampleFlightPlan[0].lon - 0.001],
          [props.sampleFlightPlan[0].lat + 0.001, props.sampleFlightPlan[0].lon + 0.001]
        ]}
      >
        <rect x="0" y="0" width="100%" height="100%" fill="blue" />
      </SVGOverlay>

      <SVGOverlay
        attributes={{ stroke: 'red' }}
        bounds={[
          [props.sampleFlightPlan[1].lat - 0.001, props.sampleFlightPlan[1].lon - 0.001],
          [props.sampleFlightPlan[1].lat + 0.001, props.sampleFlightPlan[1].lon + 0.001]
        ]}
      >
        <rect x="0" y="0" width="100%" height="100%" fill="blue" />
      </SVGOverlay>

      <SVGOverlay
        attributes={{ stroke: 'red' }}
        bounds={[
          [props.sampleFlightPlan[2].lat - 0.001, props.sampleFlightPlan[2].lon - 0.001],
          [props.sampleFlightPlan[2].lat + 0.001, props.sampleFlightPlan[2].lon + 0.001]
        ]}
      >
        <rect x="0" y="0" width="100%" height="100%" fill="blue" />
      </SVGOverlay>

      <Polyline pathOptions={activePathOptions} positions={props.flightPlanPath} />
    </MapContainer>
  )
}
