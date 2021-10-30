import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {Feed} from '../models/feed';
import { Globals } from '../Globals';
@Injectable({
    providedIn: 'root'
})
export class FeedService {
    feeds: Feed[] = [];
    feedsSubject = new Subject<Feed[]>();
    constructor(private httpClient: HttpClient, private router: Router, private global: Globals) { }
    url = this.global.Server + 'feeds';
    emitFeeds() {
        this.feedsSubject.next(this.feeds.slice());
    }
    getFeedsFromServer() {
        const headers = new HttpHeaders()
            .set('authorization', 'Bearer ' + localStorage.getItem('token'));
        this.httpClient.get(this.url, {headers})
            .subscribe(
                (response) => {
                    this.feeds = response['myfeeds'];
                    this.emitFeeds();
                },
                (err) => {
                    if (err.status === 401) {
                        this.router.navigate(['authentication/page-403']);
                    }
                }
            );
    }
    getSingleFeed(slug) {
        const headers = new HttpHeaders()
            .set('authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.httpClient.get(this.url + '/' + slug, {headers});
    }

    addFeed(feed) {
        const headers = new HttpHeaders()
            .set('authorization', 'Bearer ' + localStorage.getItem('token'));
        const formData = new FormData();
        formData.append('titre', feed.titre);
        if (feed.image && feed.image !== 'null') {
            formData.append('image', feed.image);
        }
        formData.append('contenu', feed.contenu);
        formData.append('type', feed.type);
        formData.append('slug', feed.slug);
        switch (feed.type) {
            case 'classes': {
                feed.classes.forEach(el => formData.append('classes[]', el));
                break;
            }
            case 'etudiants': {
                feed.etudiants.forEach(el => formData.append('users[]', el));
                break;
            }
            case 'professeurs': {
                feed.professeurs.forEach(el => formData.append('users[]', el));
                break;
            }
        }
        return this.httpClient.post(this.url, formData, {
            headers,
            reportProgress: true,
            observe: 'events'
        });
    }

    deleteFeed(feed) {
        const headers = new HttpHeaders()
            .set('authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.httpClient.delete(this.url + '/' + feed.slug, {headers});
    }

    editFeed(feed) {
        const headers = new HttpHeaders()
            .set('authorization', 'Bearer ' + localStorage.getItem('token'));
        const formData = new FormData();
        formData.append('titre', feed.titre);
        if (feed.image && feed.image !== 'null') {
            formData.append('image', feed.image);
        }
        formData.append('contenu', feed.contenu);
        formData.append('type', feed.type);
        formData.append('slug', feed.slug);
        switch (feed.type) {
            case 'classes': {
                feed.classes.forEach(el => formData.append('classes[]', el));
                break;
            }
            case 'etudiants': {
                feed.etudiants.forEach(el => formData.append('users[]', el));
                break;
            }
            case 'professeurs': {
                feed.professeurs.forEach(el => formData.append('users[]', el));
                break;
            }
        }
        return this.httpClient.post(this.url + '/' + feed.id, formData, {
            headers,
            reportProgress: true,
            observe: 'events'
        });
    }

}
