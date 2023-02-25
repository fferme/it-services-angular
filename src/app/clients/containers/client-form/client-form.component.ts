import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal-service.service';

import { ClientsService } from '../../services/clients.service';
import { AuxiliarService } from '../../services/auxiliar.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent {

  clientForm: FormGroup;

  selectedDDD: any = 21;
  filteredDDDs: string[] = this.auxiliarService.getDDDs();
  text: string = "";

  constructor(
    private clientService: ClientsService,
    private auxiliarService: AuxiliarService,
    private location: Location,
    private formBuilder: FormBuilder,
    private alertModalService: AlertModalService
    ) {
    this.clientService = clientService;
    this.location = location;
    this.clientForm = this.formBuilder.group({
      name: [null],
      phoneNumber: [null],
      neighbourhood: [null],
      reference: [null]
    });
  }

  onSubmit() {
    this.getFullPhoneNumber();
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
    this.alertModalService.showAlertSuccess("Cliente salvo com sucesso!", 3000);
    console.log(this.clientForm.value);
    this.onBack();
  }

  private onError() {
  }

  getFullPhoneNumber() {
    const ddd = this.selectedDDD;
    const phoneNumber = this.clientForm.get('phoneNumber')?.value;
    const fullPhoneNumber = `${ddd}${phoneNumber}`;

    this.clientForm.patchValue({
      phoneNumber: fullPhoneNumber
    });
  }

  filterDDDs(input: any) {
    this.text = input.target.value
    this.filteredDDDs = this.filteredDDDs.filter(ddd => ddd.startsWith(this.text));
  }

}
