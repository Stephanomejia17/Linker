import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  isLogged = signal(false);

  signUp(user: User | Empresa) {
    if (localStorage.getItem(user.email)) {
      return { succes: false, message: 'Usuario ya se encuentra registrado' };
    }

    localStorage.setItem(user.email, JSON.stringify(user));
    return { succes: true, message: 'Usuario registrado exitosamente' };
  }

  login(user: User | Empresa) {
    console.log('user enviado', user);
    let userSrt = localStorage.getItem(user.email);

    console.log(userSrt);

    if (userSrt && user.password === JSON.parse(userSrt)['password']) {
      sessionStorage.setItem('user', user.email);
      this.isLogged.set(true);
      return { success: true, redirectTo: 'match', message: 'Autenticado exitosamente' };
    }

    return { success: false, message: 'Credenciales inválidas' };
  }

  logout() {
    this.isLogged.set(false);
    sessionStorage.clear();
  }
}
