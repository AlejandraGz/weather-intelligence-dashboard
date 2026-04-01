import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastItem } from '../../models/weather.model';
import { interval, map, Observable, shareReplay, startWith } from 'rxjs';
import { WeatherService } from '../../../../core/services/weather';


@Component({
  selector: 'app-three-hour-forecast',
  imports: [CommonModule],
  templateUrl: './three-hour-forecast.html',
  styleUrls: [
    './three-hour-forecast.css',
    '../../styles/weather-card.css'
  ]
})
export class ThreeHourForecast {
  constructor(private weatherService: WeatherService) {
    this.forecast$ = this.weatherService
      .getDailyForecast('Armenia,CO')
      .pipe(
        map(f => this.groupForecastByDay(f.list)), // 👈 AQUÍ está la clave
        shareReplay(1)
      );
  }
  today$ = interval(1000).pipe( //trae la hora actualizada cada 1s
    startWith(0),
    map(() => new Date())
  );
  forecast$: Observable<Array<{ date: string; items: ForecastItem[] }>>;

  groupForecastByDay(list: ForecastItem[]) {
    const grouped: { [key: string]: any[] } = {};

    list.forEach(l => {
      const date = l.dt_txt.split(' ')[0];

      if (!grouped[date]) {
        grouped[date] = [];
      }

      grouped[date].push(l);
    });
    console.log(grouped)

    return Object.entries(grouped).map(([date, items]) => ({
      date,
      items
    }));
  }
}
