import { Component, Input } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';

@Component({
  selector: 'app-today',
  standalone: true,
  imports: [
    CardComponent,
  ],
  templateUrl: './today.component.html',
  styleUrl: './today.component.css'
})
export class TodayComponent {
  @Input() today!: {};

}
