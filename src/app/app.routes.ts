import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { List } from './features/campaign/list/list';
import { Details } from './features/campaign/details/details';
import { DemoTestComponent } from './temp/demo.test.component/demo.test.component';
import { Register } from './features/auth/register/register';
import { HomeComponent } from './features/home/home.component/home.component';
import { EmailVerificationComponent } from './features/auth/email-verification.component/email-verification.component';
import { ResendVerificationEmailComponent } from './features/auth/resend-verification-email.component/resend-verification-email.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password.component/forgot-password.component';
import { ResetPasswordComponent } from './features/auth/reset-password.component/reset-password.component';

export const routes: Routes = [
    {
        path: '',
        component: List
    },
    {
        path: 'verify-email',
        component: EmailVerificationComponent
    },
    {
        path: 'resend-verification-email',
        component: ResendVerificationEmailComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent
    },
    {
        path: 'demo-test',
        component: DemoTestComponent
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: 'campaigns',
        component: List
    },
    {
        path: 'campaigns/:id',
        component: Details
    }
];
