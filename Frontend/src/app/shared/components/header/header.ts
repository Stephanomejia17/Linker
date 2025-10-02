import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { SidebarService } from '../../../services/sidebar/sidebar-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  router = inject(Router);
  private authService = inject(Auth);
  isLogged = this.authService.isLogged;
  isMenuOpen = false;

  sidebarService = inject(SidebarService);

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('');
    this.closeMenu();
  }

  getUserType(): boolean {
    const email = sessionStorage.getItem('user');
    const data = localStorage.getItem(`${email}` || '');
    console.log(`${email}`);
    if (data) {
      const user = JSON.parse(data);

      return !!user['NIT'];
    }

    return false;
  }
}
