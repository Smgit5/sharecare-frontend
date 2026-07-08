import { Injectable, signal } from '@angular/core';

type ToastKind = 'success' | 'error' | 'info' | 'warning';

export interface ToastState {
  kind: ToastKind;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toast = signal<ToastState | null>(null);

  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  showSuccessToast(message: string, durationMs = 3000): void {
    this.showToast('success', message, durationMs);
  }

  showErrorToast(message: string, durationMs = 3000): void {
    this.showToast('error', message, durationMs);
  }

  showGenericErrorToast(message: string = 'Something went wrong. Please try again.', durationMs = 3000): void {
    this.showToast('error', message, durationMs);
  }

  showInfoToast(message: string, durationMs = 3000): void {
    this.showToast('info', message, durationMs);
  }

  showWarningToast(message: string, durationMs = 3000): void {
    this.showToast('warning', message, durationMs);
  }

  private showToast(kind: ToastKind, message: string, durationMs: number): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    this.toast.set({ kind, message });

    this.timeoutId = setTimeout(() => {
      this.toast.set(null);
      this.timeoutId = null;
    }, durationMs);
  }
}
