import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, map, Observable, of } from 'rxjs';
import { ForecastItem } from '../../features/weather/models/weather.model';
import { WeatherService } from './weather';

@Injectable({
  providedIn: 'root',
})
export class ForecastStateService {

  constructor(private weatherService: WeatherService) { }
  private selectedDate = new BehaviorSubject<string>(this.getTomorrowDate());
  selectedDate$ = this.selectedDate.asObservable();

  setSelectedDate(date: string) {
    this.selectedDate.next(date); //Trae todos los items por dia
  }

  getForecastByDate(date$: Observable<string>): Observable<ForecastItem[]> {
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
    console.log(this.getTomorrowDate())
    return this.getForecastByDate(of(this.getTomorrowDate()));
  }
  private getTomorrowDate(): string {
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

   return tomorrow.toISOString().split('T')[0];
  }
}
