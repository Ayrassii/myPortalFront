import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SidebarService} from '../../services/sidebar.service';
import {pipe, Subscription} from 'rxjs';
import {Feed} from '../../models/feed';
import {FeedService} from '../../services/feed.service';
import {User} from '../../models/user';
import {FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {FileUploadComponent} from '../file-upload/file-upload.component';
import {HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
import {filter, map, tap} from 'rxjs/operators';
import {requiredFileType} from '../../../shared/requiredfiletype';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarComponent} from 'ng-fullcalendar';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {Globals} from '../../Globals';
import {Question} from '../../models/question';
import {QuestionService} from '../../services/question.service';
import {Evenement} from '../../models/evenement';
import {EventService} from '../../services/event.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';

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
	mediaselected: string;
	selectedfeed: Feed;
	feeds: Feed[] = [];
	events: Evenement[] = [];
	birthdays: User[] = [];
	empofmounth: User;
	question: Question;
	slug: string;
	feedForm: FormGroup;
	quizForm: FormGroup;
	feedSubscription: Subscription;
	birthdaySubscription: Subscription;
	questionSubscription: Subscription;
	public sidebarVisible = false;
	@ViewChild('ucCalendar', { static: false })
	ucCalendar: CalendarComponent;
	public displayEvent: any;
	public selectedMoment = new Date();
	data = [];
	dateaujourdhui: string;
	calendarOptions = {
		defaultDate: Date.now(),
		eventTextColor: '#fff',
		locale: 'fr',
		defaultView: 'month',
		editable: false ,
		eventLimit: false,
		validRange: {
			start: this.datePipe.transform(Date.now(), 'yyyy-MM-dd')
		},
		// header: {
		// 	left: 'prev,next today',
		// 	center: 'title',
		// 	right: 'month,agendaWeek,agendaDay,listMonth'
		// },
		events: []
	};
	constructor(private sidebarService: SidebarService,
				private modalService: NgbModal,
				private router: Router,
				private cdr: ChangeDetectorRef,
				private formBuilder: FormBuilder,
				private feedService: FeedService,
				private questionService: QuestionService,
				private eventService: EventService,
				private datePipe: DatePipe,
				private global: Globals,
				private sanitizer: DomSanitizer,
				private authService: AuthService) {}


	ngOnInit() {
		this.feedService.getFeedsFromServer();
		this.authService.getUpcomingBirthdays();
		this.questionService.getQuestionFromServer();
		this.authService.getEmployeOfMonth().subscribe(
			(res: User) => {
				this.empofmounth = res;
			},
			(err) => {

			}
		);
		this.feedSubscription = this.feedService.feedsSubject.subscribe(
			(feeds: Feed[] ) => {
				this.feeds = feeds;
				this.feeds.forEach((f, i) => {
					if (f.medias.length > 0) {
						if (f.medias[0].type === 'youtube') {
							f.medias[0].path = this.sanitizer.bypassSecurityTrustResourceUrl(<string>f.medias[0].path);
						}
					}
					this.loading = false;
				});
			}
		);
		this.birthdaySubscription = this.authService.birthdaysSubject.subscribe(
			(birthdays: User[] ) => {
				this.birthdays = birthdays;
			}
		);
		this.questionSubscription = this.questionService.questionSubject.subscribe(
			(question: Question ) => {
				this.question = question;
			}
		);
		this.eventService.getEvents().subscribe(
			(evenments: Evenement[] ) => {
				evenments.forEach(
					(evenement: Evenement) => {
						this.data.push({
							id: evenement.id,
							title: evenement.title,
							start: this.getDate(evenement.start_date),
							end: this.getDate(evenement.end_date),
							color: '#084c00',
							textColor: '#fff'
						});
					}
				);
				this.ucCalendar.renderEvents(this.data);
			});
		this.feedService.emitFeeds();
		this.authService.emitBirthdays();
		this.questionService.emitQuestion();
		this.initFeedForm();
		this.initQuizForm();
	}

	toggleFullWidth() {
		this.sidebarService.toggle();
		this.sidebarVisible = this.sidebarService.getStatus();
		this.cdr.detectChanges();
	}

	ngOnDestroy(): void {
		this.feedSubscription.unsubscribe();
		this.birthdaySubscription.unsubscribe();
		this.questionSubscription.unsubscribe();
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
	getUserImage(user?: User): string {
		return this.global.Medias + 'users/' + user.avatar;
	}
	getId(): string {
		return localStorage.getItem('id');
	}
	getFeedMedia(path) {
		return this.global.Medias + 'feeds/' + path;
	}

	birthdayDate() {
		const groups = this.birthdays.reduce(( groups2, birthday: User) => {
			const date = birthday.birthday.substring(0, 10);
			if (!groups2[date]) {
				groups2[date] = [];
			}
			groups2[date].push(birthday);
			return groups2;
		}, {});
		return Object.keys(groups).map((date) => {
			return {
				date,
				birthdays: groups[date]
			};
		});
	}

	initFeedForm() {
		this.feedForm = this.formBuilder.group(
			{
				contenu: ['', [Validators.required, Validators.minLength(2)]],
				//titre: ['', [Validators.required, Validators.minLength(2)]],
				image: [null, [requiredFileType(['png', 'jpg'])]],
				video: [null, [requiredFileType(['mp4'])]],
				youtube: ['', []],
				type: ['image', []]
			}
		);
	}

	initQuizForm() {
		this.quizForm = new FormGroup({
			answer_id: new FormControl()
		});
	}

	onFeedSubmit(feed) {
		const youtube_id = this.genEmbedYoutube(feed.youtube);
		this.success = false;
		this.feedService.addFeed(feed.titre, feed.contenu, feed.type, youtube_id, feed.image, feed.video).pipe(
			uploadProgress(progress => (this.progress = progress)),
			toResponseBody()
		).subscribe((res: Feed) => {
			const postedFeed = res;
			if (postedFeed.medias[0].type === 'youtube') {
				postedFeed.medias[0].path = this.sanitizer.bypassSecurityTrustResourceUrl(<string>postedFeed.medias[0].path);
			}
			this.progress = 0;
			if (this.getRole() !== "ROLE_COLLAB")
				this.feeds.unshift(postedFeed);
			this.success = true;
			this.initFeedForm();
			this.showAddPost = false;
		});
	}

	onLikeSubmit(id) {
		this.feedService.likeFeed(id).subscribe(
			(res: Feed) => {
				const feed = this.feeds.find(f => f.id === id);
				feed.likes = res.likes;
				feed.likes_count = res.likes_count;
			}
		);
	}

	isLiked(id) {
		const feed = this.feeds.find(f => f.id === id);
		const like = feed.likes.find(l => l.user_id === parseInt(localStorage.getItem('id'), 10));
		if (like) { return true; } else { return false; }
	}

	onValidateEntry(entry_id) {
		this.authService.decideEntry(entry_id, 'yes').subscribe(
			(feeds: Feed[] ) => {
				this.feeds = feeds;
				this.feeds.forEach((f, i) => {
					if (f.medias.length > 0) {
						if (f.medias[0].type === 'youtube') {
							f.medias[0].path = this.sanitizer.bypassSecurityTrustResourceUrl(<string>f.medias[0].path);
						}
					}
				});
			}
		);
	}
	onDismissEntry(entry_id) {
		this.authService.decideEntry(entry_id, 'no').subscribe(
			(feeds: Feed[] ) => {
				this.feeds = feeds;
				this.feeds.forEach((f, i) => {
					if (f.medias.length > 0) {
						if (f.medias[0].type === 'youtube') {
							f.medias[0].path = this.sanitizer.bypassSecurityTrustResourceUrl(<string>f.medias[0].path);
						}
					}
				});
			}
		);
	}
	onQuizSubmit(form) {
		const fullanswer = {
			question_id: this.question.id,
			answer_id: form.answer_id
		};
		this.questionService.answerQuestion(fullanswer).subscribe(
			(res) => {
				this.question = {...res['question'], answered: res['answered'], responses_count: res['responses_count']};
			},
			(err) => {

			}
		);
		// this.feedService.addFeed(feed).pipe(
		// 	uploadProgress(progress => (this.progress = progress)),
		// 	toResponseBody()
		// ).subscribe(res => {
		// 	this.progress = 0;
		// 	this.feeds.unshift(res['feed']);
		// 	this.success = true;
		// 	this.initFeedForm();
		// });
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
		this.router.navigate(['app', 'singleevent', model.event.id]);
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
	openModal(content, size, feed) {
		this.selectedfeed = feed;
		this.modalService.open(content, { size: size });
	}
	getRole() {
		return localStorage.getItem('role');
	}

	genEmbedYoutube(url: string) {
		console.log(url);
		return url.split('?v=')[1];
	}

	changeMediaSelected(event) {
		this.mediaselected = event.target.value;
	}
}
