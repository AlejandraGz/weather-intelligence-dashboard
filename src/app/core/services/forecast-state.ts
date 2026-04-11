import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, map, Observable, of } from 'rxjs';
import { Forecast, ForecastItem } from '../../features/weather/models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class ForecastStateService {

  private selectedDate = new BehaviorSubject<string>(this.getTomorrowDate());
  selectedDate$ = this.selectedDate.asObservable();

  setSelectedDate(date: string) {
    this.selectedDate.next(date); //Trae todos los items por dia
  }

  getForecastByDate(
    forecast$: Observable<Forecast>,
    date$: Observable<string>
  ): Observable<ForecastItem[]> {

    return combineLatest([forecast$, date$]).pipe(
      map(([forecast, date]) => {
        if (!date || !forecast?.list) return [];

        return forecast.list.filter(item =>
          item.dt_txt.startsWith(date)
        );
      }),
      catchError(() => of([]))
    );
  }

  private getTomorrowDate(): string {

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    return tomorrow.toISOString().split('T')[0];
  }
}
