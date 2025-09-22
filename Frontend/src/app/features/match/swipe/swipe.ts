import { Component, inject } from '@angular/core';
import { FilterService } from '../../../services/filter/filter-service';

@Component({
  selector: 'app-swipe',
  standalone: true,
  imports: [],
  templateUrl: './swipe.html',
  styleUrl: './swipe.css'
})
export class Swipe {
  filterService = inject(FilterService)
  
  filterActivated(){
    this.filterService.Switch()
  }
}
