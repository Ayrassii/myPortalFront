import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SidebarService} from '../../services/sidebar.service';
import {Router} from '@angular/router';
import {filter, map, tap} from 'rxjs/operators';
import {HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
import {pipe} from 'rxjs';
import {FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {FileUploadComponent} from '../file-upload/file-upload.component';
import {FeedService} from '../../services/feed.service';
import {requiredFileType} from '../../../shared/requiredfiletype';
import {ClasseService} from '../../services/classe.service';
import {EtudiantService} from '../../services/etudiant.service';
import {ProfesseurService} from '../../services/professeur.service';
import {Article} from '../../models/article';
import {ArticleService} from '../../services/article.service';

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
	progress = 0;
	success = false;
	medias = [];
	nbr_medias = 0;
	articleForm: FormGroup;
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
				private articleService: ArticleService) {
	}

	ngOnInit() {
		this.initArticleForm();
	}

	toggleFullWidth() {
		this.sidebarService.toggle();
		this.sidebarVisible = this.sidebarService.getStatus();
		this.cdr.detectChanges();
	}
	getRole() {
		return localStorage.getItem('role');
	}

	onArticleSubmit(article) {
		article.content = this.htmlContent;
		article.medias.forEach((m, i) => {
			if (m.type === 'youtube') {
				m.path = this.genEmbedYoutube(m.path);
			}
		});
		this.articleService.addArticle(article).subscribe(r => this.router.navigate(['app', 'articles']));
	}

	onRemoveMedia(index) {
		const medias = this.articleForm.controls.medias as FormArray;
		medias.removeAt(index);
		this.nbr_medias--;
	}

	getformArray() { return <FormArray>this.articleForm.get('medias'); }

	initArticleForm() {
		this.articleForm = this.formBuilder.group(
			{
				title: ['', [Validators.required, Validators.minLength(5)]],
				medias: new FormArray([]),
				nbr_medias: [0]
			}
		);
	}
	genEmbedYoutube(url: string) {
		return url.split('?v=')[1];
	}

	GenererMediasform() {
		this.nbr_medias = this.nbr_medias ++;
		const medias = this.articleForm.controls.medias as FormArray;
		medias.push(this.formBuilder.group({
			type: ['', [Validators.required, Validators.minLength(5)]],
			path: [null],
			file: [null, [requiredFileType(['mp4', 'avi', 'jpg', 'png'])]]
		}));
	}

}
