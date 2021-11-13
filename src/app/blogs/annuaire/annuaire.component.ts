import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SidebarService} from '../../services/sidebar.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {DemandeService} from '../../services/demande.service';
import {Globals} from '../../Globals';
import {AnnuaireService} from '../../services/annuaire.service';
import {Person} from '../../models/person';
import {FileUploadComponent} from '../file-upload/file-upload.component';
import {filter, map, tap} from 'rxjs/operators';
import {HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
import {pipe} from 'rxjs';
import {requiredFileType} from '../../../shared/requiredfiletype';
import {Feed} from '../../models/feed';

export function uploadProgress<T>( cb: ( progress: number ) => void ) {
  return tap(( event: HttpEvent<T> ) => {
    if ( event.type === HttpEventType.UploadProgress ) {
      cb(Math.round((100 * event.loaded) / event.total));
    }
  });
}

export function toResponseBody<T>() {
  return pipe(
      filter(( event: HttpEvent<T> ) => event.type === HttpEventType.Response),
      map(( res: HttpResponse<T> ) => res.body)
  );
}
@Component({
  selector: 'app-annuaire',
  templateUrl: './annuaire.component.html',
  styleUrls: ['./annuaire.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: FileUploadComponent,
    multi: false
  }]
})
export class AnnuaireComponent implements OnInit {
  progress = 0;
  annuaireForm: FormGroup;
  public sidebarVisible = true;
  showAddAnnuaire = false;
  persons: Person[] = [];

  constructor(
      private sidebarService: SidebarService,
      private cdr: ChangeDetectorRef,
      private formBuilder: FormBuilder,
      private global: Globals,
      private annuaireService: AnnuaireService,
  ) {
  }
  toggleFullWidth() {
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    this.cdr.detectChanges();
  }
  ngOnInit() {
    this.annuaireService.getAnnuaireFromServer().subscribe(
        (res: Person[]) => {
          this.persons = res;
        }
    );
    this.initAnnuaireForm();
  }

  initAnnuaireForm() {
    this.annuaireForm = this.formBuilder.group(
        {
          full_name: ['', [Validators.required, Validators.minLength(2)]],
          email: ['', [Validators.required, Validators.email]],
          phone: ['', [Validators.pattern('^[0-9]*$'), Validators.minLength(8), Validators.maxLength(8)]],
          image: [null, [requiredFileType(['png', 'jpg'])]]
        }
    );
  }

  onAnnuaireSubmit(annuaire) {
    this.annuaireService.addAnnuaire(annuaire).subscribe(
        (res: Person[]) => {
          this.progress = 0;
          this.persons = res;
          console.log(res);
          this.initAnnuaireForm();
          this.showAddAnnuaire = false;
        }
    );
  }

  getPersonMedia(path) {
    return this.global.Medias + 'people/' + path;
  }

    getRole(): string {
        return localStorage.getItem('role');
    }

}
