import { Component, Input } from '@angular/core';
import { Extended } from '../app.model';
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
  @Input() extended!: Extended[];
}
