import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';

enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalService: BsModalService) {

  }

  private showAlert(message: string, type: string, timeout: number) {
    console.log('timeout:', timeout);
    const config = {
      initialState: {
        type,
        message,
        timeout
      }
    };
    this.modalService.show(AlertModalComponent, config);
  }

  showAlertDanger(message: string, timeout: number = 2000) {
    this.showAlert(message, AlertTypes.DANGER, timeout);
  }

  showAlertSuccess(message: string, timeout: number = 2000) {
    this.showAlert(message, AlertTypes.SUCCESS, timeout);
  }
}
