import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../../core/services/auth';
import { Router } from '@angular/router';
import { LoginRequest } from '../../../core/models/auth.model';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginRequest: LoginRequest = {
    username: '',
    password: ''
  }

  private auth = inject(Auth);
  private router = inject(Router);

  login() {
    this.auth.login(this.loginRequest).subscribe({
      next: (response) => {
        this.auth.saveTokens(response);
        this.router.navigate(['/campaigns']);
      },
      error: (error) => {
        console.log('Login failed', error);
      }
    });
  }
}
