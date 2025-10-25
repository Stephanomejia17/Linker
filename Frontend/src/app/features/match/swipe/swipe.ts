import {
  Component,
  ElementRef,
  inject,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FilterService } from '../../../services/filter/filter-service';
import { Auth } from '../../../shared/services/auth';
import { Perfil } from '../../../shared/services/perfil';
import { Match } from '../../../shared/services/match';

@Component({
  selector: 'app-swipe',
  standalone: true,
  templateUrl: './swipe.html',
  styleUrls: ['./swipe.css'],
})
export class Swipe {
  filter = inject(FilterService);
  profile = inject(Perfil)
  match=inject(Match)

  list = [
    {
      title: 'Frontend Developer',
      company: 'TechCorp',
      salary: '$2000',
      location: 'Medellín',
      tags: ['Angular', 'TypeScript'],
      language: ['Angular', 'TypeScript'],
      schedule: 'Full-time',
      description: 'Desarrollo frontend',
    },
    {
      title: ' Developer',
      company: 'TechCorp',
      salary: '$2000',
      location: 'Medellín',
      tags: ['Angular', 'TypeScript'],
      schedule: 'Full-time',
      description: 'Desarrollo frontend',
    },
    {
      title: ' hola',
      company: 'TechCorp',
      salary: '$2000',
      location: 'Medellín',
      tags: ['Angular', 'TypeScript'],
      schedule: 'Full-time',
      description: 'Desarrollo frontend',
    },
  ];

  start = 0;
  current_position = 0;
  isDragging = false;


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

  filterActivated() {
    this.filter.Switch();
  }
}
