import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { Globals } from '../Globals';


@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  url = this.global.Server + 'etudiants';
  constructor(private httpClient: HttpClient,
              private router: Router,
              private global: Globals) { }

  getEtudiantsFromServer() {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.get(this.url, {headers});
  }

  getEtudiantsByNiveau(niveau_id) {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.get(this.url + '/niveau/' + niveau_id, {headers});
  }
}
