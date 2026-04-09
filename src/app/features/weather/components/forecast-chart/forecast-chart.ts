import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit
} from '@angular/core';

import { ForecastStateService } from '../../../../core/services/forecast-state';
import { ForecastItem } from '../../models/weather.model';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-forecast-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forecast-chart.html',
  styleUrls: [
    './forecast-chart.css',
    '../../styles/weather-card.css'
  ]
})
export class ForecastChart implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('miGrafica', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  selectedForecast$!: Observable<ForecastItem[]>;

  chart: Chart | null = null;
  private sub?: Subscription;

  constructor(private forecastService: ForecastStateService) {}

  ngOnInit() {
    this.selectedForecast$ =
      this.forecastService.getForecastByDate(
        this.forecastService.selectedDate$
      );
  }
  ngAfterViewInit() {
    this.sub = this.selectedForecast$.subscribe(data => {
      if (!data?.length) return;
      this.renderChart(data);
    });
  }

  private renderChart(data: ForecastItem[]) {

    const labels = data.map(item =>
      this.formatHour(item.dt_txt)
    );

    const temperaturas = data.map(item =>
      item.main.temp
    );

    const getTempColor = (value: number) => {
      if (value <= 18) return '#076185';
      if (value <= 24) return '#2ecc71';
      if (value <= 28) return '#f6b93b';
      return '#e55039';
    };

    if (!this.chart) {
      const ctx = this.canvasRef.nativeElement.getContext('2d')!;

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Temperatura (°C)',
            data: temperaturas,

            borderWidth: 3,
            tension: 0.45,
            fill: true,

            pointRadius: 4,
            pointHoverRadius: 6,

            pointBackgroundColor: (ctx: any) => {
              const value = ctx.raw;
              return getTempColor(value);
            },

            pointBorderColor: '#fff',
            pointBorderWidth: 2,

            segment: {
              borderColor: (ctx: any) => {
                const value = ctx.p1.parsed.y;
                return getTempColor(value);
              }
            },

            backgroundColor: (context: any) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;

              if (!chartArea) return null;

              const min = Math.min(...temperaturas);
              const max = Math.max(...temperaturas);

              const gradient = ctx.createLinearGradient(
                0,
                chartArea.bottom,
                0,
                chartArea.top
              );

              gradient.addColorStop(0, getTempColor(min) + '10');
              gradient.addColorStop(0.5, getTempColor((min + max) / 2) + '20');
              gradient.addColorStop(1, getTempColor(max) + '35');

              return gradient;
            }
          }]
        },

        options: this.getChartOptions()
      });

      return;
    }

    // 👉 ACTUALIZACIÓN (SIN DESTRUIR)
    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = temperaturas;

    this.chart.update();
  }

  private formatHour(dateStr: string): string {
    const date = new Date(dateStr);

    return date.toLocaleTimeString('es-CO', {
      hour: 'numeric',
      hour12: true
    }).replace(' ', '');
  }

private getChartOptions(): ChartOptions<'line'> {
  return {
    responsive: true,
    maintainAspectRatio: false,

    interaction: {
      mode: 'index',
      intersect: false
    },

    plugins: {
      legend: {
        labels: {
          color: '#444',
          font: {
            size: 13,
            weight: 'bold'
          }
        }
      },

      tooltip: {
        backgroundColor: '#1f1f1f94',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        cornerRadius: 12,
        displayColors: false,
        callbacks: {
          label: (ctx: any) => {
            const temp = ctx.raw;

            let estado = '';
            if (temp <= 18) estado = '❄️ Frío';
            else if (temp <= 24) estado = '🌤️ Agradable';
            else if (temp <= 28) estado = '🌡️ Cálido';
            else estado = '🔥 Caliente';

            return `${temp}°C • ${estado}`;
          }
        }
      }
    },

    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#666',
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8,
          font: { size: 12 }
        }
      },
      y: {
        grid: { display: false },
        ticks: {
          color: '#666'
        }
      }
    }
  };
}

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.chart?.destroy();
  }
}