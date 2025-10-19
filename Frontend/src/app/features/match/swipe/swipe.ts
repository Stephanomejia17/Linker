import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { FilterService } from '../../../services/filter/filter-service';

register();

@Component({
  selector: 'app-swipe',
  standalone: true,
  templateUrl: './swipe.html',
  styleUrls: ['./swipe.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Swipe {

  filter = inject(FilterService);

  vacancies = [
    {
      title: 'Frontend Developer',
      salary: '$3.5M',
      description: 'Buscamos desarrollador con experiencia en Angular',
      emoji: '💻',
      location: 'Bogotá',
      company: 'Tech Corp',
      schedule: 'Remoto',
      tags: ['Angular', 'TypeScript', 'CSS']
    },
    {
      title: 'Backend Developer',
      salary: '$4M',
      description: 'Buscamos experto en Node.js y MongoDB',
      emoji: '⚙️',
      location: 'Medellín',
      company: 'DevSoft',
      schedule: 'Presencial',
      tags: ['Node', 'MongoDB', 'Express']
    }
  ];

  onSlideChange() {
    console.log('Slide changed');
    
  }

  filterActivated() {
    this.filter.Switch();
  }
}
