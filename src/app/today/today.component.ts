import { Component, inject, Input } from '@angular/core';
import { CardComponent } from './card/card.component';
import { type Today } from '../app.model';
import { DatePipe, DecimalPipe, NgStyle } from '@angular/common';
import { TodayService } from './today.services';

@Component({
  selector: 'app-today',
  standalone: true,
  imports: [
    CardComponent,
    DatePipe,
    DecimalPipe,
    NgStyle,
  ],
  templateUrl: './today.component.html',
  styleUrl: './today.component.css',
})
export class TodayComponent {
  @Input() today!: Today;
  @Input() airQualityIndex!: any;

  private todayService = inject(TodayService);

  linearGraphic(val: number, min: number, max: number): number {
    return (val - min) / (max - min) * 100;
  }

  // SUN


  // UV
  get uvMessage(): string[] {
    return this.todayService.getUvMessage(this.today.uv);
  }

  // AIR PRESSURE
  get pressureMessage(): string {
    return this.todayService.getPressureMessage(this.today.pressure);
  }

  // WIND

  // HUMIDITY
  get humidityMessage(): string {
    return this.todayService.getHumidityMessage(this.today.dewPoint);
  }

  // FEEL
  get subjectiveMessage(): string {
    return this.todayService.getSubjectiveMessage(this.today.current, this.today.subjectiveTemp);
  }

  // VISIBILITY
  get visibilityMessage(): string {
    return this.todayService.getVisibilityMessage(this.today.visibility);
  }

  // AQI
  get airColor() {
    return `/assets/decorations/air-pollution.svg#${this.todayService.getAirColor(this.airQualityIndex)}`;
  }

  get airMessage() {
    return this.todayService.getAirMessage(this.airQualityIndex);
  }
}
