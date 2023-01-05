import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { ClientFormComponent } from './containers/client-form/client-form.component';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './containers/clients/clients.component';
import { ClientsListComponent } from './components/clients-list/clients-list.component';

@NgModule({
    declarations: [
        ClientsComponent,
        ClientFormComponent,
        ClientsListComponent
    ],
    imports: [
        CommonModule,
        ClientsRoutingModule,
        AppMaterialModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class ClientsModule { }
