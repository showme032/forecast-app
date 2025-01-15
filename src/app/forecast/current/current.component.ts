import { Component, computed, inject, input, SimpleChanges } from '@angular/core';
import { DecimalPipe } from '@angular/common';
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
  weatherData = input.required<{} | undefined>();

  current = computed(() => this.weatherService.getCurrent(this.weatherData()));
  location = input.required<Location>();

  get conditions() {
    return this.weatherService.getConditions(this.current().weatherCode);
  }

  get imagePath() {
    return `/assets/weather-icons/${this.current().weatherCode}.svg`;
  }

}
