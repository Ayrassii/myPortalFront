import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SidebarService} from '../../services/sidebar.service';
import {Router} from '@angular/router';
import {NiveauService} from '../../services/niveau.service';
import {Niveau} from '../../models/niveau';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {requiredFileType} from '../../../shared/requiredfiletype';
import {filter, map, tap} from 'rxjs/operators';
import {HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
import {pipe} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';
import {FormationService} from '../../services/formation.service';

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
    selector: 'app-ajout-formation',
    templateUrl: './ajout-formation.component.html',
    styleUrls: ['./ajout-formation.component.css']
})
export class AjoutFormationComponent implements OnInit {
    progress = 0;
    slug: string;
    srcs =  [];
    nbr_parties = 0;
    progressimage = 0;
    formationForm: FormGroup;
    loading = true;
    public sidebarVisible = true;
    niveaux: Niveau[];
    constructor(private sidebarService: SidebarService,
                private cdr: ChangeDetectorRef,
                private router: Router,
                private formBuilder: FormBuilder,
                private sanitizer: DomSanitizer,
                private formationService: FormationService,
                private niveauService: NiveauService) { }

    ngOnInit() {
        this.initFormationForm();
        this.niveauService.getNiveaux().subscribe(
            (res) => {
                this.niveaux = res['niveaux'];
                this.loading = false;
            }
        );
    }

    toggleFullWidth() {
        this.sidebarService.toggle();
        this.sidebarVisible = this.sidebarService.getStatus();
        this.cdr.detectChanges();
    }

    initFormationForm() {
        this.formationForm = this.formBuilder.group(
            {
                titre: ['', [Validators.required, Validators.minLength(5)]],
                description: ['', [Validators.required, Validators.minLength(10)]],
                image: [null, [requiredFileType(['png', 'jpg'])]],
                niveau_id: ['', [Validators.required]],
                parties: new FormArray([]),
                nbr_parties: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
            }
        );
    }

    getformArray() { return <FormArray>this.formationForm.get('parties'); }
    Genererpartiesform() {
        this.srcs = [];
        this.nbr_parties = parseInt(this.formationForm.get('nbr_parties').value, 10);
        const parties = this.formationForm.controls.parties as FormArray;
        parties.clear();
        for (let i = 0 ; i < this.nbr_parties ; i++) {
            parties.push(this.formBuilder.group({
                titrepartie: ['', [Validators.required, Validators.minLength(5)]],
                videopartie: [null, [Validators.required, requiredFileType(['mp4', 'avi'])]]
            }));
        }
    }

    onFormationSubmit(value) {
        value.slug = this.slug;
        this.formationService.add(value).pipe(
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
        const formationTitle = this.formationForm.get('titre').value.toLowerCase();
        this.slug = formationTitle.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toLowerCase();
    }



}
