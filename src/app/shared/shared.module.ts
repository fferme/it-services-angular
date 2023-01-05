import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { GeneralIconsPipe } from './pipes/general-icons.pipe';

@NgModule({
  declarations: [
    ErrorDialogComponent,
    GeneralIconsPipe
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    ErrorDialogComponent,
    GeneralIconsPipe
  ]
})
export class SharedModule { }
