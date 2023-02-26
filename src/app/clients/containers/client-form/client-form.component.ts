import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, UntypedFormGroup } from '@angular/forms';

import { ClientsService } from '../../services/clients.service';
import { AuxiliarService } from '../../services/auxiliar.service';
import { AlertModalService } from 'src/app/shared/components/service/alert-modal.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})

export class ClientFormComponent {
  clientForm = this.formBuilder.group({
    name: [''],
    phoneNumber: [''],
    neighbourhood: [''],
    reference: ['']
  });

  selectedDDD: string = '21';
  text: string = '';

  constructor(
    private clientService: ClientsService,
    private auxiliarService: AuxiliarService,
    private location: Location,
    private formBuilder: NonNullableFormBuilder,
    private alertModalService: AlertModalService
  ) {
    this.clientService = clientService;
    this.location = location;
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
    const phoneNumber = this.clientForm.get('phoneNumber')?.value;
    const fullPhoneNumber = `${ddd}${phoneNumber}`;

    this.clientForm.patchValue({
      phoneNumber: fullPhoneNumber,
    });
  }
}
