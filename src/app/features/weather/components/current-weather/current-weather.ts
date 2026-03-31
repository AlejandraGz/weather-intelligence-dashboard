import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Weather } from '../../models/weather.model';
import { Observable, shareReplay } from 'rxjs';
import { WeatherService } from '../../../../core/services/weather';

@Component({
  selector: 'app-current-weather',
  imports: [CommonModule],
  templateUrl: './current-weather.html',
  styleUrls: [
    './current-weather.css',
    '../../styles/weather-card.css'
  ]
})
export class CurrentWeather {
  weather$: Observable<Weather>;
  constructor(private weatherService: WeatherService) {
    this.weather$ = this.weatherService.getCurrentWeather('Armenia,CO').pipe(shareReplay(1));
  }
}
