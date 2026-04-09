import { Component } from '@angular/core';
import { interval, map, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../../core/services/theme';

@Component({
  selector: 'app-top-bar',
  imports: [CommonModule],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css',
})
export class TopBar {

  isDark = false;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.isDark = this.themeService.getTheme() === 'dark';
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDark = this.themeService.getTheme() === 'dark';
  }

  today$ = interval(1000).pipe( //trae la hora actualizada cada 1s
    startWith(0),
    map(() => new Date())
  );
}
