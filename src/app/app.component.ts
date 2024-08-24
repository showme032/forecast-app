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
  location: undefined | string;
  weatherData: undefined | {};
  airQualityIndex: undefined | number;
  errorMessage: undefined | string;

  // Set variables on search, call weather
  onLocationSearch(location: string) {
    this.weatherService.getCoordinates(location).subscribe(
      res => {
        if (res.results) {
          const lat = res.results[0].latitude;
          const lng = res.results[0].longitude;

          this.location = `${res.results[0].name}, ${res.results[0].country_code}`;
          this.errorMessage = undefined;
          this.getAllData(lat, lng);
        } else {
          console.log(`No location for '${location}' query found`);
          this.errorMessage = 'No location found';
          this.weatherData = undefined;
        }
      },
    );
  }

  // Get Weather & Air Quality data
  getAllData(lat: number, lng: number) {
    this.weatherService.getWeatherData(lat, lng).subscribe(
      res => {
        this.weatherData = res;
        console.log(res);
      },
    );

    this.weatherService.getAirQuality(lat, lng).subscribe(
      res => {
        this.airQualityIndex = res.current.european_aqi;
      }
    )
  }

  // Get component-specific data
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
