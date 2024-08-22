import { Component, inject } from '@angular/core';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { CurrentComponent } from './current/current.component';
import { ExtendedComponent } from './extended/extended.component';
import { TodayComponent } from './today/today.component';
import { HourlyComponent } from './hourly/hourly.component';
import { WeatherServices } from './services/weather.services';

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
  // Inject the service
  private weatherService = inject(WeatherServices);
  weatherData = undefined;
  location = undefined;
  airQualityIndex = undefined;

  onLocationSearch(location: string) {
    this.weatherService.getCoordinates(location).subscribe(
      res => {
        const lat = res.results[0].latitude;
        const lng = res.results[0].longitude;

        this.location = res.results[0].name;
        this.getWeatherData(lat, lng);
      },
    );
  }

  getWeatherData(lat: number, lng: number) {
    this.weatherService.getWeatherData(lat, lng).subscribe(
      res => {
        this.weatherData = res;
      },
    );

    this.weatherService.getAirQuality(lat, lng).subscribe(
      res => {
        this.airQualityIndex = res.current.european_aqi;
      }
    )
  }

  getCurrentData() {
    return this.weatherService.getCurrent(this.weatherData)
  }

  getHourlyData() {
    return this.weatherService.getHourly(this.weatherData)
  }

  getTodayData() {
    return this.weatherService.getToday(this.weatherData)
  }

  getExtendedData() {
    return this.weatherService.getExtended(this.weatherData)
  }
}
