import { ClientsComponent } from './containers/clients/clients.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientFormComponent } from './containers/client-form/client-form.component';

const routes: Routes = [
  { path: '', component: ClientsComponent },
  { path: 'new', component: ClientFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
