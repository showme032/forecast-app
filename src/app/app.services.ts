import { Injectable } from '@angular/core';
import { Current, Extended, Hourly, type Today } from './app.model';
import * as data from '../assets/weather.json';
import * as air from '../assets/air.json';

@Injectable({ providedIn: 'root' })
export class WeatherServices {
  private weatherData = (data as any).default;
  private airData = (air as any).default;
  private hour = new Date().getHours();

  // Get and sort current conditions
  getCurrent() {
    const current: Current = {
      location: 'Čačak', //TODO: make dynamic - geocoding API
      temperature: this.weatherData.current.temperature_2m,
      condition: this.weatherData.current.weather_code,
      min: this.weatherData.daily.temperature_2m_min[0],
      max: this.weatherData.daily.temperature_2m_max[0],
    }

    return current;
  };

  getHourly(): Hourly[] {

    const hourly: Hourly[] = this.weatherData.hourly.time
      .slice(this.hour, this.hour + 24)
      .map((time: Date, index: number) => {
        return {
          time: time,
          temperature: this.weatherData.hourly.temperature_2m[index],
        };
      });

    return hourly;
  }

  getToday() {
    const today: Today = {
      isDay: this.weatherData.current.is_day === 1,
      sunrise: this.weatherData.daily.sunrise[0],
      sunset: this.weatherData.daily.sunset[0],
      uv: this.weatherData.hourly.uv_index[this.hour],
      visibility: Math.round(this.weatherData.hourly.visibility[this.hour] / 3281),
      pressure: this.weatherData.current.pressure_msl,
      windSpeed: this.weatherData.current.wind_speed_10m,
      windDirection: this.weatherData.current.wind_direction_10m,
      humidity: this.weatherData.current.relative_humidity_2m,
      subjectiveTemp: this.weatherData.current.apparent_temperature,
      airQuality: this.airData.current.us_aqi,
    };

    return today;
  }

  // Get and sort data for 7-day forecast
  getExtended() {
    const extended = []
    for (let i = 0; i < 7; i += 1) {
      let day: Extended = {
        date: this.weatherData.daily.time[i],
        conditions: this.getConditions(this.weatherData.daily.weather_code[i]),
        minTemperature: this.weatherData.daily.temperature_2m_min[i],
        maxTemperature: this.weatherData.daily.temperature_2m_max[i],
        uvMax: this.weatherData.daily.uv_index_max[i],
        precipitation: this.weatherData.daily.precipitation_probability_max[i],
      }

      extended.push(day);
    }

    return extended;
  }

  // Get weather conditions via supplemented WMO code
  getConditions(code: number): string | undefined {
    let codes: { [key: number]: string} = {
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
      99: 'Heavy Hailstorm'
    }

    return codes[code]
  }
}
