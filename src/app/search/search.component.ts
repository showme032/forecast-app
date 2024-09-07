import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchServices } from './search.services';
import { LocationObj } from '../app.model';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  animations: [
    trigger('appear', [
      transition(':enter', [
        style({ scale: 0 }),
        animate('125ms ease-in-out', style({ scale: 1 }))
      ]),
      transition(':leave', [
        style({ scale: 1 }),
        animate('125ms ease-in-out', style({ scale: 0 }))
      ])
    ])
  ]
})
export class SearchComponent {
  private searchService = inject(SearchServices);
  location = output<LocationObj | null>()

  searchQuery = '';
  errorMessage: undefined | string;

  onSubmit(input: HTMLInputElement) {
    this.searchService.getLocationCoordinates(this.searchQuery).subscribe((res) => {
      if (res.results) {
        const locationObj: LocationObj = {
          lat: res.results[0].latitude,
          lng: res.results[0].longitude,
          name: res.results[0].name,
          country: res.results[0].country_code,

        };

        input.value = '';
        this.errorMessage = undefined;
        this.location.emit(locationObj);

      } else {
        this.location.emit(null);
        input.value= '';
        this.errorMessage = 'No Location Found';
        console.log(`No location for '${this.searchQuery}' query found`);

      }

    });
  }
}