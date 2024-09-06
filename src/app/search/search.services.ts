import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SearchServices {
  constructor(private http: HttpClient) {
  }

  // Get coordinates for queried location via geocoding API
  getLocationCoordinates(location: string): Observable<any> {
    const baseUrl = 'https://geocoding-api.open-meteo.com/v1/search';
    const params = {
      name: location,
      count: '1',
      language: 'en',
      format: 'json',
    };

    return this.http.get<any>(baseUrl, { params });
  }

}