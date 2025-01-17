
export interface Location {
  lat: number;
  lng: number;
  name: string;
  country: string;
}

export interface WeatherData {
  current_units: {},
  current: {},
  daily_units: {},
  daily: {}
  elevation: number,
  generationtime_ms: number,
  hourly_units: {},
  hourly: {},
  latitude: number,
  longitude: number,
  utc_offset_seconds: number,
  timezone: string,
  timezone_abbreviation: string,
}

export interface Today {
  event: string,
  eventTime: string,
  eventAfter: string[],
  uv: number,
  visibility: number,
  pressure: number,
  windSpeed: number,
  windDirection: number,
  humidity: number,
  subjectiveTemp: number,
  dewPoint: number,
  current: number
}

export interface Current {
  temperature: number,
  weatherCode: number,
  min: number,
  max: number,
}

export interface Hourly {
  time: number,
  temperature: number
}

export interface Extended {
  isToday: boolean,
  date: string,
  weatherCode: number,
  conditions: string,
  minTemperature: number,
  maxTemperature: number,
  uvMax: number,
  precipitation: number,
}
