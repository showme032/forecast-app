export interface Today {
  isDay: boolean,
  sunrise: string,
  sunset: string,
  uv: number,
  visibility: number,
  pressure: number,
  windSpeed: number,
  windDirection: number,
  humidity: number,
  subjectiveTemp: number,
  airQuality: number
}

export interface Current {
  location: string
  temperature: number,
  condition: string | undefined,
  min: number,
  max: number,
}

export interface Hourly {
  time: string,
  temperature: number
}

export interface Extended {
  date: string,
  conditions: string | undefined,
  minTemperature: number,
  maxTemperature: number,
  uvMax: number,
  precipitation: number,
}
