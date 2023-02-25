import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AlertComponent } from '../alert/alert.component';
import { ModalComponent } from '../modal/modal.component';

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
    const config = {
      initialState: {
        type,
        message,
        timeout
      }
    };
    this.modalService.show(AlertComponent, config);
  }

  showAlertDanger(message: string, timeout: number = 2000) {
    this.showAlert(message, AlertTypes.DANGER, timeout);
  }

  showAlertSuccess(message: string, timeout: number = 2000) {
    this.showAlert(message, AlertTypes.SUCCESS, timeout);
  }

  showConfirmModal(title: string, message: string, okMsg?: string, cancelMsg?: string) {
    const config = {
      initialState: {
        title,
        message,
        okMsg,
        cancelMsg
      }
    };
    const bsModalRef = this.modalService.show(ModalComponent, config);

    return (<ModalComponent>bsModalRef.content).confirmResult;

  }
}
