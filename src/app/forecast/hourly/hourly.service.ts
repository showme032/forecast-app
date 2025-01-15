import { Injectable } from '@angular/core';
import type { Hourly } from '../../app.model';

@Injectable()
export class HourlyService {
  hour = new Date().getHours();

  constructor() {
  }

  getHourly(data: any): Hourly[] {
    const hourly: Hourly[] = [];
    for (let i = this.hour; i < this.hour + 24; i++) {
      hourly.push({
        time: data.hourly.time[i],
        temperature: data.hourly.temperature_2m[i],

      });
    }

    return hourly;
  }
}
