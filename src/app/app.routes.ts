import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { List } from './features/campaign/list/list';
import { Details } from './features/campaign/details/details';

export const routes: Routes = [
    {
        path: 'login',
        component: Login
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
