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

	public getToken(): string {
		return localStorage.getItem('token');
	}
}
