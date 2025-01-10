import { Component, computed, input, OnInit, Signal } from '@angular/core';
import { Extended } from '../app.model';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ExtendedCardComponent } from './extended-card/extended-card.component';


@Component({
  selector: 'app-extended',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
    ExtendedCardComponent,
  ],
  templateUrl: './extended.component.html',
  styleUrl: './extended.component.css',
})
export class ExtendedComponent implements OnInit {
  extended = input.required<Extended[]>();
  extendedMinTemp!: Signal<number>;
  extendedMaxTemp!: Signal<number>;
  extendedRange!: Signal<number>;

  ngOnInit() {
    console.log(this.extended());

    // Get the lowest minimum for graph range
    this.extendedMinTemp = computed(() => this.extended()
      .reduce((min, current) => current.minTemperature > min ? min : current.minTemperature,
        Infinity));

    // and maximum
    this.extendedMaxTemp = computed(() => this.extended()
      .reduce((max, current) => current.maxTemperature > max ? current.maxTemperature : max,
        -Infinity));

    // Get temperature range for graph
    this.extendedRange = computed(() => this.extendedMaxTemp() - this.extendedMinTemp());

  }

}
