import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  isActivate = signal(false);
  http = inject(HttpClient);

  Switch() {
    this.isActivate.update((v) => !v);
  }

  getIdiomas() {
    this.http.get(`http://localhost:3000/idiomas`);
  }

  getHabilidades() {
    this.http.get(`http://localhost:3000/habilidades`);
  }
}
