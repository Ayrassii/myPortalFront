import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { Globals } from '../Globals';
import {Partieformation} from '../models/partieformation';
@Injectable({
  providedIn: 'root'
})
export class FormationService {
  url = this.global.Server + 'formations';
  constructor(private httpClient: HttpClient,
              private router: Router, private global: Globals) { }
  getFormations() {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.get(this.url, {headers});
  }

  getSingleFormation(slug: string) {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.get(this.url + '/' + slug, {headers});
  }

  add(formation) {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    const formData = new FormData();
    formData.append('titre', formation.titre);
    formData.append('slug', formation.slug);
    if (formation.image && formation.image !== 'null') {
      formData.append('image', formation.image);
    }
    formData.append('description', formation.description);
    formData.append('niveau_id', formation.niveau_id);
    formation.parties.forEach((el, index) => {
      formData.append('parties[' + (index + 1) + '][titre]', el.titrepartie);
      formData.append('parties[' + (index + 1) + '][video]', el.videopartie);
    });
    return this.httpClient.post(this.url, formData, {
      headers,
      reportProgress: true,
      observe: 'events'
    });
  }
  edit(formation) {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    const formData = new FormData();
    formData.append('titre', formation.titre);
    formData.append('slug', formation.slug);
    if (formation.image && formation.image !== 'null') {
      formData.append('image', formation.image);
    }
    formData.append('description', formation.description);
    formData.append('niveau_id', formation.niveau_id);
    formation.parties.forEach((el, index) => {
      formData.append('parties[' + (index + 1) + '][titre]', el.titrepartie);
      formData.append('parties[' + (index + 1) + '][video]', el.videopartie);
    });
    return this.httpClient.post(this.url + '/edit/' + formation.id, formData, {
      headers,
      reportProgress: true,
      observe: 'events'
    });
  }

  progressEtudiant(partieformation, progress, duration) {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.put(this.url, {'partie': partieformation, 'time': duration, 'progress': progress }, {headers});
  }

  deleteFormation(slug: string) {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.delete(this.url + '/' + slug, {headers});
  }
  deletePartie(partie: Partieformation) {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.delete(this.url + '/deletepartie/' + partie.uuid, {headers});
  }
}
