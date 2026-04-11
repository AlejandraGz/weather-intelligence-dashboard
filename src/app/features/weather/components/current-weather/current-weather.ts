import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Weather } from '../../models/weather.model';

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
  currentWeather = input<Weather | null>();
  
  constructor() {
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
