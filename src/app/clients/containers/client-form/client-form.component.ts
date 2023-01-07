import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ClientsService } from '../../services/clients.service';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../model/client';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent {
  form = this.formBuilder.group({
    _id: [''],
    name: [''],
    gender: ['M'],
    phoneNumber: [''],
    district: [''],
    reference: ['']
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private clientService: ClientsService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute) {
      const client: Client = this.route.snapshot.data['client'];
      this.form.setValue({
        _id: client._id,
        name: client.name,
        gender: client.gender,
        phoneNumber: client.phoneNumber,
        district: client.district,
        reference: client.reference
      });
  }

  onSubmit() {
    this.clientService.save(this.form.value).subscribe({
      next: (result) => this.onSucess(),
      error: (error) => this.onError()
    })
  }

  onCancel() {
    this.location.back();
  }

  private onSucess() {
    this._snackBar.open("Cliente salvo com sucesso!", '', {duration: 3000})
    this.onCancel();
  }

  private onError() {
    this._snackBar.open("Erro ao salvar cliente", '', {duration: 3000})
  }

}
