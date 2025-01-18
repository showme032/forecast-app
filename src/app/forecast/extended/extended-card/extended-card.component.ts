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
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-extended-card',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
  ],
  templateUrl: './extended-card.component.html',
  styleUrl: './extended-card.component.css',
  animations: [
    trigger('expandShrinkElement', [
      transition(':enter', [
        style({ height: 0}),
        animate('175ms cubic-bezier(0.2, 0, 0.33, 1)', style({ height: '*'})),
      ]),
      transition(':leave', [
        style({ height: '*'}),
        animate('125ms cubic-bezier(1, 0.33, 0, 0.2)', style({ height: 0})),
      ]),
    ]),
  ]
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

  // Expand card to show more forecast information
  onToggleView() {
    this.expandedView.update((currentValue) => !currentValue)
  }

  // Update component specific graph parameters on input change
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
