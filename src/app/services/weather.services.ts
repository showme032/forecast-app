import { Injectable } from '@angular/core';
import { Current, Extended, Hourly, type Today } from '../app.model';
import * as air from '../../assets/air.json';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherServices {
  constructor(private http: HttpClient) {
  }

  private hour = new Date().getHours();
  private airData = undefined;

  // Geocoding API to get coordinates for queried location
  getCoordinates(location: string): Observable<any> {
    const baseUrl = 'https://geocoding-api.open-meteo.com/v1/search';
    const params = {
      name: location,
      count: '1',
      language: 'en',
      format: 'json',
    };

    return this.http.get<any>(baseUrl, { params });
  }

  // Get weather data for given coordinates
  getWeatherData(lat: number, lng: number): Observable<any> {
    const baseUrl = 'https://api.open-meteo.com/v1/forecast';
    const params = {
      latitude: lat,
      longitude: lng,
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,pressure_msl,wind_speed_10m,wind_direction_10m',
      hourly: 'temperature_2m,weather_code,visibility,uv_index,is_day',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max',
      timezone: 'auto',
    };

    return this.http.get<any>(baseUrl, { params });
  }

  // Get air quality index
  getAirQuality(lat: number, lng: number): Observable<any> {
    const baseUrl = 'https://air-quality-api.open-meteo.com/v1/air-quality?';
    const params = {
      latitude: lat,
      longitude: lng,
      current: 'european_aqi',
      hourly: 'pm10,pm2_5',
      forecast_days: '1',
    };

    return this.http.get<any>(baseUrl, { params });
  }

  // Get current weather conditions
  getCurrent(data: any) {
    const current: Current = {
      temperature: data.current.temperature_2m,
      condition: this.getConditions(data.current.weather_code),
      min: data.daily.temperature_2m_min[0],
      max: data.daily.temperature_2m_max[0],
    };

    return current;
  };

  // Get hourly data
  getHourly(data: any): Hourly[] {
    return data.hourly.time
      .slice(this.hour, this.hour + 24)
      .map((time: Date, index: number) => {
        return {
          time: time,
          temperature: data.hourly.temperature_2m[index],
        };
      });
  }

  // Get today's conditions
  getToday(data: any) {
    const today: Today = {
      isDay: data.current.is_day === 1,
      sunrise: data.daily.sunrise[0],
      sunset: data.daily.sunset[0],
      uv: data.hourly.uv_index[this.hour],
      visibility: Math.round(data.hourly.visibility[this.hour] / 3281),
      pressure: data.current.pressure_msl,
      windSpeed: data.current.wind_speed_10m,
      windDirection: data.current.wind_direction_10m,
      humidity: data.current.relative_humidity_2m,
      subjectiveTemp: data.current.apparent_temperature,
    };

    return today;
  }

  // Get data for 7 days
  getExtended(data: any) {
    const extended = [];
    for (let i = 0; i < 7; i += 1) {
      let day: Extended = {
        date: data.daily.time[i],
        conditions: this.getConditions(data.daily.weather_code[i]),
        minTemperature: data.daily.temperature_2m_min[i],
        maxTemperature: data.daily.temperature_2m_max[i],
        uvMax: data.daily.uv_index_max[i],
        precipitation: data.daily.precipitation_probability_max[i],
      };

      extended.push(day);
    }

    return extended;
  }

  // Get weather conditions via supplemented WMO code
  getConditions(code: number): string | undefined {
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
