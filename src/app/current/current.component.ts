import { Component, Input } from '@angular/core';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { CardComponent } from '../shared/card/card.component';

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
  @Input({required: true}) current!: {
    location: string,
    temperature: number,
    condition: string,
    min: number,
    max: number,

  };

}
