import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ForecastItem } from '../../features/weather/models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class ForecastStateService {
  private selectedDate = new BehaviorSubject<string | null>(null);
  selectedDate$ = this.selectedDate.asObservable();

  setSelectedDate(date: string) {
    this.selectedDate.next(date); //Trae todos los items por dia
    console.log(date)
  }
}
