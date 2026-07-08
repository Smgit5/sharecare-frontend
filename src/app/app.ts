import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Theme } from './core/services/theme';
import { ToastService } from './core/services/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('sharecare-frontend');
  protected theme = inject(Theme);
  protected toastService = inject(ToastService);
}
