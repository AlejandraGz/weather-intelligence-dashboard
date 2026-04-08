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

  getWeatherIcon(description: string): string {
    if (description.includes('lluvia')) return 'cloud-rain';
    if (description.includes('nube')) return 'cloud';
    if (description.includes('tormenta')) return 'cloud-lightning';
    if (description.includes('nieve')) return 'snowflake';
    if (description.includes('cielo claro')) return 'sun';

    return 'cloud';
  }
}
