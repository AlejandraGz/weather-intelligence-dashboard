import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentWeather } from '../../components/current-weather/current-weather';
import { DailyForecast } from '../../components/daily-forecast/daily-forecast';
import { ThreeHourForecast } from "../../components/three-hour-forecast/three-hour-forecast";
import { ForecastChart } from '../../components/forecast-chart/forecast-chart';
@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    CurrentWeather,
    DailyForecast,
    ThreeHourForecast,
    ForecastChart
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  standalone: true
})
export class Dashboard {

  toKm(speed: number): string {
    return (speed * 3.6).toFixed(1);
  }

  toKmVisibility(m: number): string {
    return (m / 1000).toFixed(1);
  }

  formatTime(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}