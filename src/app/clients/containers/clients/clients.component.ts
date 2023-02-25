import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { catchError, EMPTY, first, of, switchMap, take } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AlertModalService } from 'src/app/shared/components/service/alert-modal.service';
import { Client } from '../../model/client';
import { AuxiliarService } from '../../services/auxiliar.service';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent {
  clients$: Observable<Client[]> | null = null;

  bsModalRef?: BsModalRef;
  deleteModalRef?: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;

  constructor(
    private clientsService: ClientsService,
    private auxiliarService: AuxiliarService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private location: Location,
    private alertModalService: AlertModalService
  ) {
    this.refresh();
  }

  refresh() {
    this.clients$ = this.clientsService.list().pipe(
      first(),
      catchError((error) => {
        this.onError('Erro ao carregar cursos.');
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.alertModalService.showAlertDanger(
      'Erro ao carregar cursos. Tente novamente mais tarde.'
    );
  }

  onBack() {
    this.location.back();
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.activeRoute });
  }

  onEdit(client: Client) {
    this.router.navigate(['edit', client._id], {
      relativeTo: this.activeRoute,
    });
  }

  onDelete(client: Client) {
    const result$ = this.alertModalService.showConfirmModal(
      'Confirmação',
      'Tem certeza que deseja excluir esse cliente?',
      'Sim',
      'Não'
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result ? this.clientsService.delete(client._id) : EMPTY
        )
      )
      .subscribe({
        next: () => {
          this.refresh();
          this.alertModalService.showAlertSuccess('Cliente deletado!', 1000);
        },
        error: () => {
          this.alertModalService.showAlertDanger('Erro ao deletar', 1000);
        },
      });
  }
}
