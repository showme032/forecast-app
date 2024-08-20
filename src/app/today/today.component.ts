import { Component, Input } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';
import { type Today} from '../app.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-today',
  standalone: true,
  imports: [
    CardComponent,
    DatePipe,
  ],
  templateUrl: './today.component.html',
  styleUrl: './today.component.css'
})
export class TodayComponent {
  @Input({required: true}) today!: Today;

  uvGraphical(uvIndex: number): number {
    return (uvIndex / 10) * 100;
  }


}
