import { Component, inject, Input } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';
import { type Today} from '../app.model';
import { DatePipe } from '@angular/common';
import { WeatherServices } from '../app.services';

@Component({
  selector: 'app-today',
  standalone: true,
  imports: [
    CardComponent,
    DatePipe,
  ],
  templateUrl: './today.component.html',
  styleUrl: './today.component.css'
})
export class TodayComponent {
  // Inject the service
  private weatherService = inject(WeatherServices);

  today: Today = this.weatherService.getToday()

  uvGraphical(uvIndex: number): number {
    return (uvIndex / 10) * 100;
  }
}
