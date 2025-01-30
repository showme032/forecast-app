import {
  Component,
  computed, HostBinding,
  input,
  OnChanges, signal,
  Signal,
  SimpleChanges,
} from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Extended } from '../../../app.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '2.75rem',
      })),
      state('expanded', style({
        height: '*',
        transition: ''
      })),
      transition('collapsed <=> expanded', [
        animate('0.2s cubic-bezier(0.2, 0, 0.4, 1)')
      ])
    ])
  ],
  // host: {'[class]':'expandedView() ? "expanded" : "collapsed"'},
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
  graphCurrent?: Signal<number | undefined>;

  expandedView = signal(false);

  // @HostBinding('class.expanded') get expandedClass() {
  //   return this.expandedView();
  // }
  //
  // @HostBinding('class.collapsed') get collapsedClass() {
  //   return !this.expandedView();
  // }

  @HostBinding('@expandCollapse') get expandCollapseState() {
    return this.expandedView() ? 'expanded' : 'collapsed';
  }

  // Expand card to show more forecast information
  onToggleView() {
    this.expandedView.update((currentValue) => !currentValue)
  }

  // Update component specific graph parameters on input change
  ngOnChanges(changes: SimpleChanges) {
    // console.log(this.dayData())
    this.graphFillWidth = computed(() => {
      return ((this.dayData().maxTemperature - this.dayData().minTemperature) / this.extendedRange()) * 100;
    });
    this.graphFillOffset = computed(() => {
      return ((this.dayData().minTemperature - this.extendedMinTemp()) / this.extendedRange() * 100);
    });
    // if (this.dayData().current != undefined) {
    //   this.graphCurrent = computed(() => {
    //     return this.extendedRange() / this.dayData().current;
    //   });
    // }
  }

  // Get weather icon path
  imagePath(weatherCode: number) {
    return `/assets/weather-icons/${weatherCode}.svg`;
  }
}
