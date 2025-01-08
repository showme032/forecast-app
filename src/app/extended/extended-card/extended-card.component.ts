import { Component, input } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-extended-card',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
  ],
  templateUrl: './extended-card.component.html',
  styleUrl: './extended-card.component.css'
})
export class ExtendedCardComponent {
  dayData = input.required<any>()
  extendedMinTemp = input.required()
  extendedRange = input.required()


  // Set glow color depending on air quality index
  imagePath(code: number) {
    return `/assets/weather-icons/${code}.svg`;
  }
}
