import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentWeather } from '../../components/current-weather/current-weather';
import { DailyForecast } from '../../components/daily-forecast/daily-forecast';
import { ThreeHourForecast } from "../../components/three-hour-forecast/three-hour-forecast";
import { ForecastChart } from '../../components/forecast-chart/forecast-chart';
import { TopBar } from '../../components/top-bar/top-bar';
@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    CurrentWeather,
    DailyForecast,
    ThreeHourForecast,
    ForecastChart,
    TopBar
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  standalone: true
})
export class Dashboard {
}