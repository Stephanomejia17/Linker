import { Routes } from '@angular/router';
import { Match } from './features/match/match';
import { Hero } from './features/hero/hero';
import { Signin } from './features/signin/signin';
import { Login } from './features/login/login';

export const routes: Routes = [
    {
        path:"",
        component: Hero,
        pathMatch:"full"
    },
    {
        path: "match",
        component: Match,
        pathMatch: 'full'
    },
    {
        path: "login",
        component: Login,
        pathMatch: 'full'
    },
    {
        path: "signin",
        component: Signin,
        pathMatch: 'full'
    },
    {
        path: "**",
        redirectTo: ""
    }
];
