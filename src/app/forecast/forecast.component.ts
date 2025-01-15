import {
  Component,
  inject,
  input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { Location } from '../app.model';
import { WeatherServices } from '../weather.services';
import { CurrentComponent } from './current/current.component';
import { ExtendedComponent } from './extended/extended.component';
import { HourlyComponent } from './hourly/hourly.component';
import { TodayComponent } from './today/today.component';
import { ForecastService } from './forecast.service';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [
    CurrentComponent,
    ExtendedComponent,
    HourlyComponent,
    TodayComponent,
  ],
  providers: [ForecastService],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.css',
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
  ],
})
export class ForecastComponent implements OnChanges {
  location = input.required<Location>();

  weatherData = signal<{} | undefined>(undefined);
  airQualityIndex = signal<number>(0);
  // weatherData!: Signal<{}>;
  // weatherData = signal<{} | undefined>({});

  constructor(private forecastService: ForecastService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['location']) {
      this.forecastService
        .getWeatherData(this.location().lat, this.location().lng)
        .subscribe(
          res => {
            // this.weatherData = signal(res);
            this.weatherData.set(res);
          },
        );

      this.forecastService
        .getAirQuality(this.location().lat, this.location().lng)
        .subscribe(
          res => {
            this.airQualityIndex.set(res.current.european_aqi);
          },
        );
    }
  }
}
