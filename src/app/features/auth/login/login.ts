import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginRequest = {
    username: '',
    password: ''
  }

  private auth = inject(Auth);

  login() {
    this.auth.login(this.loginRequest).subscribe({
      next: (response) => {
        console.log('Login success', response);
      },
      error: (error) => {
        console.log('Login failed', error);
      }
    });
  }
}
