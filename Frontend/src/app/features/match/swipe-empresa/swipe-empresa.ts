import { Component, ElementRef, inject, QueryList, ViewChildren } from '@angular/core';
import { FilterService } from '../../../services/filter/filter-service';
import { Perfil } from '../../../shared/services/perfil';
import { Match } from '../../../shared/services/match';
import { Auth } from '../../../shared/services/auth';

@Component({
  selector: 'app-swipe-empresa',
  imports: [],
  templateUrl: './swipe-empresa.html',
  styleUrl: './swipe-empresa.css'
})
export class SwipeEmpresa {
  filter = inject(FilterService);
  profile = inject(Perfil);
  match = inject(Match);
  auth = inject(Auth);

  userType = this.auth.getUserType();

  list: Postulante[] =[
      {id: '1',
      name: 'María',
      lastname: 'García',
      anos_experiencia: 5,
      curriculum: '#',
      foto: 'https://i.pravatar.cc/300?img=47',
      ubicacion: 'Medellín, CO',
      habilidades: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
      idiomas: ['Español', 'Inglés', 'Portugués']
    }];

  start = 0;
  current_position = 0;
  isDragging = false;

  ngOnInit(): void {
    console.log('Swipe Component Initialized');
    // 1. Llamada a getCards al inicio del componente
    //this.getCards();
    console.log(this.list)
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

  onPointerUp() {
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
      this.match.onDislike();
    } else {
      this.match.onLike();
    }
    this.list.shift(); // Elimina la carta actual

    this.isDragging = false;
    this.current_position = 0;
  }

  /*getCards() {
      this.match.getVacantes().subscribe({
        next: (data: Postulante[]) => {
          this.list = data;
          console.log(this.list);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }*/

  filterActivated() {
    this.filter.Switch();
  }
}
