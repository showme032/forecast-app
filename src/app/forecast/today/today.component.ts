import {
  Component,
  computed,
  inject,
  input, OnChanges,
  SimpleChanges,
} from '@angular/core';
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
  providers: [TodayService],
  templateUrl: './today.component.html',
  styleUrl: './today.component.css',
})
export class TodayComponent implements OnChanges {
  private todayService = inject(TodayService);

  weatherData = input.required<{} | undefined>();
  airQualityIndex = input.required<number>();
  todayData = computed(() => this.todayService.getToday(this.weatherData()));

  uvMessage?: string[];
  pressureMessage?: string
  humidityMessage?: string
  subjectiveMessage?: string
  visibilityMessage?: string


  ngOnChanges(changes: SimpleChanges) {
    if (changes['weatherData']) {
      this.uvMessage = this.todayService.getUvMessage(this.todayData().uv);
      this.pressureMessage = this.todayService.getPressureMessage(this.todayData().pressure);
      this.humidityMessage = `Dew point: ${this.todayData().dewPoint}°`;
      this.subjectiveMessage = this.todayService.getSubjectiveMessage(this.todayData().current, this.todayData().subjectiveTemp);
      this.visibilityMessage = this.todayService.getVisibilityMessage(this.todayData().visibility);
    }
  }

  // Change class to "slide" the card
  onCardClick(card: HTMLElement) {
    if (card.classList.contains('clicked')) {
      card.classList.remove('clicked');
    } else {
      card.classList.add('clicked');
    }
  }

  linearGraphic(val: number, min: number, max: number): number {
    return (val - min) / (max - min) * 100;
  }

  // Air Quality Index
  get airColor() {
    return `/assets/decorations/air-pollution.svg#${this.todayService.getAirColor(this.airQualityIndex())}`;
  }

  get airMessage() {
    return this.todayService.getAirMessage(this.airQualityIndex());
  }
}
