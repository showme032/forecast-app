import { Component, computed, inject, input, Input, Signal } from '@angular/core';
import { CurrentComponent } from './current/current.component';
import { ExtendedComponent } from './extended/extended.component';
import { HourlyComponent } from './hourly/hourly.component';
import { TodayComponent } from './today/today.component';
import { WeatherServices } from '../weather.services';
import { Current, Extended, Hourly, Location, Today } from '../app.model';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [
    CurrentComponent,
    ExtendedComponent,
    HourlyComponent,
    TodayComponent,
  ],
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
  ]
})
export class ForecastComponent {
  // Inject the service
  private weatherService = inject(WeatherServices);
  location = input.required<Location>();


  weatherData?: {} | undefined;
  currentData!: Signal<Current>;
  hourlyData!: Signal<Hourly[]>;
  todayData!: Signal<Today>;
  airQualityIndex!: number;
  extendedData!: Signal<Extended[]>;

  ngOnInit(): void {
    // Weather conditions
    this.weatherService.getWeatherData(this.location().lat, this.location().lng).subscribe(
      res => {
        this.weatherData = res;
      },
    );

    this.currentData = computed(() => this.weatherService.getCurrent(this.weatherData));
    this.hourlyData = computed(() => this.weatherService.getHourly(this.weatherData));
    this.extendedData = computed(() => this.weatherService.getExtended(this.weatherData));
    this.todayData = computed(() => this.weatherService.getToday(this.weatherData));

    // Air quality
    this.weatherService.getAirQuality(this.location().lat, this.location().lng).subscribe(
      res => {
        this.airQualityIndex = res.current.european_aqi;
      },
    );
  }

}
