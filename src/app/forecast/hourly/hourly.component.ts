import { Component, computed, inject, input } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';
import { DatePipe, DecimalPipe } from '@angular/common';
import { HourlyService } from './hourly.service';

@Component({
  selector: 'app-hourly',
  standalone: true,
  imports: [
    CardComponent,
    DatePipe,
    DecimalPipe,
  ],
  providers: [HourlyService],
  templateUrl: './hourly.component.html',
  styleUrl: './hourly.component.css'
})
export class HourlyComponent {
  private hourlyService = inject(HourlyService);

  weatherData = input.required<{} | undefined>();
  hourly = computed(() => this.hourlyService.getHourly(this.weatherData()));
}
