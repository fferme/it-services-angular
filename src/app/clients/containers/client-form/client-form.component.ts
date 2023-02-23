import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ChildrenOutletContexts } from '@angular/router';
import { AlertModalService } from 'src/app/shared/alert-modal-service.service';

import { Client } from '../../model/client';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent {

  clientForm: FormGroup;

  constructor(
    private clientService: ClientsService,
    private location: Location,
    private formBuilder: FormBuilder,
    private alertModalService: AlertModalService
    ) {
    this.clientService = clientService;
    this.location = location;
    this.clientForm = this.formBuilder.group({
      name: [null],
      gender: [null],
      phoneNumber: [null],
      neighbourhood: [null],
      reference: [null]
    });
  }

  onSubmit() {
    this.clientService.save(this.clientForm.value).subscribe({
      next: (result) => this.onSucess(),
      error: (error) => this.onError()
    })
  }
  onBack() {
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }

  private onSucess() {
    this.alertModalService.showAlertSuccess("Cliente salvo com sucesso!", 5000);
    console.log(this.clientForm.value);
    this.onBack();
  }

  private onError() {
  }

}
