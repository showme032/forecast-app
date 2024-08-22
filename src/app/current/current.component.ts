import { Component, Input } from '@angular/core';
import { DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { CardComponent } from '../shared/card/card.component';
import { Current } from '../app.model';

@Component({
  selector: 'app-current',
  standalone: true,
  imports: [
    TitleCasePipe,
    CardComponent,
    DecimalPipe,
    DatePipe,
  ],
  templateUrl: './current.component.html',
  styleUrl: './current.component.css'
})
export class CurrentComponent {
  @Input() current!: Current;
  @Input() location!: string | undefined;

  currentDate = new Date();

}
