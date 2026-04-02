import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  // ✅ FIX IMPORTANTE
  private mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  private currentTheme: 'dark' | 'light' = 'light';

  constructor() {
    this.initTheme();
    this.listenToSystemChanges();
  }

  setTheme(theme: 'dark' | 'light', save = true) {
    this.currentTheme = theme;

    console.log('Tema aplicado:', theme);

    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(`${theme}-theme`);

    if (save) {
      localStorage.setItem('theme', theme);
    }
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  getTheme() {
    return this.currentTheme;
  }

  private initTheme() {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;

    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      this.applySystemTheme();
    }
  }

  private applySystemTheme() {
    const isDark = this.mediaQuery.matches;
    this.setTheme(isDark ? 'dark' : 'light', false);
  }

  private listenToSystemChanges() {
    this.mediaQuery.addEventListener('change', (event) => {
      const savedTheme = localStorage.getItem('theme');

      if (!savedTheme) {
        this.setTheme(event.matches ? 'dark' : 'light', false);
      }
    });
  }
}