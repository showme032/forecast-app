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
        animate('125ms ease-in-out', style({ scale: 1 })),
      ]),
      transition(':leave', [
        style({ scale: 1 }),
        animate('125ms ease-in-out', style({ scale: 0 })),
      ]),
    ]),
  ],
})
export class SearchComponent {
  private searchService = inject(SearchServices);

  locationEmitter = output<LocationObj | null>();
  locationObj: LocationObj | undefined;
  searchQuery: string | undefined;
  errorMessage: undefined | string;
  loading = false;

  // Get coordinates based on search query
  onSubmit() {
    if (this.searchQuery) {
      this.loading = true;
      this.searchService.getLocationCoordinates(this.searchQuery).subscribe(res => {
        if (res.response.features.length != 0) {
          this.locationObj = {
            lat: res.response.features[0].geometry.coordinates[1],
            lng: res.response.features[0].geometry.coordinates[0],
            name: res.response.features[0].properties.name,
            country: res.response.features[0].properties.country_code,
          };
          console.log(this.locationObj);

          this.locationEmitter.emit(this.locationObj);
          this.searchQuery = undefined;
          this.errorMessage = undefined;
        } else {
          this.locationEmitter.emit(null);
          this.searchQuery = undefined;
          this.errorMessage = 'No Location Found';
        }

        this.loading = false;
      });
    }

  }

  // Get location data based on HTML geoLocation API
  onGeoLocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => geoSuccess(position),
        error => geoError(error));
    } else {
      this.errorMessage = 'Geolocation not supported';
    }

    // Success callback
    const geoSuccess = (position: GeolocationPosition) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      this.searchService.getCoordinatesLocation(lat, lng).subscribe(res => {
        if (res.response.features[0]) {
          this.locationObj = {
            lat,
            lng,
            name: res.response.features[0].properties.locality,
            country: res.response.features[0].properties.country_a,
          };

          this.locationEmitter.emit(this.locationObj);
          this.errorMessage = undefined;
        } else {
          this.errorMessage = ('Can`t resolve your location');
        }

      });
    };

    // Error callback
    const geoError = (error: any) => {
      this.errorMessage = error.message;
    };

  }

}