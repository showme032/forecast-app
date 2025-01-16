import {
  Component,
  computed,
  inject,
  input, OnChanges, OnInit,
  Signal,
  SimpleChanges,
} from '@angular/core';
import { ExtendedCardComponent } from './extended-card/extended-card.component';
import { ExtendedService } from './extended.service';
import { Extended } from '../../app.model';


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
export class ExtendedComponent implements OnChanges, OnInit {
  private extendedService = inject(ExtendedService);
  weatherData = input.required<{} | undefined>();

  extendedData!: Signal<Extended[]>;
  extendedMinTemp!: Signal<number>;
  extendedMaxTemp!: Signal<number>;
  extendedRange!: Signal<number>;

  ngOnInit() {
    this.extendedData = computed(() => this.extendedService.getExtended(this.weatherData()));
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Get the lowest temperature for graphs
    this.extendedMinTemp = computed(() => this.extendedData()
      .reduce((min, current) => current.minTemperature > min ? min : current.minTemperature,
        Infinity));

    // maximum
    this.extendedMaxTemp = computed(() => this.extendedData()
      .reduce((max, current) => current.maxTemperature > max ? current.maxTemperature : max,
        -Infinity));

    // and range
    this.extendedRange = computed(() => this.extendedMaxTemp() - this.extendedMinTemp());

  }

}
