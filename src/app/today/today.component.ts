import { Component, inject, Input } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';
import { type Today } from '../app.model';
import { DatePipe } from '@angular/common';

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

  // SUN

  // UV

  // AIR PRESSURE

  // WIND

  // FEEL

  // VISIBILITY

  // AQI

  linearGraphic(index: number, range: number): number {
    return (index / range) * 100;
  }
}
