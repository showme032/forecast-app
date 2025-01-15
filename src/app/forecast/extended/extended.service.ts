import { Injectable } from '@angular/core';
import { Extended } from '../../app.model';

@Injectable()
export class ExtendedService {

  constructor() { }

  // Return weather data for 7 days
  getExtended(data: any): Extended[] {
    let extended: Extended[] = [];

    for (let i = 0; i < 7; i += 1) {
      let day: Extended = {
        isToday: i === 0,
        date: data.daily.time[i],
        weatherCode: data.daily.weather_code[i],
        minTemperature: Math.round(data.daily.temperature_2m_min[i]),
        maxTemperature: Math.round(data.daily.temperature_2m_max[i]),
        uvMax: data.daily.uv_index_max[i],
        precipitation: data.daily.precipitation_probability_max[i],
      };

      extended.push(day);
    }

    return extended;
  }
}
