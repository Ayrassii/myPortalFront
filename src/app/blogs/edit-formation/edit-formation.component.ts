import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Niveau} from '../../models/niveau';
import {SidebarService} from '../../services/sidebar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {FormationService} from '../../services/formation.service';
import {NiveauService} from '../../services/niveau.service';
import {requiredFileType} from '../../../shared/requiredfiletype';
import {filter, map, tap} from 'rxjs/operators';
import {HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
import {pipe} from 'rxjs';
import {Formation} from '../../models/formation';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


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
  selector: 'app-edit-formation',
  templateUrl: './edit-formation.component.html',
  styleUrls: ['./edit-formation.component.css']
})
export class EditFormationComponent implements OnInit {
  resteparties = [];
  formation: Formation;
  progress = 0;
  slug: string;
  srcs =  [];
  nbr_parties = 0;
  selectedpartie;
  editForm: FormGroup;
  loading = true;
  public sidebarVisible = true;
  niveaux: Niveau[];
  constructor(private sidebarService: SidebarService,
              private cdr: ChangeDetectorRef,
              private router: Router,
              private modalService: NgbModal,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private sanitizer: DomSanitizer,
              private formationService: FormationService,
              private niveauService: NiveauService) { }

  ngOnInit() {
    this.niveauService.getNiveaux().subscribe(
        (res) => {
          this.niveaux = res['niveaux'];
        }
    );
    this.formationService.getSingleFormation(this.route.snapshot.params.slug).subscribe(
        (res) => {
          this.formation = res['formation'];
          for (let i = 1 ; i < 11 - this.formation.partieformations.length ; i++) {
            this.resteparties.push({'texte': i + ' partie(s)'});
          }
          this.initEditForm(this.formation);
          this.slug = this.route.snapshot.params.slug;
          this.loading = false;
        }
    );
  }

  toggleFullWidth() {
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    this.cdr.detectChanges();
  }

  initEditForm(formation: Formation) {
    this.editForm = this.formBuilder.group(
        {
          titre: [formation.titre, [Validators.required, Validators.minLength(5)]],
          description: [formation.description, [Validators.required, Validators.minLength(10)]],
          image: [null, [requiredFileType(['png', 'jpg'])]],
          niveau_id: [formation.niveau.id, [Validators.required]],
          parties: new FormArray([]),
          nbr_parties: [0, [Validators.min(0), Validators.max(10 - formation.partieformations.length)]],
        }
    );
  }

  getformArray() { return <FormArray>this.editForm.get('parties'); }

  Genererpartiesform() {
    this.srcs = [];
    this.nbr_parties = parseInt(this.editForm.get('nbr_parties').value, 10);
    const parties = this.editForm.controls.parties as FormArray;
    parties.clear();
    for (let i = 0 ; i < this.nbr_parties ; i++) {
      parties.push(this.formBuilder.group({
        titrepartie: ['', [Validators.required, Validators.minLength(5)]],
        videopartie: [null, [Validators.required, requiredFileType(['mp4', 'avi'])]]
      }));
    }
  }

  onEditSubmit(value) {
    value.slug = this.slug;
    value.id = this.formation.id;
    console.log(value);
    this.formationService.edit(value).pipe(
        uploadProgress(progress => (this.progress = progress)),
        toResponseBody()
    ).subscribe(() => this.router.navigate(['/app/formations']));
  }

  readVideoUrl(event: any, indice) {
    const files = event.target.files;
    if (files && files[0]) {
      this.srcs.push({
        'indice': indice,
        'src': this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(files[0]))
      });
    }
  }

  findsrc(indice: number): string {
    return this.srcs.find(
        (el) => el.indice === indice
    ) ? this.srcs.find(
        (el) => el.indice === indice
    ).src : '';
  }

  genslug() {
    const formationTitle = this.editForm.get('titre').value.toLowerCase();
    this.slug = formationTitle.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toLowerCase();
    console.log(this.slug);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  openModal(content, size, partie) {
    this.selectedpartie = partie;
    this.modalService.open(content, { size: size });
  }

  deletePartie() {
    this.formationService.deletePartie(this.selectedpartie).subscribe(
        (res) => {
          this.formation.partieformations = res['parties'];
          this.modalService.dismissAll();
        }
    );

  }
}
