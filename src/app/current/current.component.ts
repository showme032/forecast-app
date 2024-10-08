import { Component, inject, input } from '@angular/core';
import {
  DatePipe,
  DecimalPipe,
  NgOptimizedImage, NgStyle,
  TitleCasePipe,
} from '@angular/common';
import { CardComponent } from '../today/card/card.component';
import { Current, LocationObj } from '../app.model';
import { WeatherServices } from '../weather.services';

@Component({
  selector: 'app-current',
  standalone: true,
  imports: [
    TitleCasePipe,
    CardComponent,
    DecimalPipe,
    DatePipe,
    NgOptimizedImage,
    NgStyle,
  ],
  templateUrl: './current.component.html',
  styleUrl: './current.component.css',
})
export class CurrentComponent {
  private weatherService = inject(WeatherServices);

  current = input.required<Current>();
  location = input.required<LocationObj>();


  get conditions() {
    return this.weatherService.getConditions(this.current().weatherCode);
  }

  get imagePath() {
    return `/assets/weather-icons/${this.current().weatherCode}.svg`;
  }

}
