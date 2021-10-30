import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Devoir} from '../models/devoir';
import {Affectation} from '../models/affectation';
import { Globals } from '../Globals';
@Injectable({
    providedIn: 'root'
})
export class DevoirService {
    devoirs: Devoir[] = [];
    devoirsSubject = new Subject<Devoir[]>();
    constructor(private httpClient: HttpClient, private router: Router, private global: Globals) { }
    url = this.global.Server;
    emitDevoirs() {
        this.devoirsSubject.next(this.devoirs.slice());
    }

    getDevoirsFromServer() {
        const headers = new HttpHeaders()
            .set('authorization', 'Bearer ' + localStorage.getItem('token'));
        this.httpClient.get(this.url + 'exams', {headers})
            .subscribe(
                (response) => {
                    this.devoirs = response['devoirs'];
                    this.emitDevoirs();
                },
                (err) => {
                    if (err.status === 401) {
                        this.router.navigate(['authentication/page-403']);
                    }
                }
            );
    }
    add(devoir: Devoir) {
        const headers = new HttpHeaders()
            .set('authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.httpClient.post(this.url + 'exams', devoir, {headers});
    }

    delete(id) {
        const headers = new HttpHeaders()
            .set('authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.httpClient.delete(this.url + 'exams' + '/' + id, {headers});
    }
    update(evennement) {
        const headers = new HttpHeaders()
            .set('authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.httpClient.put(this.url + 'exams' + '/' + evennement.event.id, {'date' : evennement.event.start}, {headers});
    }
    getDevoirsForProfesseur() {
        const headers = new HttpHeaders()
            .set('authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.httpClient.get(this.url + 'examsforprofs', {headers});
    }
}
