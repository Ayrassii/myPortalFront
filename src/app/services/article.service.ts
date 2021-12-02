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

  addArticle(article) {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    const formData = new FormData();
    formData.append('title', article.title);
    formData.append('content', article.content);
    formData.append('is_featured', '0');
    article.medias.forEach(
        (m, i) => {
          formData.append('medias[' + i + '][type]', m.type);
          if (m.type === 'youtube') {
            formData.append('medias[' + i + '][path]', 'https://www.youtube.com/embed/' + m.path);
          } else {
            formData.append('medias[' + i + '][file]', m.file);
          }
        });
    return this.httpClient.post(this.url, formData, {headers});
  }

  commentArticle(body, entry_id) {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.put(this.url + 'comments', {body, entry_id}, {headers});
  }
  deleteArticle(article) {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.delete(this.url  + '/' + article.id, {headers});
  }
  likeArticle(entry_id) {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.put(this.url + 'likes', {entry_id}, {headers});
  }
}
