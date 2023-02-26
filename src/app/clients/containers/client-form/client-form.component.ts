import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/components/service/alert-modal.service';

import { ClientsService } from '../../services/clients.service';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../model/client';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})

export class ClientFormComponent implements OnInit {
  selectedDDD: string = '21';
  text: string = '';

  clientForm = this.formBuilder.group({
    name: [''],
    phoneNumber: [''],
    neighbourhood: [''],
    reference: ['']
  });

  constructor(
    private clientService: ClientsService,
    private location: Location,
    private formBuilder: NonNullableFormBuilder,
    private alertModalService: AlertModalService,
    private route: ActivatedRoute
  ) {
    this.clientService = clientService;
    this.location = location;
  }

  ngOnInit(): void {
    const client: Client = this.route.snapshot.data['client'];
    this.selectedDDD = client.phoneNumber.slice(0, 2);
    const trimmedPhoneNumber: string = client.phoneNumber.slice(2);

    this.clientForm.setValue({
      name: client.name,
      phoneNumber: trimmedPhoneNumber,
      neighbourhood: client.neighbourhood,
      reference: client.reference
    })
  }

  onSubmit() {
    this.getFullPhoneNumber();
    this.clientService.save(this.clientForm.value).subscribe({
      next: (result) => this.onSucess(),
      error: (error) => this.onError(),
    });
  }

  onBack() {
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }

  private onSucess() {
    this.alertModalService.showAlertSuccess('Cliente salvo com sucesso!', 3000);
    console.log(this.clientForm.value);
    this.onBack();
  }

  private onError() { }

  getFullPhoneNumber() {
    const ddd = this.selectedDDD;
    console.log(ddd);
    const phoneNumber = this.clientForm.get('phoneNumber')?.value;
    console.log(phoneNumber);
    const fullPhoneNumber = `${ddd}${phoneNumber}`;
    console.log(fullPhoneNumber);

    this.clientForm.patchValue({
      phoneNumber: fullPhoneNumber,
    });
  }

}
