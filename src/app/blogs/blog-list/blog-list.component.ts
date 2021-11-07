import {Component, OnInit, ChangeDetectorRef, OnDestroy, ViewChild} from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import {Subscription} from 'rxjs';
import {Feed} from '../../models/feed';
import {FeedService} from '../../services/feed.service';
import {DevoirService} from '../../services/devoir.service';
import {Devoir} from '../../models/devoir';
import {User} from '../../models/user';
import {FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {FileUploadComponent} from '../file-upload/file-upload.component';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { pipe } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import {requiredFileType} from '../../../shared/requiredfiletype';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarComponent} from 'ng-fullcalendar';
import {Affectation} from '../../models/affectation';
import {DatePipe} from '@angular/common';
import {Person} from '../../models/person';
import {AuthService} from '../../services/auth.service';
import {Globals} from '../../Globals';

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
	selector: 'app-blog-list',
	templateUrl: './blog-list.component.html',
	styleUrls: ['./blog-list.component.css'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: FileUploadComponent,
		multi: true
	}]
})
export class BlogListComponent implements OnInit, OnDestroy {
	progress = 0;
	success = false;
	loading = true;
	showAddPost = false;
	selectedfeed: Feed;
	feeds: Feed[] = [];
	birthdays: User[] = [];
	slug: string;
	feedForm: FormGroup;
	feedSubscription: Subscription;
	birthdaySubscription: Subscription;
	public sidebarVisible = false;
	@ViewChild('ucCalendar', { static: true }) ucCalendar: CalendarComponent;
	public displayEvent: any;
	public selectedMoment = new Date();
	data = [];
	dateaujourdhui: string;
	calendarOptions = {
		defaultDate: Date.now(),
		eventTextColor: '#000',
		locale: 'fr',
		defaultView: 'month',
		editable: false ,
		eventLimit: false,
		validRange: {
			start: this.datePipe.transform(Date.now(), 'yyyy-MM-dd')
		},
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay,listMonth'
		},
		events: []
	};
	constructor(private sidebarService: SidebarService,
				private modalService: NgbModal,
				private cdr: ChangeDetectorRef,
				private formBuilder: FormBuilder,
				private feedService: FeedService,
				private datePipe: DatePipe,
				private global: Globals,
				private authService: AuthService) {}

	ngOnInit() {
		this.feedService.getFeedsFromServer();
		this.authService.getUpcomingBirthdays();
		this.feedSubscription = this.feedService.feedsSubject.subscribe(
			(feeds: Feed[] ) => {
				this.feeds = feeds;
			}
		);
		this.birthdaySubscription = this.authService.birthdaysSubject.subscribe(
			(birthdays: User[] ) => {
				this.birthdays = birthdays;
			}
		);
		this.feedService.emitFeeds();
		this.authService.emitBirthdays();
		this.initFeedForm();
		this.loading = false;
	}

	toggleFullWidth() {
		this.sidebarService.toggle();
		this.sidebarVisible = this.sidebarService.getStatus();
		this.cdr.detectChanges();
	}

	ngOnDestroy(): void {
		this.feedSubscription.unsubscribe();
	}
	getDate(x: string): Date {
		return new Date(x);
	}
	getDayName(x: number): string {
		const weekdays = new Array(7);
		weekdays[0] = 'Dimanche';
		weekdays[1] = 'Lundi';
		weekdays[2] = 'Mardi';
		weekdays[3] = 'Mercredi';
		weekdays[4] = 'Jeudi';
		weekdays[5] = 'Vendredi';
		weekdays[6] = 'Samedi';
		return weekdays[x];
	}
	getMonthName(x: number): string {
		const yearmonths = new Array(12);
		yearmonths[0] = 'Janvier';
		yearmonths[1] = 'Fevrier';
		yearmonths[2] = 'Mars';
		yearmonths[3] = 'Avril';
		yearmonths[4] = 'Mai';
		yearmonths[5] = 'Juin';
		yearmonths[6] = 'Juillet';
		yearmonths[7] = 'Aout';
		yearmonths[8] = 'Septembre';
		yearmonths[9] = 'Octobre';
		yearmonths[10] = 'Novembre';
		yearmonths[11] = 'Decembre';
		return yearmonths[x];
	}

	ago(value: string): string {
		const d = new Date(value);
		const now = new Date();
		const seconds = Math.round(Math.abs((now.getTime() - d.getTime()) / 1000));
		const minutes = Math.round(Math.abs(seconds / 60));
		const hours = Math.round(Math.abs(minutes / 60));
		const days = Math.round(Math.abs(hours / 24));
		const months = Math.round(Math.abs(days / 30.416));
		const years = Math.round(Math.abs(days / 365));
		if (Number.isNaN(seconds)) {
			return '';
		} else if (seconds <= 45) {
			return 'il y a quelques secondes';
		} else if (seconds <= 90) {
			return 'il y a une minute ';
		} else if (minutes <= 45) {
			return 'il y a ' + minutes + ' minutes';
		} else if (minutes <= 90) {
			return 'il y a une heure ';
		} else if (hours <= 22) {
			return 'il y a ' + hours + ' heures';
		} else if (hours <= 36) {
			return 'il y a un jour';
		} else if (days <= 25) {
			return 'il y a ' + days + ' jours';
		} else if (days <= 45) {
			return 'il y a un mois';
		} else if (days <= 345) {
			return 'il y a ' + months + ' mois';
		} else if (days <= 545) {
			return 'il y a un an';
		} else { // (days > 545)
			return 'il y a ' + years + ' ans';
		}
	}
	getImage(user?: User): string {
		return this.global.Medias + 'users/' + user.avatar;
	}
	getId(): string {
		return localStorage.getItem('id');
	}

	initFeedForm() {
		this.feedForm = this.formBuilder.group(
			{
				contenu: ['', [Validators.required, Validators.minLength(10)]],
				titre: ['', [Validators.required, Validators.minLength(5)]],
				image: [null, [requiredFileType(['png', 'jpg'])]]
			}
		);
	}

	onFeedSubmit(feed) {
		feed.slug = this.slug;
		feed.type = 'public';
		feed.image = this.feedForm.get('image').value;
		feed.users = [];
		feed.classes = [];
		this.success = false;
		this.feedService.addFeed(feed).pipe(
			uploadProgress(progress => (this.progress = progress)),
			toResponseBody()
		).subscribe(res => {
			this.progress = 0;
			this.feeds.unshift(res['feed']);
			this.success = true;
			this.initFeedForm();
		});
	}

	genslug() {
		const feedTitle = this.feedForm.get('titre').value.toLowerCase();
		this.slug = feedTitle.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toLowerCase();
	}

	deleteFeed() {
		this.feedService.deleteFeed(this.selectedfeed).subscribe(
			() => {
				const index: number = this.feeds.indexOf(this.selectedfeed);
				if (index !== -1) {
					this.feeds.splice(index, 1);
				}
				this.modalService.dismissAll();
			}
		);

	}


	clickButton(model: any) {
		this.displayEvent = model;
	}

	eventClick(model: any, content, size) {
		model = {
			event: {
				id: model.event.id,
				start: model.event.start,
				end: model.event.end,
				title: model.event.title,
				allDay: model.event.allDay,
				color: model.event.color
				// other params
			},
			duration: {}
		};
		this.displayEvent = model;
		this.openModal(content, size);
	}
	updateEvent(model: any) {

	}
	getRandomColor() {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}
	openModal(content, size) {
		this.modalService.open(content, { size: size });
	}
	getRole() {
		return localStorage.getItem('role');
	}
}
