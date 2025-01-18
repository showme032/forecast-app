import { Component, signal } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { LocationData } from './app.model';
import { SearchComponent } from './search/search.component';
import { ForecastComponent } from './forecast/forecast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SearchComponent,
    ForecastComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('animateElement', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('125ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('125ms ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
    trigger('load', [
      transition(':leave', [
        style({ opacity: 0 }),
        animate('0.075s cubic-bezier(0.2, 0, 0.4, 1)', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AppComponent {
  location?: LocationData | undefined;
  spinner = signal<true | false>(false);

  // Get data if queried location found otherwise clear data
  onLocationFound(foundLocation: LocationData | null) {
    if (foundLocation) {
      this.location = foundLocation;
    } else {
      // Remove content
      this.location = undefined;
    }
    this.spinner.set(false);
  }

  // Loading Spinner
  onLoading() {
    this.location = undefined;
    this.spinner.set(true);
  };
}
