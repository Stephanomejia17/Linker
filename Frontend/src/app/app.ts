import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { Hero } from './features/hero/hero';
import { Signin } from "./features/signin/signin";
import { Signup } from "./features/signup/signup";
import { SignupEmpresas } from "./features/signup-empresas/signup-empresas";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Hero, Signin, Signup, SignupEmpresas],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Frontend');
}
