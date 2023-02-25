import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() type: string = 'sucess';
  @Input() message: string = '';
  @Input() timeout: number = 2000;

  constructor(public bsModalRef: BsModalRef) {

  }

  onClose() {
    this.bsModalRef.hide();
  }


}
