import { Component, computed, inject, input } from '@angular/core';
import { CardComponent } from '../today/card/card.component';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Hourly } from '../../app.model';
import { WeatherServices } from '../../weather.services';

@Component({
  selector: 'app-hourly',
  standalone: true,
  imports: [
    CardComponent,
    DatePipe,
    DecimalPipe,
  ],
  templateUrl: './hourly.component.html',
  styleUrl: './hourly.component.css'
})
export class HourlyComponent {
  private weatherService = inject(WeatherServices);

  weatherData = input.required<{} | undefined>();
  hourly = computed(() => this.weatherService.getHourly(this.weatherData()));
}
