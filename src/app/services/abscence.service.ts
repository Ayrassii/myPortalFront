import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { Globals } from '../Globals';
@Injectable({
  providedIn: 'root'
})
export class AbscenceService {
  url = this.global.Server + 'abscences';
  constructor(private httpClient: HttpClient,
              private router: Router, private global: Globals) { }
  getAbscences() {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.get(this.url, {headers});
  }
}
