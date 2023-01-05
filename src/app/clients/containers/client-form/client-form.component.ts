import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent {
  form = this.formBuilder.group({
    name: [''],
    gender: [''],
    phoneNumber: [''],
    district: [''],
    reference: ['']
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private clientService: ClientsService,
    private _snackBar: MatSnackBar,
    private location: Location) {
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
    this._snackBar.open("Erro ao salvar curso", '', {duration: 3000})
  }

}
