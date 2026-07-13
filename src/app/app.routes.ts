import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { List } from './features/campaign/list/list';
import { Details } from './features/campaign/details/details';
import { DemoTestComponent } from './temp/demo.test.component/demo.test.component';
import { Register } from './features/auth/register/register';

export const routes: Routes = [
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
