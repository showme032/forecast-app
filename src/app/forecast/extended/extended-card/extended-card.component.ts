import { Component, computed, Input, input, Signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Extended } from '../../../app.model';

@Component({
  selector: 'app-extended-card',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
  ],
  templateUrl: './extended-card.component.html',
  styleUrl: './extended-card.component.css',
})
export class ExtendedCardComponent {
  dayData = input.required<Extended>()
  @Input() extendedMinTemp!: Signal<number>;
  @Input() extendedRange!: Signal<number>;
  temperatureGraphWidth: Signal<number | undefined>;
  temperatureGraphOffset: Signal<number | undefined>;

  constructor() {
    this.temperatureGraphWidth = computed(() => {
      return (this.dayData().maxTemperature - this.dayData().minTemperature) / this.extendedRange() * 100;
    });

    this.temperatureGraphOffset = computed(() => {
      return (this.dayData().minTemperature - this.extendedMinTemp() / this.extendedRange() * 100);
    });
  }

  // Get weather icon path
  imagePath(weatherCode: number) {
    return `/assets/weather-icons/${weatherCode}.svg`;
  }
}
