import { Routes } from '@angular/router';
import { Match } from './features/match/match';
import { Hero } from './features/hero/hero';
import { Signin } from './features/signin/signin';
import { Login } from './features/login/login';
import { PerfilPostulante } from './features/perfil-postulante/perfil-postulante';
import { PerfilEmpresa } from './features/perfil-empresa/perfil-empresa';

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
        path: "postulante",
        component: PerfilPostulante,
        pathMatch: 'full'
    },
    {
        path: "empresa",
        component: PerfilEmpresa,
        pathMatch: 'full'
    },
    {
        path: "**",
        redirectTo: ""
    }
];
