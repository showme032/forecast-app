import { Observable } from 'rxjs';

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
}

export interface Current {
  temperature: number,
  weatherCode: number,
  min: number,
  max: number,
}

export interface Hourly {
  time: string,
  temperature: number
}

export interface Extended {
  date: string,
  weatherCode: number,
  minTemperature: number,
  maxTemperature: number,
  uvMax: number,
  precipitation: number,
}
