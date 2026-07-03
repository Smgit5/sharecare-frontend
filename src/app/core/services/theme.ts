import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, signal } from '@angular/core';

type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  private document = inject(DOCUMENT);
  mode = signal<ThemeMode>(this.getInitialMode());

  constructor() {
    effect(() => {
      const mode = this.mode();

      this.document.documentElement.dataset['theme'] = mode;
      localStorage.setItem('theme', mode);
    });
  }

  toggle(): void {
    this.mode.update((mode) => mode === 'dark' ? 'light' : 'dark');
  }

  private getInitialMode(): ThemeMode {
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'dark' || storedTheme === 'light') {
      return storedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
