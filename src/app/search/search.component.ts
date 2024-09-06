import { AfterContentChecked, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherServices } from '../weather.services';
import { SearchServices } from './search.services';
import { LocationObj } from '../app.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  private searchService = inject(SearchServices);
  @Output() location = new EventEmitter<LocationObj>();
  searchQuery = '';
  errorMessage: undefined | string;

  onSubmit(form: HTMLFormElement) {
    this.searchService.getLocationCoordinates(this.searchQuery).subscribe(
      res => {
        if (res.results) {
          const locationObj: LocationObj = {
            lat: res.results[0].latitude,
            lng: res.results[0].longitude,
            name: res.results[0].name,
            country: res.results[0].country_code,
          }

          this.errorMessage = undefined;
          this.location.emit(locationObj)
        } else {
          this.errorMessage = 'No location found';
          console.log(`No location for '${this.searchQuery}' query found`);
        }
      },
    );
  }
}