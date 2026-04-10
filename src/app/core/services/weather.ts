import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Weather, Forecast } from '../../features/weather/models/weather.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  private apiKey = '4688fe35a7866de3acbb6c053aeb8416';
  private baseURL = 'https://api.openweathermap.org/data/2.5';
  private geoUrl = 'https://api.openweathermap.org/geo/1.0/direct';

  constructor(private http: HttpClient) { }

  private selectedCitySubject = new BehaviorSubject<any>(null);
  selectedCity$ = this.selectedCitySubject.asObservable();

  //PARAMETROS BASE REUTILIZABLES
  private baseParams() {
    return new HttpParams()
      .set('appid', this.apiKey)
      .set('units', 'metric')
      .set('lang', 'es');
  }

  private get<T>(endpoint: string, params: HttpParams) {
    return this.http.get<T>(`${this.baseURL}/${endpoint}`, { params });
  }

  // CLIMA ACTUAL
  getCurrentWeather(city: string) {
    const params = this.baseParams().set('q', city);
    return this.get<Weather>('weather', params);
  }

  // FORECAST
  getDailyForecast(city: string) {
    const params = this.baseParams().set('q', city);
    return this.get<Forecast>('forecast', params);
  }

  searchCity(city: string): Observable<any> {
    return this.http.get(this.geoUrl, {
      params: {
        q: city,
        limit: '5',
        appid: this.apiKey
      }
    });
  }
  setSelectedCity(city: any) {
    this.selectedCitySubject.next(city);
  }
}
