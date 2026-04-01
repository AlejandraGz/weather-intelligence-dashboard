import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Forecast } from '../../models/weather.model';
import { interval, map, Observable, shareReplay, startWith } from 'rxjs';
import { WeatherService } from '../../../../core/services/weather';

@Component({
  selector: 'app-weekly-forecast',
  imports: [CommonModule],
  templateUrl: './weekly-forecast.html',
  styleUrls: [
    './weekly-forecast.css',
    '../../styles/weather-card.css'
  ]
})
export class WeeklyForecast {

  constructor(private weatherService: WeatherService) {
    this.forecast$ = this.weatherService.getDailyForecast('Armenia,CO').pipe(shareReplay(1));
  }
  today$ = interval(1000).pipe( //trae la hora actualizada cada 1s
    startWith(0), 
    map(() => new Date())
  );
  forecast$: Observable<Forecast>;


}
