import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../../../core/services/weather';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, of } from 'rxjs';


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

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    const citySaved = localStorage.getItem('city');

    if (citySaved) {
      try {
        const city = JSON.parse(citySaved);
        this.selectCity(city);
      } catch (e) {
        localStorage.removeItem('city');
      }
    }

    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(value => {
        if (!value || value.length < 2) {
          return of([])
        }
        return this.weatherService.searchCity(value)
      })
    ).subscribe(res => {
      this.cities = res;
    })


  }

  selectCity(city: any) {
    this.weatherService.setSelectedCity(city);

    this.searchControl.setValue(`${city.name} - ${city.state}, ${city.country}`, { emitEvent: false });

    this.showList = false;
    this.cities = [];

    localStorage.setItem('city', JSON.stringify(city));
  }
}
