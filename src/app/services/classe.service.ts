import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { Globals } from '../Globals';
@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  url = this.global.Server + 'classes';
  constructor(private httpClient: HttpClient,
              private router: Router, private global: Globals) { }

  getClassesFromServer() {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.get(this.url, {headers});
  }
}
