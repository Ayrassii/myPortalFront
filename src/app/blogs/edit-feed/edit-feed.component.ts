import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Feed} from '../../models/feed';
import {FeedService} from '../../services/feed.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SidebarService} from '../../services/sidebar.service';
import {filter, map, tap} from 'rxjs/operators';
import {HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
import {pipe} from 'rxjs';
import {FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {FileUploadComponent} from '../file-upload/file-upload.component';
import {requiredFileType} from '../../../shared/requiredfiletype';
import {ClasseService} from '../../services/classe.service';
import {EtudiantService} from '../../services/etudiant.service';
import {ProfesseurService} from '../../services/professeur.service';
import {Classe} from '../../models/classe';

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
    selector: 'app-edit-feed',
    templateUrl: './edit-feed.component.html',
    styleUrls: ['./edit-feed.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: FileUploadComponent,
        multi: true
    }]
})
export class EditFeedComponent implements OnInit {
    feed: Feed;
    type = '';
    selectedItems = [];
    classes = [];
    dpclasses = [];
    etudiants = [];
    dpetudiants = [];
    professeurs = [];
    dpprofesseurs = [];
    dropdownSettings: any;
    progress = 0;
    success = false;
    slug: string;
    editForm: FormGroup;
    public sidebarVisible = true;
    public config: object = {
        items: [
            'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
            'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
            'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
            'Indent', 'Outdent', '|', 'CreateLink', 'CreateTable',
            'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
    };
    public htmlContent = '';
    constructor(private feedService: FeedService,
                private  router: Router,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private classeService: ClasseService,
                private etudiantService: EtudiantService,
                private professeurService: ProfesseurService,
                private sidebarService: SidebarService,
                private cdr: ChangeDetectorRef) { }
    ngOnInit() {
        this.feedService.getSingleFeed(this.route.snapshot.params.slug).subscribe(
            (res) => {
                this.feed = res['feed'];
                if (this.feed.user.cin !== localStorage.getItem('cin')) {
                    this.router.navigate(['authentication/page-403']);
                }
                this.htmlContent = this.feed.contenu;
            },
            (err) => {
                if (err.status === 401) {
                    this.router.navigate(['authentication/page-403']);
                }
            }
        );
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            value: 'item_id',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true
        };
        this.classeService.getClassesFromServer().subscribe(
            (res) => {
                this.classes = res['classes'];
                this.classes.forEach(
                    (el) => {
                        this.dpclasses.push(
                            { item_id: el.id , item_text: el.abbreviation + ' ' + el.niveau.specialite.nom + ' ' +  el.niveau.nom}
                        );
                    }
                );
            }
        );
        this.etudiantService.getEtudiantsFromServer().subscribe(
            (res) => {
                this.etudiants = res['etudiants'];
                this.etudiants.forEach(
                    (el) => {
                        this.dpetudiants.push(
                            { item_id: el.id , item_text: el.nom + ' ' + el.prenom}
                        );
                    }
                );
            }
        );
        this.professeurService.getProfesseursFromServer().subscribe(
            (res) => {
                this.professeurs = res['professeurs'];
                this.professeurs.forEach(
                    (el) => {
                        this.dpprofesseurs.push(
                            { item_id: el.id , item_text: el.gendre === 'female' ?
                                    'Mme'  + '. ' + el.nom + ' ' + el.prenom : 'Mr' + '. ' + el.nom + ' ' + el.prenom}
                        );
                    }
                );
            }
        );
        this.initEditForm();
        this.type = this.feed.type ? this.feed.type : 'public';
    }
    toggleFullWidth() {
        this.sidebarService.toggle();
        this.sidebarVisible = this.sidebarService.getStatus();
        this.cdr.detectChanges();
    }

    genslug() {
        const feedTitle = this.editForm.get('titre').value.toLowerCase();
        this.slug = feedTitle.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toLowerCase();
    }

    initEditForm() {
        this.editForm = this.formBuilder.group(
            {
                titre: ['', [Validators.required, Validators.minLength(5)]],
                image: [null, [requiredFileType(['png', 'jpg'])]],
                type: ['', [Validators.required]],
                classes: [null],
                professeurs: [null],
                etudiants: [null],
            }
        );
    }

    setType() {
        this.feed.type = this.editForm.get('type').value;
        this.type = this.editForm.get('type').value;
    }

    onEditSubmit(feed) {
        this.feed.slug = this.slug;
        this.feed.titre = feed.titre;
        this.feed.contenu = this.htmlContent;
        this.feed.image = this.editForm.get('image').value;
        switch (feed.type) {
            case 'classes': {
                this.feed.classes = feed.classes.map(el => el.item_id);
                this.feed.professeurs = null;
                this.feed.etudiants = null;
                break;
            }
            case 'etudiants': {
                this.feed.etudiants = feed.etudiants.map(el => el.item_id);
                this.feed.professeurs = null;
                this.feed.classes = null;
                break;
            }
            case 'professeurs': {
                this.feed.professeurs = feed.professeurs.map(el => el.item_id);
                this.feed.etudiants = null;
                this.feed.classes = null;
                break;
            }
            case 'public': {
                this.feed.professeurs = null;
                this.feed.etudiants = null;
                this.feed.classes = null;
            }
        }
        this.success = false;
        console.log(this.feed);
        this.feedService.editFeed(this.feed).pipe(
            uploadProgress(progress => (this.progress = progress)),
            toResponseBody()
        ).subscribe(res => {
            if (res['error']) {
                this.progress = 0;
                console.log(res['error']);
            } else {
                this.success = true;
                this.router.navigate(['/app/index']);
            }
        });
    }

}
