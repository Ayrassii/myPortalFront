import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Globals} from '../Globals';
import {Feed} from '../models/feed';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient: HttpClient, private router: Router, private global: Globals) { }
  url = this.global.Server + 'articles';

  getArticlesFromServer() {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.get(this.url, {headers});
  }

  getSingleArticle(id) {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.get(this.url + '/' + id, {headers});
  }

  commentArticle(body, entry_id) {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.put(this.url + 'comments', {body, entry_id}, {headers});
  }
  likeArticle(entry_id) {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.put(this.url + 'likes', {entry_id}, {headers});
  }
}
