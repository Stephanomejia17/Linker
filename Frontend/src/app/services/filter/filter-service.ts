import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

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

  enviarIdiomasSeleccionados(ids: number[]): Observable<{ vacantes: Vacante[] }> {
    const params = new URLSearchParams();
    const postulanteID = sessionStorage.getItem('perfilId');
    params.set('postulanteId', postulanteID!.toString());
    params.set('idiomas', ids.join(','));
    const endpoint = `http://localhost:3000/vacantes/filtrar?${params.toString()}`;
    console.log('ENDPOINT AL BACKEND: ', endpoint);
    const response = this.http.get<{ vacantes: Vacante[] }>(endpoint);
    console.log('RESPONSE DEL ENDPOINT', response);
    return response;
  }
}
