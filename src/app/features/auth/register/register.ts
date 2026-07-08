import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserRegisterRequest } from '../../../core/models/auth.model';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  showPassword = signal(false);

  userRegisterRequest: UserRegisterRequest = {
    username: '',
    password: ''
  };

  togglePasswordVisibility(): void {
    this.showPassword.update((isVisible) => !isVisible);
  }

  register(): void {
    console.log('Register request', this.userRegisterRequest);
  }
}
