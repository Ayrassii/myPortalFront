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

  addAnnuaire(annuaire) {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    const formData = new FormData();
    formData.append('full_name', annuaire.full_name);
    formData.append('phone', annuaire.phone);
    formData.append('email', annuaire.email);
    formData.append('image', annuaire.image);
    return this.httpClient.post(this.url, formData, {headers});
  }
}
