import { Component, inject, Input } from '@angular/core';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { CardComponent } from '../shared/card/card.component';
import { Current } from '../app.model';
import { WeatherServices } from '../app.services';

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
  // Inject the service
  private weatherService = inject(WeatherServices);

  current: Current = this.weatherService.getCurrent();

}
