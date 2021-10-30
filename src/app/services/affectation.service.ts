import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Devoir} from '../models/devoir';
import {Affectation} from '../models/affectation';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import { Globals } from '../Globals';
@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  affectations: Affectation[] = [];
  affectationsSubject = new Subject<Affectation[]>();
  constructor(private httpClient: HttpClient,
              private router: Router, private global: Globals) { }

  url = this.global.Server + 'affectations';


  emitAffectations() {
    this.affectationsSubject.next(this.affectations.slice());
  }

  getAffectationFromServer() {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    this.httpClient.get(this.url, {headers})
        .subscribe(
            (response) => {
              this.affectations = response['affectations'];
              this.emitAffectations();
            },
            (err) => {
              if (err.status === 401) {
                this.router.navigate(['authentication/page-403']);
              }
            }
        );
  }
}
