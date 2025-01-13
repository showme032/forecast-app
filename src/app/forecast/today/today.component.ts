import { Component, inject, input } from '@angular/core';
// import { CardComponent } from './card/card.component';
import { type Today } from '../../app.model';
import { DatePipe, DecimalPipe, NgStyle } from '@angular/common';
import { TodayService } from './today.services';

@Component({
  selector: 'app-today',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
    NgStyle,
  ],
  templateUrl: './today.component.html',
  styleUrl: './today.component.css',
})
export class TodayComponent {
  private todayService = inject(TodayService);
  today = input.required<Today>();
  airQualityIndex = input.required<number>();

  onCardClick(card: HTMLElement) {
    if (card.classList.contains('clicked')) {
      // Remove class or attribute
      card.classList.remove('clicked');
    } else {
      // Add class or attribute
      card.classList.add('clicked');
    }
  }

  linearGraphic(val: number, min: number, max: number): number {
    return (val - min) / (max - min) * 100;
  }

  // UV
  get uvMessage(): string[] {
    return this.todayService.getUvMessage(this.today().uv);
  }

  // Air Pressure
  get pressureMessage(): string {
    return this.todayService.getPressureMessage(this.today().pressure);
  }

  // Wind

  // Humidity
  get humidityMessage(): string {
    return this.todayService.getHumidityMessage(this.today().dewPoint);
  }

  // Subjective Feel
  get subjectiveMessage(): string {
    return this.todayService.getSubjectiveMessage(this.today().current, this.today().subjectiveTemp);
  }

  // Visibility
  get visibilityMessage(): string {
    return this.todayService.getVisibilityMessage(this.today().visibility);
  }

  // Air Quality Index
  get airColor() {
    return `/assets/decorations/air-pollution.svg#${this.todayService.getAirColor(this.airQualityIndex())}`;
  }

  get airMessage() {
    return this.todayService.getAirMessage(this.airQualityIndex());
  }
}
