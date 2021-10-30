import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Case} from '../models/case';
import {Subject} from 'rxjs';
import {Seance} from '../models/seance';
import {Jour} from '../models/jour';
import { Globals } from '../Globals';
@Injectable({
    providedIn: 'root'
})
export class EmploiService {
    cases: Case[] = [];
    jours: Jour[] = [];
    seances: Seance[] = [];
    casesSubject = new Subject<Case[]>();
    constructor(private httpClient: HttpClient, private router: Router, private global: Globals) { }
    url = this.global.Server;
    emitCases() {
        this.casesSubject.next(this.cases.slice());
    }
    getCasesFromServer() {
        const headers = new HttpHeaders()
            .set('authorization', 'Bearer ' + localStorage.getItem('token'));
        this.httpClient.get(this.url + 'schedule', {headers})
            .subscribe(
                (response) => {
                    this.cases = response['cases'];
                    this.jours = response['jours'];
                    this.seances = response['seances'];
                    this.emitCases();
                },
                (err) => {
                    if (err.status === 401) {
                        this.router.navigate(['authentication/page-403']);
                    }
                }
            );
    }
    getEmploisFromServer() {
        const headers = new HttpHeaders()
            .set('authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.httpClient.get(this.url + 'schedules', {headers});
    }
    getOneEmploi(classe, debut, fin) {
        const headers = new HttpHeaders()
            .set('authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.httpClient.post(this.url + 'oneschedule', {classe, debut, fin}, {headers});
    }

    getEmploiPDF(semaine, debut, fin) {
        const headers = new HttpHeaders()
            .set('authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.httpClient.post(this.url + 'schedulePDF', {semaine, debut, fin}, {
            headers : headers,
            responseType: 'blob'
        });
    }
}
