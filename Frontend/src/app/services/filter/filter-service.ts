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

  enviarIdiomasSeleccionados(ids: number[]) {
    const params = new URLSearchParams();
    const postulanteID = sessionStorage.getItem('perfilId');
    params.set('postulanteId', postulanteID!.toString());
    params.set('idiomas', ids.join(','));
    return this.http.get(`http://localhost:3000/vacantes/filtrar?${params.toString()}`);
  }
}
