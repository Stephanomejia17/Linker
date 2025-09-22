import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  isActivate = signal(false);

  Switch(){
    this.isActivate.update(v => !v);
  }

}
