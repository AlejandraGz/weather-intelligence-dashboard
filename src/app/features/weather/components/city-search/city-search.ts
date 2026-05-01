import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../../../core/services/weather';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, of } from 'rxjs';
import { City } from '../../models/weather.model';
import { LocationService } from '../../../../core/services/location';


@Component({
  selector: 'app-city-search',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './city-search.html',
  styleUrls: [
    './city-search.css',
    '../../styles/weather-card.css',
  ]
})
export class CitySearch implements OnInit {

  cities: any[] = [];
  showList: boolean = false;

  searchControl = new FormControl('');

  constructor(private weatherService: WeatherService, private locationService: LocationService) { }

  ngOnInit(): void {

    this.locationService.getUserLocation().subscribe(location => {
      if (!location) return;

      this.weatherService.getCityByCoords(location.lat, location.lon)
        .subscribe(cities => {

          if (!cities || cities.length === 0) return;

          const city = cities[0];
          this.selectCity(city);

          this.weatherService.getCurrentWeatherByCoords(city.lat, city.lon)
            .subscribe(weather => {
              console.log('Clima:', weather);
            });
        });
    });

    this.searchControl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(value => {
        if (!value || value.length < 2) {
          return of([]);
        }
        return this.weatherService.searchCity(value);
      })
    ).subscribe(res => {
      this.cities = res;
    });
  }

  selectCity(city: City) {
    this.weatherService.setSelectedCity(city);

    this.searchControl.setValue(`${city.name} - ${city.state}, ${city.country}`, { emitEvent: false });

    this.showList = false;
    this.cities = [];

    localStorage.setItem('city', JSON.stringify(city));
  }
}
