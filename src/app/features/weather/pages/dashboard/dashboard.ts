import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentWeather } from '../../components/current-weather/current-weather';
import { DailyForecast } from '../../components/daily-forecast/daily-forecast';
import { ThreeHourForecast } from "../../components/three-hour-forecast/three-hour-forecast";
import { ForecastChart } from '../../components/forecast-chart/forecast-chart';
import { ThemeService } from '../../../../core/services/theme';
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

  isDark = false;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.isDark = this.themeService.getTheme() === 'dark';
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDark = this.themeService.getTheme() === 'dark';
  }
}