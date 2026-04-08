import { Component, signal } from '@angular/core';
import { Dashboard } from './features/weather/pages/dashboard/dashboard';
import { ThemeService } from './core/services/theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
