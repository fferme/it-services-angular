import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, first, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Client } from '../../model/client';
import { ClientsService } from '../../services/clients.service';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients$: Observable<Client[]>;

  constructor(
    private clientsService: ClientsService,
    public dialog: MatDialog,
    private router: Router,
    private activeRoute: ActivatedRoute
    ) {
    this.clients$ = this.clientsService.list()
    .pipe(
      first(),
      catchError(error => {
        this.onError('Erro ao carregar cursos.');
        console.log(error);
        return of([])
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }
  ngOnInit(): void {

  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.activeRoute} );
  }

}
