import {
  Component, computed,
  inject, Signal,
  signal,
} from '@angular/core';
import { SearchComponent } from './search/search.component';
import { CurrentComponent } from './current/current.component';
import { ExtendedComponent } from './extended/extended.component';
import { TodayComponent } from './today/today.component';
import { HourlyComponent } from './hourly/hourly.component';
import { WeatherServices } from './weather.services';
import { Current, Extended, Hourly, LocationObj, Today } from './app.model';
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
  // Switch to signal
  weatherData: {} | undefined;
  airQualityIndex: number | undefined;
  currentData!: Signal<Current>;
  hourlyData!: Signal<Hourly[]>;
  todayData!: Signal<Today>;
  extendedData!: Signal<Extended[]>;

  // Get data if queried location found otherwise clear data
  onLocationFound(location: LocationObj | null) {
    if (location) {
      this.location = { ...location };

      // Weather conditions
      this.weatherService.getWeatherData(location.lat, location.lng).subscribe(
        res => {
          this.weatherData = res;
          console.log('weather data set');
        },
      );

      this.currentData = computed(() => this.weatherService.getCurrent(this.weatherData));
      this.hourlyData = computed(() => this.weatherService.getHourly(this.weatherData));
      this.extendedData = computed(() => this.weatherService.getExtended(this.weatherData));
      this.todayData = computed(() => this.weatherService.getToday(this.weatherData));

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
  }
}
