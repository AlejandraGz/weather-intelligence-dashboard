import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Forecast, ForecastItem } from '../../models/weather.model';
import { interval, map, Observable, shareReplay, startWith } from 'rxjs';
import { WeatherService } from '../../../../core/services/weather';
import { ForecastStateService } from '../../../../core/services/forecast-state';
@Component({
  selector: 'app-daily-forecast',
  imports: [CommonModule],
  templateUrl: './daily-forecast.html',
  styleUrls: [
    './daily-forecast.css',
    '../../styles/weather-card.css'
  ],
  standalone: true
})
export class DailyForecast {

  activeDate: string = '';
  constructor(private weatherService: WeatherService, private forecastStateService: ForecastStateService) {
    this.forecast$ = this.weatherService.getDailyForecast('Armenia,CO').pipe(shareReplay(1));
  }
  today$ = interval(1000).pipe( //trae la hora actualizada cada 1s
    startWith(0),
    map(() => new Date())
  );
  forecast$: Observable<Forecast>;

  showThreeHourForescatPerDay(f: ForecastItem) {
    const date = f.dt_txt.split(' ')[0];
    this.forecastStateService.setSelectedDate(date);
    this.activeDate = date;
  }

}
