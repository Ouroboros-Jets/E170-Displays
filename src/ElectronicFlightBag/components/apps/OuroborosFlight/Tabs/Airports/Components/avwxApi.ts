export enum E_WeatherTypes {
  METAR,
  TAF,
  WINDS
}

export enum E_WindRegions {
  ALL = 'all',
  BOS = 'bos',
  MIA = 'mia',
  CHI = 'chi',
  DFW = 'dfw',
  SLC = 'slc',
  SFO = 'sfo',
  ALASKA = 'alaska',
  HAWAII = 'hawaii',
  OTHER_PAC = 'other_pac'
}

export type T_WeatherReturnTypeMetar = {
  meta: {
    timestamp: string | null
  }
  altimeter: {
    repr: string | null
    value: number | null
    spoken: string | null
  }
  clouds: Array<{
    repr: string | null
    type: string | null
    altitude: number | null
    modifier: string | null
    direction: string | null
  }> | null
  flight_rules: string | null
  other: any[] | null // Adjust this type based on the actual structure of the "other" property
  sanitized: string | null
  visibility: {
    repr: string | null
    value: number | null
    spoken: string | null
  }
  wind_direction: {
    repr: string | null
    value: number | null
    spoken: string | null
  }
  wind_gust: {
    repr: string | null
    value: number | null
    spoken: string | null
  }
  wind_speed: {
    repr: string | null
    value: number | null
    spoken: string | null
  }
  wx_codes: Array<{
    repr: string | null
    value: string | null
  }> | null
  raw: string | null
  station: string | null
  time: {
    repr: string | null
    dt: string | null
  } | null
  remarks: string | null
  dewpoint: {
    repr: string | null
    value: number | null
    spoken: string | null
  }
  relative_humidity: number | null
  remarks_info: {
    maximum_temperature_6: number | null
    minimum_temperature_6: number | null
    pressure_tendency: string | null
    precip_36_hours: number | null
    precip_24_hours: number | null
    sunshine_minutes: number | null
    codes: Array<{
      repr: string | null
      value: string | null
    }> | null
    dewpoint_decimal: {
      repr: string | null
      value: number | null
      spoken: string | null
    } | null
    maximum_temperature_24: number | null
    minimum_temperature_24: number | null
    precip_hourly: number | null
    sea_level_pressure: {
      repr: string | null
      value: number | null
      spoken: string | null
    } | null
    snow_depth: number | null
    temperature_decimal: {
      repr: string | null
      value: number | null
      spoken: string | null
    } | null
  } | null
  runway_visibility: any[] | null // Adjust this type based on the actual structure of the "runway_visibility" property
  temperature: {
    repr: string | null
    value: number | null
    spoken: string | null
  }
  wind_variable_direction: any[] | null // Adjust this type based on the actual structure of the "wind_variable_direction" property
  density_altitude: number | null
  pressure_altitude: number | null
  units: {
    accumulation: string | null
    altimeter: string | null
    altitude: string | null
    temperature: string | null
    visibility: string | null
    wind_speed: string | null
  } | null
}

export const sampleMetar: T_WeatherReturnTypeMetar = {
  meta: {
    timestamp: ''
  },
  altimeter: {
    repr: '',
    value: 0,
    spoken: ''
  },
  clouds: [
    {
      repr: '',
      type: '',
      altitude: 0,
      modifier: '',
      direction: ''
    }
  ],
  flight_rules: '',
  other: [null],
  sanitized: '',
  visibility: {
    repr: '',
    value: 0,
    spoken: ''
  },
  wind_direction: {
    repr: '',
    value: 0,
    spoken: ''
  },
  wind_gust: {
    repr: '',
    value: 0,
    spoken: ''
  },
  wind_speed: {
    repr: '',
    value: 0,
    spoken: ''
  },
  wx_codes: [
    {
      repr: '',
      value: ''
    }
  ],
  raw: '',
  station: '',
  time: {
    repr: '',
    dt: ''
  },
  remarks: '',
  dewpoint: {
    repr: '',
    value: 0,
    spoken: ''
  },
  relative_humidity: 0,
  remarks_info: {
    maximum_temperature_6: 0,
    minimum_temperature_6: 0,
    pressure_tendency: '',
    precip_36_hours: 0,
    precip_24_hours: 0,
    sunshine_minutes: 0,
    codes: [
      {
        repr: '',
        value: ''
      }
    ],
    dewpoint_decimal: {
      repr: '',
      value: 0,
      spoken: ''
    },
    maximum_temperature_24: 0,
    minimum_temperature_24: 0,
    precip_hourly: 0,
    sea_level_pressure: {
      repr: '',
      value: 0,
      spoken: ''
    },
    snow_depth: 0,
    temperature_decimal: {
      repr: '',
      value: 0,
      spoken: ''
    }
  },
  runway_visibility: [null],
  temperature: {
    repr: '',
    value: 0,
    spoken: ''
  },
  wind_variable_direction: [null],
  density_altitude: 0,
  pressure_altitude: 0,
  units: {
    accumulation: '',
    altimeter: '',
    altitude: '',
    temperature: '',
    visibility: '',
    wind_speed: ''
  }
}

export type T_WeatherReturnTypeTaf = {
  meta: {
    timestamp: string | null
  }
  raw: string | null
  station: string | null
  time: {
    repr: string | null
    dt: string | null
  }
  remarks: string | null
  forecast: Array<{
    altimeter: string | null
    clouds: Array<{
      repr: string | null
      type: string | null
      altitude: number | null
      modifier: string | null
      direction: string | null
    }>
    flight_rules: string | null
    other: Array<unknown | null>
    sanitized: string | null
    visibility: {
      repr: string | null
      value: number | null
      spoken: string | null
    }
    wind_direction: {
      repr: string | null
      value: number | null
      spoken: string | null
    }
    wind_gust: {
      repr: string | null
      value: number | null
      spoken: string | null
    }
    wind_speed: {
      repr: string | null
      value: number | null
      spoken: string | null
    }
    wx_codes: Array<{
      repr: string | null
      value: string | null
    }>
    end_time: {
      repr: string | null
      dt: string | null
    }
    icing: Array<unknown | null>
    probability: unknown | null
    raw: string | null
    start_time: {
      repr: string | null
      dt: string | null
    }
    turbulence: Array<unknown | null>
    type: string | null
    wind_shear: unknown | null
    summary: string | null
  }>
  start_time: {
    repr: string | null
    dt: string | null
  }
  end_time: {
    repr: string | null
    dt: string | null
  }
  max_temp: string | null
  min_temp: string | null
  alts: null | null
  temps: null | null
  units: {
    altimeter: string | null
    altitude: string | null
    temperature: string | null
    visibility: string | null
    wind_speed: string | null
  } | null
}

export const sampleTaf: T_WeatherReturnTypeTaf = {
  meta: {
    timestamp: ''
  },
  raw: '',
  station: '',
  time: {
    repr: '',
    dt: ''
  },
  remarks: '',
  forecast: [
    {
      altimeter: '',
      clouds: [
        {
          repr: '',
          type: '',
          altitude: 0,
          modifier: '',
          direction: ''
        }
      ],
      flight_rules: '',
      other: [null],
      sanitized: '',
      visibility: {
        repr: '',
        value: 0,
        spoken: ''
      },
      wind_direction: {
        repr: '',
        value: 0,
        spoken: ''
      },
      wind_gust: {
        repr: '',
        value: 0,
        spoken: ''
      },
      wind_speed: {
        repr: '',
        value: 0,
        spoken: ''
      },
      wx_codes: [
        {
          repr: '',
          value: ''
        }
      ],
      end_time: {
        repr: '',
        dt: ''
      },
      icing: [null],
      probability: null,
      raw: '',
      start_time: {
        repr: '',
        dt: ''
      },
      turbulence: [null],
      type: '',
      wind_shear: null,
      summary: ''
    }
  ],
  start_time: {
    repr: '',
    dt: ''
  },
  end_time: {
    repr: '',
    dt: ''
  },
  max_temp: '',
  min_temp: '',
  alts: null,
  temps: null,
  units: {
    altimeter: '',
    altitude: '',
    temperature: '',
    visibility: '',
    wind_speed: ''
  }
}

const WeatherApiToken = 'VOLtoR0khhrWFqE-knqcEIsLXbJmM3H9JiiQCkaXIuU'
const baseUrl: string = `https://avwx.rest/api/`
const Token: string = `?token=${WeatherApiToken}`
export const weatherUrlBuilder = (LGet: E_WeatherTypes, input: string | E_WindRegions): string => {
  if ((LGet === E_WeatherTypes.METAR || LGet === E_WeatherTypes.TAF) && typeof input !== 'string')
    throw new Error('Invalid input type. You must use a string when calling for metar or TAF')

  switch (LGet) {
    case E_WeatherTypes.METAR:
      return baseUrl + `metar/${input}` + Token
    case E_WeatherTypes.TAF:
      return baseUrl + `taf/${input}` + Token
    case E_WeatherTypes.WINDS:
      return baseUrl + `windtemp?region=${input}&level=low&fcst=06`
  }
}

export type T_NotamReturnType = {
  meta: {
    timestamp: string | null
    stations_updated: string | null
  }
  data: Array<{
    raw: string | null
    sanitized: string | null
    station: string | null
    time: {
      repr: string | null
      dt: string | null
    } | null
    number: string | null
    replaces: null | null
    type: {
      repr: string | null
      value: string | null
    } | null
    qualifiers: {
      repr: string | null
      fir: string | null
      subject: {
        repr: string | null
        value: string | null
      } | null
      condition: {
        repr: string | null
        value: string | null
      } | null
      traffic: {
        repr: string | null
        value: string | null
      } | null
      purpose: Array<{
        repr: string | null
        value: string | null
      } | null> | null
      scope: Array<{
        repr: string | null
        value: string | null
      } | null> | null
      lower: {
        repr: string | null
        value: number | null
        spoken: string | null
      } | null
      upper: {
        repr: string | null
        value: number | null
        spoken: string | null
      } | null
      coord: {
        lat: number | null
        lon: number | null
        repr: string | null
      } | null
      radius: {
        repr: string | null
        value: number | null
        spoken: string | null
      } | null
    } | null
    start_time: {
      repr: string | null
      dt: string | null
    } | null
    end_time: {
      repr: string | null
      dt: string | null
    } | null
    schedule: null | null
    body: string | null
    lower: null | null
    upper: null | null
  }>
}

export const sampleNotam: T_NotamReturnType = {
  meta: {
    timestamp: ' ',
    stations_updated: ' '
  },
  data: [
    {
      raw: ' ',
      sanitized: ' ',
      station: ' ',
      time: {
        repr: ' ',
        dt: ' '
      },
      number: ' ',
      replaces: null,
      type: {
        repr: ' ',
        value: ' '
      },
      qualifiers: {
        repr: ' ',
        fir: ' ',
        subject: {
          repr: ' ',
          value: ' '
        },
        condition: {
          repr: ' ',
          value: ' '
        },
        traffic: {
          repr: ' ',
          value: ' '
        },
        purpose: [
          {
            repr: ' ',
            value: ' '
          }
        ],
        scope: [
          {
            repr: ' ',
            value: ' '
          }
        ],
        lower: {
          repr: ' ',
          value: 0,
          spoken: ' '
        },
        upper: {
          repr: ' ',
          value: 0,
          spoken: ' '
        },
        coord: {
          lat: 0,
          lon: 0,
          repr: ' '
        },
        radius: {
          repr: ' ',
          value: 0,
          spoken: ' '
        }
      },
      start_time: {
        repr: ' ',
        dt: ' '
      },
      end_time: {
        repr: ' ',
        dt: ' '
      },
      schedule: null,
      body: ' ',
      lower: null,
      upper: null
    }
  ]
}

export const notamUrlBuilder = (location: string): string => {
  if (location.length > 4) console.error('notamUrlBuilder: Expected a 4 digit ICAO code')
  return baseUrl + `notam/${location}?distance=10&` + Token
}

export type T_StationReturnType = {
  city: string
  country: string
  elevation_ft: number
  elevation_m: number
  gps: string
  iata: string
  icao: string
  latitude: number
  local: string
  longitude: number
  name: string
  note: string
  reporting: true
  runways: [
    {
      length_ft: number
      width_ft: number
      ident1: string
      ident2: string
    }
  ]
  state: string
  type: string
  website: string
  wiki: string
}

export const sampleStation: T_StationReturnType = {
  city: '',
  country: '',
  elevation_ft: 0,
  elevation_m: 0,
  gps: '',
  iata: '',
  icao: '',
  latitude: 0,
  local: '',
  longitude: 0,
  name: '',
  note: '',
  reporting: true,
  runways: [
    {
      length_ft: 0,
      width_ft: 0,
      ident1: '',
      ident2: ''
    }
  ],
  state: '',
  type: '',
  website: '',
  wiki: ''
}

export const stationUrlBuilder = (icao: string): string => {
  if (icao.length > 4) throw new Error('Please use ICAO formap for station api request')
  return baseUrl + `station/${icao}` + Token
}

export const searchUrlBuilder = (text: string): string => {
  return baseUrl + `search/station?text=${text}` + Token
}

export type T_NearestAirportReturnType = []
export type T_Nearest = Array<{
  coordinate_distance: number | undefined
  kilometers: number | undefined
  miles: number | undefined
  nautical_miles: number | undefined
  station:
    | {
        city: string | undefined
        country: string | undefined
        elevation_ft: number | undefined
        elevation_m: number | undefined
        gps: string | undefined
        iata: string | undefined
        icao: string | undefined
        latitude: number | undefined
        local: string | undefined
        longitude: number | undefined
        name: string | undefined
        note: string | undefined
        reporting: boolean | undefined
        runways:
          | Array<{
              bearing1: number | undefined
              bearing2: number | undefined
              ident1: string | undefined
              ident2: string | undefined
              length_ft: number | undefined
              lights: boolean | undefined
              surface: string | undefined
              width_ft: number | undefined
            }>
          | undefined
        state: string | undefined
        type: string | undefined
        website: string | undefined
        wiki: string | undefined
      }
    | undefined
}>

export const sampleNearest: T_Nearest = [
  {
    coordinate_distance: 0,
    kilometers: 0,
    miles: 0,
    nautical_miles: 0,
    station: {
      city: '',
      country: '',
      elevation_ft: 0,
      elevation_m: 0,
      gps: '',
      iata: '',
      icao: '',
      latitude: 0,
      local: '',
      longitude: 0,
      name: '',
      note: '',
      reporting: true,
      runways: [
        {
          bearing1: 0,
          bearing2: 0,
          ident1: '',
          ident2: '',
          length_ft: 0,
          lights: true,
          surface: '',
          width_ft: 0
        }
      ],
      state: '',
      type: '',
      website: '',
      wiki: ''
    }
  }
]

export const nearestUrlBuilder = (coords: number[]): string => {
  return baseUrl + `station/near/${coords[0]},${coords[1]}` + Token
}

const degToRad = (degrees: number): number => {
  return degrees * (Math.PI / 180)
}

export const calculateDistanceLatLonToNM = (coords1: number[], coords2: number[]): number => {
  const R = 6371
  const dLat = degToRad(coords2[0] - coords1[0])
  const dLon = degToRad(coords2[1] - coords1[1])

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(coords1[0])) * Math.cos(degToRad(coords2[0])) * Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distKm = R * c

  const distNM = distKm * 0.539957

  return distNM
}

export const multiMetarURLBuilder = (metars: string[]): string => {
  const airports: string = metars.join(',')
  return baseUrl + `multi/metar/${airports}` + Token
}
// we need better key for this
