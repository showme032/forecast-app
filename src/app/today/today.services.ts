import { Injectable } from '@angular/core';

@Injectable( { providedIn: 'root'} )
export class TodayService {

  // UV
  getUvMessage(index: number): string[] {
    if (index <= 2) {
      return ['Low',  'No risk']
    } else if (index <= 6) {
      return ['Medium', 'Wear protection']
    } else if (index <= 10) {
      return ['High', 'Protection required']
    } else return ['Very high', 'Avoid exposure!']
  }

  // Atmospheric Pressure
  getPressureMessage(index: number): string {
    if ( index < 1000 ) {
      return 'Unsettled weather.'
    } else if ( index < 1010 ) {
      return 'Conditions for rain'
    } else if ( index < 1020) {
      return 'Fair conditions'
    } else if ( index < 1030) {
      return 'Sunny, dry conditions'
    }
    return 'Stable sunny conditions'
  }

  // Visibility
  getVisibilityMessage(index: number): string {
    if (index > 18) {
      return 'Exceptional range'
    } if (index > 12) {
      return 'Clear view'
    } if (index > 6) {
      return 'Slight haze'
    } if (index > 3) {
      return 'Haze'
    } if (index > 1) {
      return 'Thin fog'
    } return 'Fog'
  }

  // Air Quality
  getAirColor(index: number): string {
    if (index <= 20) {
      return 'blue';
    } else if (index < 40) {
      return 'green';
    } else if (index < 60) {
      return 'yellow'
    } else if (index < 80) {
      return 'orange';
    } else if (index < 100) {
      return 'red';
    } else return 'purple'
  }

  getAirMessage(index: number): string {
    if (index <= 20) {
      return 'Excellent'
    } else if (index < 40) {
      return 'Good'
    } else if (index < 60) {
      return 'Moderate'
    } else if (index < 80) {
      return 'Poor'
    } else if (index < 100) {
      return 'Very poor'
    } else return 'Extremely poor'


  }
}