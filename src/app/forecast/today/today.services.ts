import { Injectable } from '@angular/core';
import type { Today } from '../../app.model';

@Injectable()
export class TodayService {
  private hour = new Date().getHours();

  // Return today's weather data
  getToday(data: any): Today {
    return {
      event: data.current.is_day === 1 ? 'SUNSET' : 'SUNRISE',
      eventTime: data.current.is_day === 1 ? data.daily.sunset[0] : data.daily.sunrise[0],
      eventAfter: data.current.is_day === 1 ? ['Sunrise:', data.daily.sunrise[0]] : ['Sunset:', data.daily.sunset[0]],
      uv: data.hourly.uv_index[this.hour],
      visibility: Math.round(data.hourly.visibility[this.hour] / 3281),
      pressure: data.current.pressure_msl,
      windSpeed: data.current.wind_speed_10m,
      windDirection: data.current.wind_direction_10m,
      humidity: data.current.relative_humidity_2m,
      dewPoint: data.hourly.dew_point_2m[this.hour],
      subjectiveTemp: data.current.apparent_temperature,
      current: data.hourly.temperature_2m[this.hour],
    };
  }

  // UV
  getUvMessage(index: number): string[] {
    if (index <= 2) {
      return ['Low', 'No risk'];
    } else if (index <= 6) {
      return ['Medium', 'Wear protection'];
    } else if (index <= 10) {
      return ['High', 'Protection required'];
    } else return ['Very high', 'Avoid exposure!'];
  }

  // Atmospheric Pressure
  getPressureMessage(index: number): string {
    if (index < 1000) {
      return 'Unsettled weather';
    } else if (index < 1010) {
      return 'It might rain';
    } else if (index < 1020) {
      return 'Fair conditions';
    } else if (index < 1030) {
      return 'Sunny, dry weather';
    }
    return 'Stable weather';
  }

  // Visibility
  getVisibilityMessage(index: number): string {
    if (index > 18) {
      return 'Exceptional range';
    }
    if (index > 12) {
      return 'Clear view';
    }
    if (index > 6) {
      return 'Slight haze';
    }
    if (index > 3) {
      return 'Haze';
    }
    if (index > 1) {
      return 'Thin fog';
    }
    return 'Fog';
  }

  // Humidity
  getHumidityMessage(index: number): string {
    if (index > 24) {
      return 'Feels oppressive';
    } else if (index > 21) {
      return 'Feels very humid';
    } else if (index > 18) {
      return 'Feels humid';
    } else if (index > 15.5) {
      return 'Feels slightly humid';
    } else if (index > 12.5) {
      return 'Feels comfortable';
    } else if (index > 9) {
      return 'Feels dry';
    }
    return 'Feels very dry';
  }

  // Subj Feel
  getSubjectiveMessage(current:number, feel:number): string {
    if (Math.abs((current - feel)) < 2) {
      return 'Feels similar';
    } else if (current > feel) {
      return 'Feels cooler';
    }
    return 'Feels warmer';
  }

  // Air Quality
  getAirColor(index: number ): string {
    if (index <= 20) {
      return 'blue';
    } else if (index < 40) {
      return 'green';
    } else if (index < 60) {
      return 'yellow';
    } else if (index < 80) {
      return 'orange';
    } else if (index < 100) {
      return 'red';
    } else return 'purple';
  }

  getAirMessage(index: number): string {
    if (index <= 20) {
      return 'Excellent';
    } else if (index < 40) {
      return 'Good';
    } else if (index < 60) {
      return 'Moderate';
    } else if (index < 80) {
      return 'Poor';
    } else if (index < 100) {
      return 'Very poor';
    } else return 'Extremely poor';
  }
}