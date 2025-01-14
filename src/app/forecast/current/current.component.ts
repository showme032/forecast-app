import { Component, inject, input } from '@angular/core';
import {
  DecimalPipe,
} from '@angular/common';
import { Current, Location } from '../../app.model';
import { WeatherServices } from '../../weather.services';

@Component({
  selector: 'app-current',
  standalone: true,
  imports: [
    DecimalPipe,
  ],
  templateUrl: './current.component.html',
  styleUrl: './current.component.css',
})
export class CurrentComponent {
  private weatherService = inject(WeatherServices);

  current = input.required<Current>();
  location = input.required<Location>();


  get conditions() {
    return this.weatherService.getConditions(this.current().weatherCode);
  }

  get imagePath() {
    return `/assets/weather-icons/${this.current().weatherCode}.svg`;
  }

}
