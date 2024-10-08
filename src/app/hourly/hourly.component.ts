import { Component, input } from '@angular/core';
import { CardComponent } from '../today/card/card.component';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Hourly } from '../app.model';

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
  hourly = input.required<Hourly[]>();
}
