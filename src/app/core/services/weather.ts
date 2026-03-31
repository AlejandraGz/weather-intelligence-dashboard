import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Weather, Forecast } from '../../fetaures/weather/models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  private apiKey = '4688fe35a7866de3acbb6c053aeb8416';
  private baseURL = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) {}

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
}