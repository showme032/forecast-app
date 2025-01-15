import {
  Component,
  computed,
  inject,
  input, OnChanges,
  OnInit,
  Signal,
  SimpleChanges,
} from '@angular/core';
import { Extended } from '../../app.model';
import { ExtendedCardComponent } from './extended-card/extended-card.component';
import { WeatherServices } from '../../weather.services';


@Component({
  selector: 'app-extended',
  standalone: true,
  imports: [
    ExtendedCardComponent,
  ],
  templateUrl: './extended.component.html',
  styleUrl: './extended.component.css',
})
export class ExtendedComponent implements OnChanges {
  private weatherService = inject(WeatherServices);
  weatherData = input.required<{} | undefined>();

  extendedData = computed(() => this.weatherService.getExtended(this.weatherData()));
  extendedMinTemp!: Signal<number>;
  extendedMaxTemp!: Signal<number>;
  extendedRange!: Signal<number>;

  ngOnChanges(changes: SimpleChanges): void {
    // Get the lowest minimum for graph range
    this.extendedMinTemp = computed(() => this.extendedData()
      .reduce((min, current) => current.minTemperature > min ? min : current.minTemperature,
        Infinity));

    // and maximum
    this.extendedMaxTemp = computed(() => this.extendedData()
      .reduce((max, current) => current.maxTemperature > max ? current.maxTemperature : max,
        -Infinity));

    // Get temperature range for graph
    this.extendedRange = computed(() => this.extendedMaxTemp() - this.extendedMinTemp());
  }

}
