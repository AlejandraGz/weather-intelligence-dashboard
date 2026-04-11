import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Forecast, ForecastItem } from '../../models/weather.model';
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

  forecast = input<Forecast | null>();
  selectedDate = input<string | null>();
  activeDate: string = '';

  constructor(private forecastState: ForecastStateService) {}

  showThreeHourForescatPerDay(f: ForecastItem) {
    const date = f.dt_txt.split(' ')[0];
    this.forecastState.setSelectedDate(date);
    this.activeDate = date;
  }
}