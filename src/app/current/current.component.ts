import { Component, inject, Input } from '@angular/core';
import { DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { CardComponent } from '../today/card/card.component';
import { Current } from '../app.model';
import { WeatherServices } from '../services/weather.services';

@Component({
  selector: 'app-current',
  standalone: true,
  imports: [
    TitleCasePipe,
    CardComponent,
    DecimalPipe,
    DatePipe,
  ],
  templateUrl: './current.component.html',
  styleUrl: './current.component.css',
})
export class CurrentComponent {
  // Inject the service
  private weatherService = inject(WeatherServices);
  @Input() current!: Current;
  @Input() location!: string | undefined;

  get conditions() {
    return this.weatherService.getConditions(this.current.weatherCode);
  }

  get imagePath() {
    return `/assets/weather-icons/${this.current.weatherCode}.svg`;
  }

  // currentDate = new Date();
}
