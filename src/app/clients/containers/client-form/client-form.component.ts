import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ChildrenOutletContexts } from '@angular/router';

import { Client } from '../../model/client';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent {

  public clientForm!: FormGroup;

  constructor(private clientService: ClientsService,
    private location: Location,
    private route: ActivatedRoute) {
      this.clientForm = new FormGroup({
        _id: new FormControl(null, [Validators.required]),
        name: new FormControl(null, [Validators.required]),
        gender: new FormControl(null, [Validators.required]),
        phoneNumber: new FormControl(null ,[Validators.required]),
        neighbourhood: new FormControl(null, [Validators.required]),
        reference: new FormControl(null, [Validators.required])
      })

      const client: Client = this.route.snapshot.data['client'];
      if (!client.phoneNumber) {
        client.phoneNumber = '21';
      }

      if (!client.gender) {
        client.gender = 'M';
      }
      this.clientForm.setValue({
        _id: client._id,
        name: client.name,
        gender: client.gender,
        phoneNumber: client.phoneNumber,
        neighbourhood: client.neighbourhood,
        reference: client.reference
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
    this.onCancel();
  }

  private onError() {
  }

}
