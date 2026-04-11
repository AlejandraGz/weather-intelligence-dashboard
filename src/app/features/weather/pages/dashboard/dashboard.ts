import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentWeather } from '../../components/current-weather/current-weather';
import { DailyForecast } from '../../components/daily-forecast/daily-forecast';
import { ThreeHourForecast } from "../../components/three-hour-forecast/three-hour-forecast";
import { ForecastChart } from '../../components/forecast-chart/forecast-chart';
import { TopBar } from '../../components/top-bar/top-bar';
import { CitySearch } from "../../components/city-search/city-search";
import { filter, Observable, shareReplay, switchMap } from 'rxjs';
import { ForecastStateService } from '../../../../core/services/forecast-state';
import { WeatherService } from '../../../../core/services/weather';
import { Forecast, Weather, ForecastItem, City } from '../../models/weather.model';
@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    CurrentWeather,
    DailyForecast,
    ThreeHourForecast,
    ForecastChart,
    TopBar,
    CitySearch
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  standalone: true
})
export class Dashboard implements OnInit {
  forecast$!: Observable<Forecast>;
  currentWeather$!: Observable<Weather>;
  forecastByDate$!: Observable<ForecastItem[]>;
  selectedDate$!: Observable<string>;
  selectedCity$!: Observable<City | null>;


  constructor(
    private weatherService: WeatherService,
    private forecastState: ForecastStateService
  ) { }

  ngOnInit() {

    this.selectedCity$ = this.weatherService.selectedCity$;

    this.forecast$ = this.selectedCity$.pipe(
      filter(Boolean),
      switchMap(city =>
        this.weatherService.getDailyForecastByCoords(city.lat, city.lon)
      ),
      shareReplay(1)
    );

    this.currentWeather$ = this.selectedCity$.pipe(
      filter(Boolean),
      switchMap(city =>
        this.weatherService.getCurrentWeatherByCoords(city.lat, city.lon)
      ),
      shareReplay(1)
    );

    this.selectedDate$ = this.forecastState.selectedDate$;

    this.forecastByDate$ = this.forecastState.getForecastByDate(
      this.forecast$,
      this.selectedDate$
    );
  }

}