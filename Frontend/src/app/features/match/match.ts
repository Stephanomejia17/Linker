import { Component, inject } from '@angular/core';
import { Sidebar } from './sidebar/sidebar';
import { Swipe } from './swipe/swipe';
import { Filter } from './filter/filter';
import { FilterService } from '../../services/filter/filter-service';
import { Bottombar } from './bottombar/bottombar';
import { SidebarService } from '../../services/sidebar/sidebar-service';

@Component({
  selector: 'app-match',
  imports: [Sidebar, Swipe, Filter, Bottombar],
  templateUrl: './match.html',
  styleUrl: './match.css',
})
export class Match {
  filterService = inject(FilterService);
  sidebarService = inject(SidebarService);
}
