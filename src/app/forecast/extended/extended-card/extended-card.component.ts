import {
  Component,
  computed,
  input,
  OnChanges, signal,
  Signal,
  SimpleChanges,
} from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Extended } from '../../../app.model';

@Component({
  selector: 'app-extended-card',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
  ],
  templateUrl: './extended-card.component.html',
  styleUrl: './extended-card.component.css',
})
export class ExtendedCardComponent implements OnChanges {
  dayData = input.required<Extended>()

  // Universal graph parameters
  extendedMinTemp = input.required<number>();
  extendedMaxTemp = input.required<number>();
  extendedRange = input.required<number>();

  // Component specific graph parameters,
  graphFillWidth!: Signal<number>;
  graphFillOffset!: Signal<number>;

  expandedView = signal(false);

  onToggleView() {
    this.expandedView.update((currentValue) => !currentValue)
  }

  // Component specific graph parameters, update on input change
  ngOnChanges(changes: SimpleChanges) {
    this.graphFillWidth = computed(() => {
      return ((this.dayData().maxTemperature - this.dayData().minTemperature) / this.extendedRange()) * 100;
    });
    this.graphFillOffset = computed(() => {
      return ((this.dayData().minTemperature - this.extendedMinTemp()) / this.extendedRange() * 100);
    });
  }

  // Get weather icon path
  imagePath(weatherCode: number) {
    return `/assets/weather-icons/${weatherCode}.svg`;
  }
}
