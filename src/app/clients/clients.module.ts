import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './containers/clients/clients.component';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { ClientFormComponent } from './containers/client-form/client-form.component';

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
        ReactiveFormsModule
    ]
})
export class ClientsModule { }
