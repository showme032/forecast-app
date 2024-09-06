import { Component, inject } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { CurrentComponent } from './current/current.component';
import { ExtendedComponent } from './extended/extended.component';
import { TodayComponent } from './today/today.component';
import { HourlyComponent } from './hourly/hourly.component';
import { WeatherServices } from './weather.services';
import { LocationObj } from './app.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SearchComponent,
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

  location!: LocationObj;
  weatherData: undefined | {};
  airQualityIndex: undefined | number;

  // Get data if queried location found
  onLocationFound(location: LocationObj) {
    this.location = {...location}
    console.log(this.location);

    // Weather conditions
    this.weatherService.getWeatherData(location.lat, location.lng).subscribe(
      res => {
        this.weatherData = res;
        console.log(res);
      },
    );

    // Air quality
    this.weatherService.getAirQuality(location.lat, location.lng).subscribe(
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
