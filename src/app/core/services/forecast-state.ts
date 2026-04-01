import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, map, Observable, of } from 'rxjs';
import { ForecastItem } from '../../features/weather/models/weather.model';
import { WeatherService } from './weather';

@Injectable({
  providedIn: 'root',
})
export class ForecastStateService {

  constructor(private weatherService: WeatherService) { }
  private selectedDate = new BehaviorSubject<string | null>(null);
  selectedDate$ = this.selectedDate.asObservable();

  setSelectedDate(date: string) {
    this.selectedDate.next(date); //Trae todos los items por dia
    console.log(date)
  }

  getForecastByDate(date$: Observable<string | null>): Observable<ForecastItem[]> {
    const forecastData$ = this.weatherService.getDailyForecast('Armenia,CO');

    return combineLatest([forecastData$, date$]).pipe(
      map(([forecast, date]) => {
        if (!date || !forecast?.list) return [];

        return forecast.list.filter(item =>
          item.dt_txt.startsWith(date)
        );
      }),
      catchError(err => {
        console.error('Error al obtener el pronostico por día seleccionado', err)
        return of([]);
      })
    );
  }
  getTomorrowForecast(): Observable<ForecastItem[]> {

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const date = tomorrow.toISOString().split('T')[0];

    return this.getForecastByDate(of(date));
  }
}
