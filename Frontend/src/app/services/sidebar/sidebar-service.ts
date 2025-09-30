import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  isActivate = signal(true);

  Switch() {
    this.isActivate.update((v) => !v);
  }
}
