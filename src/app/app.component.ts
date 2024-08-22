import { Component, inject } from '@angular/core';
import * as data from '../assets/weather.json';
import * as air from '../assets/air.json';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { CurrentComponent } from './current/current.component';
import { ExtendedComponent } from './extended/extended.component';
import { TodayComponent } from './today/today.component';
import { HourlyComponent } from './hourly/hourly.component';
import { WeatherServices} from './app.services';

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

  // TODO: outsource to a service
  weatherData = (data as any).default;
  airData = (air as any).default;

  constructor() {
    console.log(this.weatherData);
  }

}
