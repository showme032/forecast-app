import { Injectable } from '@angular/core';
import {
  type Current,
  type Extended,
  type Hourly,
  type Today,
} from './app.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherServices {
  constructor(private http: HttpClient) {}

  private hour = new Date().getHours();

  // Return current weather data
  getCurrent(data: any): Current {
    console.log(data);
    return {
      temperature: data.current.temperature_2m,
      weatherCode: data.current.weather_code,
      min: data.daily.temperature_2m_min[0],
      max: data.daily.temperature_2m_max[0],
    };
  };

  // Return hourly weather data
  getHourly(data: any): Hourly[] {
    const hourly: Hourly[] = [];
    for (let i = this.hour; i < this.hour + 24; i++) {
      hourly.push({
        time: data.hourly.time[i],
        temperature: data.hourly.temperature_2m[i],

      });
    }

    return hourly;
  }

  // Return today's weather data
  getToday(data: any): Today {
    return {
      event: data.current.is_day === 1 ? 'SUNSET' : 'SUNRISE',
      eventTime: data.current.is_day === 1 ? data.daily.sunset[0] : data.daily.sunrise[0],
      eventAfter: data.current.is_day === 1 ? ['Sunrise:', data.daily.sunrise[0]] : ['Sunset:', data.daily.sunset[0]],
      uv: data.hourly.uv_index[this.hour],
      visibility: Math.round(data.hourly.visibility[this.hour] / 3281),
      pressure: data.current.pressure_msl,
      windSpeed: data.current.wind_speed_10m,
      windDirection: data.current.wind_direction_10m,
      humidity: data.current.relative_humidity_2m,
      dewPoint: data.hourly.dew_point_2m[this.hour],
      subjectiveTemp: data.current.apparent_temperature,
      current: data.hourly.temperature_2m[this.hour],
    };

  }

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
