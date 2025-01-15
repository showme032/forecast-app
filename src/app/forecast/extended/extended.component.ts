import {
  Component,
  computed,
  inject,
  input, OnChanges,
  Signal,
  SimpleChanges,
} from '@angular/core';
import { ExtendedCardComponent } from './extended-card/extended-card.component';
import { ExtendedService } from './extended.service';


@Component({
  selector: 'app-extended',
  standalone: true,
  imports: [
    ExtendedCardComponent,
  ],
  providers: [ExtendedService],
  templateUrl: './extended.component.html',
  styleUrl: './extended.component.css',
})
export class ExtendedComponent implements OnChanges {
  private extendedService = inject(ExtendedService);
  weatherData = input.required<{} | undefined>();

  extendedData = computed(() => this.extendedService.getExtended(this.weatherData()));
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
