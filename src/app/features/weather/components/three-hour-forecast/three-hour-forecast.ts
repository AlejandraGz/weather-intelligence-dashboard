import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastItem } from '../../models/weather.model';
import { Observable } from 'rxjs';
import { WeatherService } from '../../../../core/services/weather';
import { ForecastStateService } from '../../../../core/services/forecast-state';

@Component({
  selector: 'app-three-hour-forecast',
  imports: [CommonModule],
  templateUrl: './three-hour-forecast.html',
  styleUrls: [
    './three-hour-forecast.css',
    '../../styles/weather-card.css'
  ],
  standalone: true
})
export class ThreeHourForecast implements OnInit {

  constructor(
    private forecastStateService: ForecastStateService
  ) { }

  // Se declara la variable para guardar la fecha seleccionada
  selectedDate$!: Observable<string>;

  // se declara la lista filtrada por día 
  forecastFiltered$!: Observable<ForecastItem[]>;

  ngOnInit() {
    this.selectedDate$ = this.forecastStateService.selectedDate$;
    this.forecastFiltered$ = this.forecastStateService.getForecastByDate(this.selectedDate$)
  }

}