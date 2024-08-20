import { Component } from '@angular/core';
import * as data from '../assets/weather.json';
import * as air from '../assets/air.json';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { CurrentComponent } from './current/current.component';
import { ExtendedComponent } from './extended/extended.component';
import { TodayComponent } from './today/today.component';
import { HourlyComponent } from './hourly/hourly.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SearchbarComponent,
    CurrentComponent,
    ExtendedComponent,
    TodayComponent,
    HourlyComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  weatherData = (data as any).default;
  airData = (air as any).default;
  now = new Date();
  hour = this.now.getHours();

  constructor() {
    console.log(this.weatherData);
  }

  current = {
    location: 'Čačak', //TODO: make dynamic - geocoding API
    temperature: this.weatherData.current.temperature_2m,
    condition: 'overcast', //TODO: make dynamic - WMO codes
    min: this.weatherData.daily.temperature_2m_min[0],
    max: this.weatherData.daily.temperature_2m_max[0]
  }

  hourly = this.weatherData.hourly.time.slice(this.hour, this.hour + 24).map((time: Date, index: number) => {
    return {
      time: time,
      temperature: this.weatherData.hourly.temperature_2m[index]
    };
  })

  today = {
    isDay: this.weatherData.current.is_day === 1,
    sunrise: this.weatherData.daily.sunrise[0],
    sunset: this.weatherData.daily.sunset[0],
    uv: this.weatherData.hourly.uv_index[this.hour],
    visibility: Math.round(this.weatherData.hourly.visibility[this.hour] / 3.281),
    pressure: this.weatherData.current.pressure_msl,
    windSpeed: this.weatherData.current.wind_speed_10m,
    windDirection: this.weatherData.current.wind_direction_10m,
    humidity: this.weatherData.current.relative_humidity_2m,
    subjectiveTemp: this.weatherData.current.apparent_temperature,
    airQuality: this.airData.current.us_aqi
  }
}
