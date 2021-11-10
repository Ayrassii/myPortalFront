import { Injectable } from '@angular/core';
import { Globals } from '../Globals';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class AnnuaireService {
  url = this.global.Server + 'annuary';
  constructor(private global: Globals, private httpClient: HttpClient) { }

  getAnnuaireFromServer() {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.get(this.url, {headers});
  }
}
