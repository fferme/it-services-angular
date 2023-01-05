import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Client } from '../../model/client';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit{

  @Input() clients: Client[] = [];
  @Output() add = new EventEmitter(false);

  readonly displayedColumns = ['actions', 'name', 'gender', 'phoneNumber', 'district', 'reference'];

  constructor() {

  }

  ngOnInit(): void {

  }

  onAdd() {
    this.add.emit(true);
  }
}
