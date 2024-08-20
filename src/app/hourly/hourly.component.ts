import { Component, Input } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-hourly',
  standalone: true,
  imports: [
    CardComponent,
    DatePipe,
    DecimalPipe,
  ],
  templateUrl: './hourly.component.html',
  styleUrl: './hourly.component.css'
})
export class HourlyComponent {
  @Input() hourly!: any;

}
