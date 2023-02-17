import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, first, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Client } from '../../model/client';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  clients$: Observable<Client[]> | null = null;

  constructor(
    private clientsService: ClientsService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private location: Location,
    ) {
    this.refresh();
  }

  refresh() {
    this.clients$ = this.clientsService.list()
    .pipe(
      first(),
      catchError(error => {
        this.onError('Erro ao carregar cursos.');
        return of([])
      })
    );
  }

  onError(errorMsg: string) {
  }

  onBack() {
    this.location.back();
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.activeRoute} );
  }

  onEdit(client: Client) {
    this.router.navigate(['edit', client._id], {relativeTo: this.activeRoute} );
  }

  onDelete(client: Client) {
  }
}
