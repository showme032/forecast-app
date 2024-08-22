import { Component, inject, Input } from '@angular/core';
import { Extended } from '../app.model';
import { WeatherServices } from '../app.services';
import { DatePipe, DecimalPipe, NgForOf } from '@angular/common';


@Component({
  selector: 'app-extended',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    DecimalPipe,
  ],
  templateUrl: './extended.component.html',
  styleUrl: './extended.component.css'
})
export class ExtendedComponent {
  // Inject the service
  private weatherService = inject(WeatherServices);

  extended: Extended[] = this.weatherService.getExtended();

  constructor( ) {
    console.log(this.weatherService.getExtended())
  }
}
