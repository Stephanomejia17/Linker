import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class Alerts {

  private showAlert(icon: SweetAlertIcon, message: string, title: string) {
    Swal.fire({
      icon,
      title,
      text: message,
      position:'top',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      animation:false,
      customClass: {
        popup: 'swal-custom',
        title: 'swal-title',
      },
    });
  }

  success(message: string, title: string = 'Éxito') {
    this.showAlert('success', message, title);
  }

  error(message: string, title: string = 'Error') {
    this.showAlert('error', message, title);
  }

  warning(message: string, title: string = 'Advertencia') {
    this.showAlert('warning', message, title);
  }

  info(message: string, title: string = 'Información') {
    this.showAlert('info', message, title);
  }
}
