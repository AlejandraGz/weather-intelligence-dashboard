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
  protected readonly title = signal('weather-intelligence-dashboard');
  isDark = false;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.isDark = this.themeService.getTheme() === 'dark';
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDark = this.themeService.getTheme() === 'dark';
  }
}
