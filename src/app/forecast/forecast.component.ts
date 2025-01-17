import {
  Component,
  input,
  OnChanges, OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import * as weatherData from '../../assets/exampleWeateherData.json'

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
export class ForecastComponent {
  constructor(private forecastService: ForecastService) {}
  // location = input.required<Location>();
  // weatherData = signal<{} | undefined>(undefined);
  // airQualityIndex = signal<number>(0);

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['location']) {
  //     this.forecastService
  //       .getWeatherData(this.location().lat, this.location().lng)
  //       .subscribe(
  //         res => {
  //           this.weatherData.set(res);
  //         },
  //       );
  //
  //     this.forecastService
  //       .getAirQuality(this.location().lat, this.location().lng)
  //       .subscribe(
  //         res => {
  //           this.airQualityIndex.set(res.current.european_aqi);
  //         },
  //       );
  //   }
  // }

  location = signal<any>({
    lat: 44,
    lng: 66,
    name: 'Cacak',
    country: 'Serbia',
  })
  weatherData: any = signal<any>(weatherData)
  airQualityIndex = signal<number>(66);
}
