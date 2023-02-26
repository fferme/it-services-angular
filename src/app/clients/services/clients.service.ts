import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';

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
      first(),
      tap(clients => console.log(clients))
    );
  }

  loadById(id: string) {
    return this.httpClient.get<Client>(`${this.API}/${id}`);
  }

  save(client: Partial<Client>) {
    console.log(client);
    if (client._id) {
      console.log(client);
      return this.update(client);
    }
    return this.create(client);
  }

  private create(client: Partial<Client>) {
    return this.httpClient.post<Client>(this.API, client)
    .pipe(first());
  }

  private update(client: Partial<Client>) {
    return this.httpClient.put<Client>(`${this.API}/${client._id}`, client)
    .pipe(first());
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`)
    .pipe(first());
  }
}
