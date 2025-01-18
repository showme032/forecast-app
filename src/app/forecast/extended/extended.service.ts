import {inject, Injectable } from '@angular/core';
import { Extended } from '../../app.model';

@Injectable()
export class ExtendedService {
  // Return weather data for 7 days
  getExtended(data: any): Extended[] {
    let extended: Extended[] = [];

    for (let i = 0; i < 7; i += 1) {
      let daylightMinutes = Math.round(data.daily.daylight_duration[i] / 60);
      let hours = Math.floor(daylightMinutes / 60)
      let minutes = daylightMinutes % 60;

      let day: Extended = {
        isToday: i === 0,
        date: data.daily.time[i],
        weatherCode: data.daily.weather_code[i],
        conditions: this.getConditions(data.daily.weather_code[i]),
        minTemperature: Math.round(data.daily.temperature_2m_min[i]),
        maxTemperature: Math.round(data.daily.temperature_2m_max[i]),
        uvMax: data.daily.uv_index_max[i],
        precipitation: data.daily.precipitation_probability_max[i],
        daylight_duration: `${hours}h ${minutes}min`,
        wind_gusts_10m_max: data.daily.wind_gusts_10m_max[i],
      };

      extended.push(day);
    }

    return extended;
  }

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
