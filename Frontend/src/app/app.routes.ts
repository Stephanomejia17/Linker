import { Routes } from '@angular/router';
import { Match } from './features/match/match';
import { Hero } from './features/hero/hero';
import { Login } from './features/login/login';
import { PerfilPostulante } from './features/perfil-postulante/perfil-postulante';
import { PerfilEmpresa } from './features/perfil-empresa/perfil-empresa';
import { Signup } from './features/signup/signup';
import { SignupEmpresas } from './features/signup-empresas/signup-empresas';

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
        path:"signup",
        component: Signup,
        pathMatch: 'full'
    },
    {
        path:"signup-empresa",
        component: SignupEmpresas,
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
