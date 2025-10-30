import { Component, ElementRef, inject, QueryList, ViewChildren } from '@angular/core';
import { FilterService } from '../../../services/filter/filter-service';
import { Auth } from '../../../shared/services/auth';
import { Perfil } from '../../../shared/services/perfil';
import { Match } from '../../../shared/services/match';
import { Alerts } from '../../../shared/services/alerts';

@Component({
  selector: 'app-swipe',
  standalone: true,
  templateUrl: './swipe.html',
  styleUrls: ['./swipe.css'],
})
export class Swipe {
  filter = inject(FilterService);
  profile = inject(Perfil);
  match = inject(Match);
  auth = inject(Auth);
  alerts = inject(Alerts);

  userType = this.auth.getUserType();

  list: Vacante[] = [];
  start = 0;
  current_position = 0;
  isDragging = false;

  ngOnInit(): void {
    console.log('Swipe Component Initialized');
    console.log(this.list);
  }

  @ViewChildren('card') cardElement!: QueryList<ElementRef<HTMLDivElement>>;

  onPointerDown(event: PointerEvent) {
    this.start = event.clientX;
    this.isDragging = true;
    //console.log('se ha tocaod ', this.start);
  }

  onPointerMove(event: PointerEvent) {
    //console.log('point_move');
    if (!this.isDragging) return;
    //console.log('inicio', this.start);
    this.current_position = event.clientX - this.start;
    //console.log('Evento', event.clientX);
    //console.log('currentposition', this.current_position);

    const card = this.cardElement.first.nativeElement;
    card.style.transform = `translateX(${this.current_position}px) rotate(${
      this.current_position / 20
    }deg)`;
  }

  onPointerUp(vacante: Vacante) {
    if (!this.isDragging) return;
    const card = this.cardElement.first.nativeElement;
    //console.log(card)
    if (Math.abs(this.current_position) < 110) {
      card.style.transition = 'transform 0.4s cubic-bezier(0.25, 1.25, 0.5, 1)';
      card.style.transform = 'translateX(0px) rotate(0deg)';
      card.classList.remove('grabbing');
      this.isDragging = false;
      this.current_position = 0;
      return;
    } else if (this.current_position < 0) {
      const interaccion: Interaccion = {
        accion_postulante: 'dislike',
        vacante: vacante.id_vacante,
        postulante: sessionStorage.getItem('perfilId') || '',
        empresa: vacante.empresa.id_perfil,
      };
      console.log(interaccion);

      this.match.onAction(interaccion).subscribe({
        next: () => console.log('Dislike enviado:', interaccion),
        error: (err) => console.error('Error al enviar dislike:', err),
      });
    } else {
      const interaccion: Interaccion = {
        accion_postulante: 'like',
        vacante: vacante.id_vacante,
        postulante: sessionStorage.getItem('perfilId') || '',
        empresa: vacante.empresa.id_perfil,
      };
      this.match.onAction(interaccion).subscribe({
        next: () => console.log('like enviado:', interaccion),
        error: (err) => console.error('Error al enviar like:', err),
      });
    }
    this.list.shift(); // Elimina la carta actual

    this.isDragging = false;
    this.current_position = 0;
  }

  getCards() {
    // this.match.getVacantes().subscribe({
    //   next: (data: Vacante[]) => {
    //     this.list = data;
    //     console.log('VACANTES:', this.list);
    //   },
    //   error: (err: any) => {
    //     console.log(err);
    //     this.alerts.info('No hay mas vacantes disponibles por el momento');
    //   },
    // });

    const idsString = sessionStorage.getItem('idIdiomas');
    const ids: number[] = idsString ? idsString.split(',').map((id) => Number(id)) : [];

    this.filter.enviarIdiomasSeleccionados(ids).subscribe({
      next: (data: { vacantes: Vacante[] }) => {
        // Por si acaso data viene como objeto
        console.log(typeof data);
        this.list = Array.isArray(data.vacantes) ? data.vacantes : [];
        console.log('VACANTES FILTRO: ', this.list);
      },
      error: (err: any) => {
        console.log(err);
        this.alerts.info('No hay mas vacantes disponibles por el momento');
      },
    });
  }

  filterActivated() {
    this.filter.Switch();
  }
}
