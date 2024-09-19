import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

  locationEmitter = output<LocationObj | null>();
  errorMessage = signal<string | undefined>(undefined);
  searchQuery?: string | undefined;

  // Get coordinates based on search query
  onSubmit() {
    if (this.searchQuery) {
      this.searchService.getLocationCoordinates(this.searchQuery).subscribe(res => {
        if (res.response.features.length != 0) {
          this.locationEmitter.emit({
            lat: res.response.features[0].geometry.coordinates[1],
            lng: res.response.features[0].geometry.coordinates[0],
            name: res.response.features[0].properties.name,
            country: res.response.features[0].properties.country_code,
          });
          this.errorMessage.set(undefined);

        } else {
          this.locationEmitter.emit(null);
          this.errorMessage.set('No Location Found');
        }

        this.searchQuery = undefined;
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
      this.errorMessage.set('Geolocation not supported');
    }

    // Success callback
    const geoSuccess = (position: GeolocationPosition) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      this.searchService.getCoordinatesLocation(lat, lng).subscribe(res => {
        if (res.response.features[0]) {
          this.locationEmitter.emit({
            lat,
            lng,
            name: res.response.features[0].properties.locality,
            country: res.response.features[0].properties.country_a,
          });
          this.errorMessage.set(undefined);
        } else {
          this.errorMessage.set('Can`t resolve your location');
        }

      });
    };

    // Error callback
    const geoError = (error: any) => {
      this.errorMessage = error.message;
    };

  }

}