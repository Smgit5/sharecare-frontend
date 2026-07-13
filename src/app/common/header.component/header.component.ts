import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth';
import { Theme } from '../../core/services/theme';
import { RefreshTokenRequest } from '../../core/models/auth.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  protected authService = inject(AuthService);
  protected theme = inject(Theme);

  logout(): void {
    const currentRefreshToken = this.authService.fetchRefreshToken();
    if(!currentRefreshToken) {
      this.authService.performLocalLogout();
      return;
    }
    const refreshTokenRequest: RefreshTokenRequest = {
      token: currentRefreshToken
    }
    this.authService.logout(refreshTokenRequest).pipe(
      finalize(() => {
        this.authService.performLocalLogout();
      })
    ).subscribe();
  }
}
