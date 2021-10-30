import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SidebarService} from '../../services/sidebar.service';
import {Router} from '@angular/router';
import {filter, map, tap} from 'rxjs/operators';
import {HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
import {pipe} from 'rxjs';
import {FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {FileUploadComponent} from '../file-upload/file-upload.component';
import {FeedService} from '../../services/feed.service';
import {requiredFileType} from '../../../shared/requiredfiletype';
import {ClasseService} from '../../services/classe.service';
import {EtudiantService} from '../../services/etudiant.service';
import {ProfesseurService} from '../../services/professeur.service';

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
	selector: 'app-blog-post',
	templateUrl: './blog-post.component.html',
	styleUrls: ['./blog-post.component.css'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: FileUploadComponent,
		multi: true
	}]
})
export class BlogPostComponent implements OnInit {
	type = 'public';
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
	feedForm: FormGroup;
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

	constructor(private sidebarService: SidebarService,
				private cdr: ChangeDetectorRef,
				private router: Router,
				private formBuilder: FormBuilder,
				private classeService: ClasseService,
				private etudiantService: EtudiantService,
				private professeurService: ProfesseurService,
				private feedService: FeedService) {
	}

	ngOnInit() {
		if (this.getRole() === 'ROLE_PROFESSEUR') {
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
			this.initFeedForm();
		} else {
			this.router.navigate(['authentication', 'page-403']);
		}
	}

	toggleFullWidth() {
		this.sidebarService.toggle();
		this.sidebarVisible = this.sidebarService.getStatus();
		this.cdr.detectChanges();
	}
	getRole() {
		return localStorage.getItem('role');
	}

	onFeedSubmit(feed) {
		feed.slug = this.slug;
		feed.contenu = this.htmlContent;
		feed.image = this.feedForm.get('image').value;
		switch (feed.type) {
			case 'classes': {
				feed.classes = feed.classes.map(el => el.item_id);
				feed.professeurs = null;
				feed.etudiants = null;
				break;
			}
			case 'etudiants': {
				feed.etudiants = feed.etudiants.map(el => el.item_id);
				feed.professeurs = null;
				feed.classes = null;
				break;
			}
			case 'professeurs': {
				feed.professeurs = feed.professeurs.map(el => el.item_id);
				feed.etudiants = null;
				feed.classes = null;
				break;
			}
			case 'public': {
				feed.professeurs = null;
				feed.etudiants = null;
				feed.classes = null;
			}
		}
		this.success = false;
		this.feedService.addFeed(feed).pipe(
			uploadProgress(progress => (this.progress = progress)),
			toResponseBody()
		).subscribe(res => {
			this.success = true;
			this.router.navigate(['/app/index']);
		});
	}

	genslug() {
		const feedTitle = this.feedForm.get('titre').value.toLowerCase();
		this.slug = feedTitle.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toLowerCase();
	}

	initFeedForm() {
		this.feedForm = this.formBuilder.group(
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
		this.type = this.feedForm.get('type').value;
	}

}
