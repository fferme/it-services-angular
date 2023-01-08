import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { Client } from '../../model/client';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent {

  public clientForm!: FormGroup;

  constructor(
    private clientService: ClientsService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute) {
      this.clientForm = new FormGroup({
        _id: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        gender: new FormControl('', [Validators.required]),
        phoneNumber: new FormControl('', [Validators.required]),
        district: new FormControl('', [Validators.required]),
        reference: new FormControl('', [Validators.required])
      })

      const client: Client = this.route.snapshot.data['client'];
      this.clientForm.setValue({
        _id: client._id,
        name: client.name,
        gender: client.gender,
        phoneNumber: client.phoneNumber,
        district: client.district,
        reference: client.reference
      });

  }

  onSubmit() {
    this.clientService.save(this.clientForm.value).subscribe({
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
