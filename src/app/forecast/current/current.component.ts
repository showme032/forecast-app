import { Component, computed, inject, input} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Location } from '../../app.model';
import { CurrentService } from './current.service';

@Component({
  selector: 'app-current',
  standalone: true,
  imports: [
    DecimalPipe,
  ],
  providers: [CurrentService],
  templateUrl: './current.component.html',
  styleUrl: './current.component.css',
})
export class CurrentComponent {
  private forecastService = inject(CurrentService);
  weatherData = input.required<{} | undefined>();

  current = computed(() => this.forecastService.getCurrent(this.weatherData()));
  location = input.required<Location>();

  get conditions() {
    return this.forecastService.getConditions(this.current().weatherCode);
  }

  get imagePath() {
    return `/assets/weather-icons/${this.current().weatherCode}.svg`;
  }

}
