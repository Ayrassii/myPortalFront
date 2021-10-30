import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Notif} from '../models/notif';
import {Observable} from 'rxjs';
import { Globals } from '../Globals';
@Injectable({
  providedIn: 'root'
})
export class NotifService {
  url = this.global.Server + 'notifs';
  constructor(private httpClient: HttpClient, private global: Globals) { }
  getNotifs(): Observable<Notif[]> {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.get<Notif[]>(this.url, {headers});
  }

  allRead() {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.patch(this.url, [], {headers});
  }

  deleteNotif(id: string) {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.delete(this.url + '/' + id, {headers});
  }

  deleteAll() {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.delete(this.url, {headers});
  }
}
