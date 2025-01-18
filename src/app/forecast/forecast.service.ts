import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ForecastService {
  constructor(private http: HttpClient) {
  }

  // Get weather data for given coordinates
  getWeatherData(lat: number, lng: number): Observable<any> {
    const baseUrl = 'https://api.open-meteo.com/v1/forecast';
    const params = {
      latitude: lat,
      longitude: lng,
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,pressure_msl,wind_speed_10m,wind_direction_10m',
      hourly: 'temperature_2m,weather_code,visibility,uv_index,is_day,dew_point_2m',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max,daylight_duration,wind_gusts_10m_max',
      timezone: 'auto',
    };

    return this.http.get<any>(baseUrl, { params });
  }

  // Get air quality index for given coordinates
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
}
