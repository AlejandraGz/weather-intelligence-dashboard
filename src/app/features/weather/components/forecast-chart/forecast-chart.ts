import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ForecastStateService } from '../../../../core/services/forecast-state';
import { ForecastItem } from '../../models/weather.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-forecast-chart',
  imports: [CommonModule],
  templateUrl: './forecast-chart.html',
  styleUrls: [
    './forecast-chart.css',
    '../../styles/weather-card.css'
  ]
})
export class ForecastChart implements OnInit {
  constructor(private forecastService: ForecastStateService) {
  }

  tomorrowForecast$!: Observable<ForecastItem[]>
  chart: any;

  ngOnInit() {
    this.tomorrowForecast$ = this.forecastService.getTomorrowForecast()
  }
  ngAfterViewInit() {
  this.createChart();
}
  createChart() {
    this.tomorrowForecast$.subscribe(data =>{
      if(data.length){
        const labels = data.map(item =>
          item.dt_txt.split(' ')[1] // obtiene la hora
        );
        const temperaturas = data.map(item => 
          item.main.temp //obtiene las temperaturas
        );

        if(this.chart) {
          this.chart.destroy(); //si existe antes, borrarla
        }

        this.chart = new Chart('miGrafica', {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Temperatura (°C)',
              data: temperaturas,
              borderWidth: 2,
              tension: 0.3
            }]
          },
          options: {
            responsive: true,
          }
        })
      }
    })

  }
}
