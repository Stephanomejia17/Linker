import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  isActivate = signal(false);

  Switch() {
    this.isActivate.update((v) => !v);
  }
}
