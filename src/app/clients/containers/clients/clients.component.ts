import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, first, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Client } from '../../model/client';
import { ClientsService } from '../../services/clients.service';
import { AlertModalComponent } from '../../../shared/components/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/alert-modal-service.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  clients$: Observable<Client[]> | null = null;
  bsModalRef?: BsModalRef;

  constructor(
    private clientsService: ClientsService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private location: Location,
    private alertModalService: AlertModalService
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
    this.alertModalService.showAlertDanger("Erro ao carregar cursos. Tente novamente mais tarde.");
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
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     data: 'Tem certeza que deseja remover esse curso?',
  //   });

  //   dialogRef.afterClosed().subscribe((result: boolean) => {
  //     if (result) {
  //       this.coursesService.remove(course._id).subscribe(
  //         () => {
  //           this.refresh();
  //           this.snackBar.open('Curso removido com sucesso!', 'X', {
  //             duration: 5000,
  //             verticalPosition: 'top',
  //             horizontalPosition: 'center'
  //           });
  //         },
  //         () => this.onError('Erro ao tentar remover curso.')
  //       );
  //     }
  //   });
  }
}
