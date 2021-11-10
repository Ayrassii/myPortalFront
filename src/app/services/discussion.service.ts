import { Injectable } from '@angular/core';
import {Globals} from '../Globals';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Message} from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {
  url = this.global.Server;
  constructor(private global: Globals, private httpClient: HttpClient) { }

  getDiscussionsFromServer() {
    const headers = new HttpHeaders()
        .set('authorization', 'bearer ' + localStorage.getItem('token'));
    return this.httpClient.get(this.url + 'discussions', {headers});
  }

  getMessages(discussion_id) {
    const headers = new HttpHeaders()
        .set('authorization', 'bearer ' + localStorage.getItem('token'));
    return this.httpClient.get(this.url + 'messages/' + discussion_id, {headers});
  }

  sendMessage({content, receiver_id, discussion_id}) {
    const headers = new HttpHeaders()
        .set('authorization', 'bearer ' + localStorage.getItem('token'));
    return this.httpClient.post(this.url + 'messages/' + discussion_id, {content, receiver_id}, {headers});
  }

  createDiscussion(destination_id) {
    const headers = new HttpHeaders()
        .set('authorization', 'bearer ' + localStorage.getItem('token'));
    return this.httpClient.post(this.url + 'discussions', { destination_id }, {headers});
  }
}
