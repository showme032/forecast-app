import { Component, inject, Input } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';
import { Current, type Today } from '../app.model';
import { DatePipe } from '@angular/common';
import { WeatherServices } from '../services/weather.services';

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
  @Input() today!: Today;
  @Input() airQualityIndex!: any;

  uvGraphical(uvIndex: number): number {
    return (uvIndex / 10) * 100;
  }
}
