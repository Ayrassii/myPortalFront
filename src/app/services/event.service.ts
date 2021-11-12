import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Globals} from '../Globals';

@Injectable({
	providedIn: 'root'
})
export class EventService {
	constructor(private httpClient: HttpClient, private router: Router, private global: Globals) { }
	url = this.global.Server;
	getEvents(start_date = null, end_date= null) {
		const headers = new HttpHeaders()
			.set('authorization', 'bearer ' + this.getToken());
		return this.httpClient.get(this.url + 'events', {headers});
	}
	getSingleEvent(event_id) {
		const headers = new HttpHeaders()
			.set('authorization', 'bearer ' + this.getToken());
		return this.httpClient.get(this.url + 'events/' + event_id, {headers});
	}
	commentEvent(body, entry_id) {
		const headers = new HttpHeaders()
			.set('authorization', 'Bearer ' + localStorage.getItem('token'));
		return this.httpClient.put(this.url + 'comments', {body, entry_id}, {headers});
	}
	likeEvent(entry_id) {
		const headers = new HttpHeaders()
			.set('authorization', 'Bearer ' + localStorage.getItem('token'));
		return this.httpClient.put(this.url + 'likes', {entry_id}, {headers});
	}
	addEvent(evenement) {
		const headers = new HttpHeaders()
			.set('authorization', 'Bearer ' + localStorage.getItem('token'));
		const formData = new FormData();
		formData.append('title', evenement.title);
		formData.append('description', evenement.description);
		formData.append('start_date', evenement.start_date);
		formData.append('end_date', evenement.end_date);
		formData.append('is_featured', '0');
		evenement.medias.forEach(
			(m, i) => {
				formData.append('medias[' + i + '][type]', m.type);
				if (m.type === 'youtube') {
					formData.append('medias[' + i + '][path]', 'https://www.youtube.com/embed/' + m.path);
				} else {
					formData.append('medias[' + i + '][file]', m.file);
				}
			});
		return this.httpClient.post(this.url + 'events', formData, {headers});
	}

	public getToken(): string {
		return localStorage.getItem('token');
	}
}
