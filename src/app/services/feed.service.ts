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
    url = this.global.Server;
    emitFeeds() {
        this.feedsSubject.next(this.feeds.slice());
    }
    getFeedsFromServer() {
        const headers = new HttpHeaders()
            .set('authorization', 'Bearer ' + localStorage.getItem('token'));
        this.httpClient.get(this.url + 'feeds', {headers})
            .subscribe(
                (response: Feed[]) => {
                    this.feeds = response;
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
        return this.httpClient.get(this.url + 'feeds/' + slug, {headers});
    }

    commentFeed(body, entry_id) {
        const headers = new HttpHeaders()
            .set('authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.httpClient.put(this.url + 'comments', {body, entry_id}, {headers});
    }
    likeFeed(entry_id) {
        const headers = new HttpHeaders()
            .set('authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.httpClient.put(this.url + 'likes', {entry_id}, {headers});
    }

    addFeed(titre, contenu, type, youtube = null, image = null, video = null) {
        const headers = new HttpHeaders()
            .set('authorization', 'Bearer ' + localStorage.getItem('token'));
        const formData = new FormData();
        formData.append('title', titre);
        formData.append('description', contenu);
        formData.append('is_featured', '0');
        formData.append('medias[0][type]', type);
        switch (type) {
            case 'youtube': {
                formData.append('medias[0][path]', 'https://www.youtube.com/embed/' + youtube);
                break;
            }
            case 'video': {
                formData.append('medias[0][file]', video);
                break;
            }
            case 'image': {
                formData.append('medias[0][file]', image);
                break;
            }
        }
        return this.httpClient.post(this.url + 'feeds', formData, {
            headers,
            reportProgress: true,
            observe: 'events'
        });
    }

    deleteFeed(feed) {
        const headers = new HttpHeaders()
            .set('authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.httpClient.delete(this.url + 'feeds/' + feed.id, {headers});
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
