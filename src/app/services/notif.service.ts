import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Notif} from '../models/notif';
import {Observable} from 'rxjs';
import { Globals } from '../Globals';
@Injectable({
  providedIn: 'root'
})
export class NotifService {
  url = this.global.Server;
  constructor(private httpClient: HttpClient, private global: Globals) { }

  getNotifs() {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.get(this.url + 'lastnotifs', {headers});
  }

  getNotifications() {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.get(this.url + 'notifications', {headers});
  }

  readNotif(notif_id) {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.put(this.url + 'notifications/' + notif_id, [], {headers});
  }

  allRead() {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.patch(this.url + 'notifications', [], {headers});
  }

  deleteNotif(id: string) {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.delete(this.url + 'notifications/' + id, {headers});
  }

  deleteAll() {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.delete(this.url + 'notifications', {headers});
  }
}
