import { Injectable } from '@angular/core';
import type { Current } from '../../app.model';

@Injectable()
export class CurrentService {

  constructor() { }

  // Return current weather data
  getCurrent(data: any): Current {
    return {
      temperature: data.current.temperature_2m,
      weatherCode: data.current.weather_code,
      min: data.daily.temperature_2m_min[0],
      max: data.daily.temperature_2m_max[0],
    };
  };

  // Return weather conditions according to input WMO code
  getConditions(code: number): string {
    const codes: { [key: number]: string } = {
      0: 'Clear sky',
      1: 'Mostly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Rime',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      66: 'Freezing rain',
      67: 'Freezing rain',
      71: 'Slight snowfall',
      73: 'Moderate snowfall',
      75: 'Heavy snowfall',
      77: 'Snow grains',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Heavy rain showers',
      85: 'Slight snow showers',
      86: 'Heavy snow showers',
      95: 'Thunderstorm',
      96: 'Hailstorm',
      99: 'Heavy Hailstorm',
    };

    return codes[code];
  }
}
