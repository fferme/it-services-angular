import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  declarations: [
    AlertModalComponent
  ],
  imports: [
    CommonModule,
    AlertModule.forRoot()
  ],
  exports: [AlertModalComponent]
})
export class SharedModule { }
