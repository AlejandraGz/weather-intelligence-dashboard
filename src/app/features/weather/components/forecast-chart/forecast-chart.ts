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

  selectedForecast$!: Observable<ForecastItem[]>
  chart: any;

  ngOnInit() {
    this.selectedForecast$ = this.forecastService.getForecastByDate(this.forecastService.selectedDate$)
  }
  ngAfterViewInit() {
    this.createChart();
  }
  createChart() {
    this.selectedForecast$.subscribe(data => {
      if (data.length) {

        const labels = data.map(item =>
          item.dt_txt.split(' ')[1].slice(0, 5)
        );

        const temperaturas = data.map(item =>
          item.main.temp
        );

        if (this.chart) {
          this.chart.destroy();
        }

        const ctx = document.getElementById('miGrafica') as HTMLCanvasElement;
        const gradient = ctx.getContext('2d')!.createLinearGradient(0, 0, 0, 400);

        // Degradado
        gradient.addColorStop(0, 'rgba(255, 99, 132, 0.4)');
        gradient.addColorStop(1, 'rgba(255, 99, 132, 0)');

        this.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Temperatura (°C)',
              data: temperaturas,

              // Estilo de línea
              borderColor: '#ff6384',
              backgroundColor: gradient,
              borderWidth: 3,
              tension: 0.4,
              fill: true,

              // Puntos
              pointBackgroundColor: '#fff',
              pointBorderColor: '#ff6384',
              pointRadius: 3,
              pointHoverRadius: 5,
              pointBorderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
              legend: {
                display: true,
                labels: {
                  color: '#333',
                  font: {
                    size: 14
                  }
                }
              },
              tooltip: {
                backgroundColor: '#333',
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 10,
                cornerRadius: 20
              }
            },

            scales: {
              x: {
                grid: {
                  display: false
                },
                ticks: {
                  color: '#666'
                }
              },
              y: {
                grid: {
                  color: 'rgba(0,0,0,0.05)'
                },
                ticks: {
                  color: '#666'
                }
              }
            }
          }
        });
      }
    });
  }
}
