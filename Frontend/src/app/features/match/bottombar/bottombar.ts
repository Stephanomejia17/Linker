import { Component, inject } from '@angular/core';
import { SidebarService } from '../../../services/sidebar/sidebar-service';

@Component({
  selector: 'app-bottombar',
  imports: [],
  templateUrl: './bottombar.html',
  styleUrl: './bottombar.css',
})
export class Bottombar {
  sidebarService = inject(SidebarService);

  sidebarActivated() {
    this.sidebarService.Switch();
  }
}
