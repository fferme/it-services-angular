import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { ClientFormComponent } from './containers/client-form/client-form.component';
import { ClientsComponent } from './containers/clients/clients.component';

@NgModule({
    declarations: [
        ClientsComponent,
        ClientFormComponent,
        ClientsListComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        ClientsRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class ClientsModule { }
