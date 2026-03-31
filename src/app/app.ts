import { Component, signal } from '@angular/core';
import { Dashboard } from './fetaures/weather/pages/dashboard/dashboard';

@Component({
  selector: 'app-root',
  imports: [ Dashboard ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('weather-intelligence-dashboard');
}
