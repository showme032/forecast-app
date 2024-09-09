import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SearchServices {
  constructor(private http: HttpClient) {
  }

  // Get location coordinates based on query
  getLocationCoordinates(location: string): Observable<any> {
    const baseUrl = 'https://api.geocodify.com/v2/geocode';
    const params = {
      api_key: environment.geoApiKey,
      q: location,
    };

    return this.http.get<any>(baseUrl, { params });
  }

  // Get location data based on coordinates
  getCoordinatesLocation(lat: number, lng: number ): Observable<any> {
    const baseUrl = 'https://api.geocodify.com/v2/reverse';
    const params = {
      api_key: environment.geoApiKey,
      lat: lat,
      lng: lng
    }

    return this.http.get<any>(baseUrl, { params });
  }

}