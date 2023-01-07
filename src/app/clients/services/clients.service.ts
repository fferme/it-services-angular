import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';

import { Client } from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private readonly API = 'api/clients'

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Client[]>(this.API)
    .pipe(
      first()

    );
  }

  save(client: Partial<Client>) {
    return this.httpClient.post<Client>(this.API, client)
    .pipe(first());
  }

  loadById(id: string) {
    return this.httpClient.get<Client>(`${this.API}/${id}`);
  }
}
