import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertModule } from 'ngx-bootstrap/alert';
import { AlertComponent } from './components/alert/alert.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AlertComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    AlertModule.forRoot()
  ],
  exports: [AlertComponent, ModalComponent]
})
export class SharedModule { }
