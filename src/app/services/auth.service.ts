import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {Notif} from '../models/notif';
import {Globals} from '../Globals';
import {Feed} from '../models/feed';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user: User;
    classmates: User[] = [];
    birthdays: User[] = [];
    classmatesSubject = new Subject<User[]>();
    birthdaysSubject = new Subject<User[]>();
    constructor(private httpClient: HttpClient, private router: Router, private global: Globals) { }
    url = this.global.Server;

    emitClassmates() {
        this.classmatesSubject.next(this.classmates.slice());
    }
    emitBirthdays() {
        this.birthdaysSubject.next(this.birthdays.slice());
    }
    signinUser(email: string, password: string) {
        return this.httpClient.post(this.url + 'login', {email, password});
    }

    getUsers() {
        const headers = new HttpHeaders()
            .set('authorization', 'bearer ' + this.getToken());
        return this.httpClient.get(this.url + 'users', {headers});
    }

    Me() {
        const headers = new HttpHeaders()
            .set('authorization', 'bearer ' + this.getToken());
        return this.httpClient.get(this.url + 'me', {headers});
    }
    
    profile(cin) {
        const headers = new HttpHeaders()
            .set('authorization', 'bearer ' + this.getToken());
        return this.httpClient.get(this.url + 'users/' + cin , {headers});
    }
    forgot(mail: string) {
        return this.httpClient.post(this.url + 'auth/forgotpassword', {'email': mail});
    }

    reset(credentials) {
        return this.httpClient.post(this.url + 'auth/resetpassword', credentials);
    }

    logoutUser() {
        if (localStorage.getItem('token')) {
            const headers = new HttpHeaders()
                .set('authorization', 'bearer ' + this.getToken());
            return this.httpClient.post(this.url + 'logout', [], {headers}).subscribe(
                () => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('date-login');
                    localStorage.removeItem('role');
                    localStorage.removeItem('cin');
                    this.router.navigate(['authentication', 'page-login']);
                }
            );
        }
        localStorage.removeItem('token');
        localStorage.removeItem('date-login');
        localStorage.removeItem('role');
        localStorage.removeItem('cin');
        this.router.navigate(['authentication', 'page-login']);
    }

    getEmployeOfMonth() {
        const headers = new HttpHeaders()
            .set('authorization', 'bearer ' + this.getToken());
        return this.httpClient.get(this.url + 'employe-of-month', {headers});
    }
    public getToken(): string {
        return localStorage.getItem('token');
    }
    public getdateLogin(): Date {
        return new Date(parseInt(localStorage.getItem('date-login'), 10));
    }

    getNotifs() {
        const headers = new HttpHeaders()
            .set('authorization', 'bearer ' + this.getToken());
        return this.httpClient.get(this.url + 'lastnotifs', {headers});
    }

    changePassword(password, new_password, new_password_confirmation) {
        const headers = new HttpHeaders()
            .set('authorization', 'bearer ' + this.getToken());
        return this.httpClient.put(this.url + 'change-password', {password, new_password, new_password_confirmation}, {headers});
    }

    getUpcomingBirthdays() {
        const headers = new HttpHeaders()
            .set('authorization', 'Bearer ' + localStorage.getItem('token'));
        this.httpClient.get(this.url + 'upcoming-birthdays', {headers})
            .subscribe(
                (response: User[]) => {
                    this.birthdays = response;
                    this.emitBirthdays();
                },
                (err) => {
                    if (err.status === 401) {
                        this.router.navigate(['authentication/page-403']);
                    }
                }
            );
    }
}
