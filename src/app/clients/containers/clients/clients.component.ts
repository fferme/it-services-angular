import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
export class ClientsComponent {
  clients$: Observable<Client[]> | null = null;

  constructor(
    private clientsService: ClientsService,
    public dialog: MatDialog,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private location: Location,
    private snackBar: MatSnackBar
    ) {
    this.refresh();
  }

  refresh() {
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
    this.clientsService.delete(client._id).subscribe({
      next: (result) => {
        this.refresh();
        this.snackBar.open("Cliente removido com sucesso!", 'X', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        })
      },
      error: (error) => this.onError("Erro ao tentar remover curso")
    });
  }

}
