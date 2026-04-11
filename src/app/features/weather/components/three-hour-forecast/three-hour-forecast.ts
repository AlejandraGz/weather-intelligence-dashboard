import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastItem } from '../../models/weather.model';

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
export class ThreeHourForecast{

  constructor(
  ) { }

  // Se declara la variable para guardar la fecha seleccionada
  selectedDate = input<string | null>();

  // se declara la lista filtrada por día 
  forecastFiltered = input<ForecastItem[] | null>();


  getTempClass(temp: number): string {

    if (temp <= 18) {
      return 'card-cool';
    }

    if (temp <= 24) {
      return 'card-soft';
    }
    if (temp <= 28) {
      return 'card-warm';
    }

    return 'card-hot';
  }
}