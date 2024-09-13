import {
  Component,
  inject,
  signal,
} from '@angular/core';
import { SearchComponent } from './search/search.component';
import { CurrentComponent } from './current/current.component';
import { ExtendedComponent } from './extended/extended.component';
import { TodayComponent } from './today/today.component';
import { HourlyComponent } from './hourly/hourly.component';
import { WeatherServices } from './weather.services';
import { LocationObj } from './app.model';
import { animate, style, transition, trigger } from '@angular/animations';

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
  animations: [
    trigger('animateElement', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('125ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('125ms ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
    trigger('load', [
      transition(':leave', [
        style({ opacity: 0 }),
        animate('0.25s cubic-bezier(0.2, 0, 0.4, 1)', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AppComponent {
  // Inject the service
  private weatherService = inject(WeatherServices);

  location!: LocationObj;
  weatherData: {} | undefined;
  airQualityIndex: number | undefined;
  backdrop = signal<boolean>(false);

  // Get data if queried location found otherwise clear data
  onLocationFound(location?: LocationObj | null) {
    this.backdrop.set(true);
    setTimeout(() => {
      this.backdrop.set(false);
    }, 300)

    if (location) {
      this.location = { ...location };

      // Weather conditions
      this.weatherService.getWeatherData(location.lat, location.lng).subscribe(
        res => {
          this.weatherData = res;
        },
      );

      // Air quality
      this.weatherService.getAirQuality(location.lat, location.lng).subscribe(
        res => {
          this.airQualityIndex = res.current.european_aqi;
        },
      );
    } else {
      // Remove content
      this.weatherData = undefined;
      this.airQualityIndex = undefined;
    }
    // this.backdrop.set(false);
  }

  // Get component-specific data
  getCurrentData() {
    return this.weatherService.getCurrent(this.weatherData);
  }

  getHourlyData() {
    return this.weatherService.getHourly(this.weatherData);
  }

  getTodayData() {
    return this.weatherService.getToday(this.weatherData);
  }

  getExtendedData() {
    // this.loading.set(false);
    return this.weatherService.getExtended(this.weatherData);
  }

}
