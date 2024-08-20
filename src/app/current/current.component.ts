import { Component, Input } from '@angular/core';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { CardComponent } from '../shared/card/card.component';
import { Current } from '../app.model';

@Component({
  selector: 'app-current',
  standalone: true,
  imports: [
    TitleCasePipe,
    CardComponent,
    DecimalPipe,
  ],
  templateUrl: './current.component.html',
  styleUrl: './current.component.css'
})
export class CurrentComponent {
  @Input({required: true}) current!: Current;

}
