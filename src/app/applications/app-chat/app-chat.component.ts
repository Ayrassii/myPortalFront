import {Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { EChartOption } from 'echarts';
import { SidebarService } from '../../services/sidebar.service';
import {DiscussionService} from '../../services/discussion.service';
import {Globals} from '../../Globals';
import {Discussion} from '../../models/discussion';
import {Message} from '../../models/message';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
// tslint:disable-next-line:import-blacklist
import {Observable} from 'rxjs/Rx';
import {Subscription} from 'rxjs';

@Component({
	selector: 'app-app-chat',
	templateUrl: './app-chat.component.html',
	styleUrls: ['./app-chat.component.css']
})
export class AppChatComponent implements OnInit, OnDestroy {
	@ViewChild('scrollMe', {static: false}) private myScrollContainer: ElementRef;
	public sidebarVisible = true;
	discussions: Discussion[] = [];
	messages: Message[] = [];
	liveMessagesSubscription: Subscription = new Subscription();
	liveMessagesSubscription2: Subscription = new Subscription();
	liveDiscussionSubscription: Subscription = new Subscription();
	liveDiscussionSubscription2: Subscription = new Subscription();
	listUserSubscription: Subscription = new Subscription();
	listMeSubscription: Subscription = new Subscription();
	obSubscription: Subscription = new Subscription();
	him: User;
	me: User;
	users: User[] = [];
	message: string;
	constructor(private sidebarService: SidebarService,
				private cdr: ChangeDetectorRef,
				private discussionService: DiscussionService,
				private authService: AuthService,
				private global: Globals
	) {}

	ngOnInit() {
		this.liveDiscussionSubscription = this.discussionService.getDiscussionsFromServer().subscribe(
			(res: Discussion[]) => {
				this.discussions = res;
			}
		);
		this.listUserSubscription = this.authService.getUsers().subscribe(
			(res: User[]) => {
				this.users = res;
				console.log(this.users);
				this.users = this.users.filter((u) => u.id !== parseInt(localStorage.getItem('id'), 10));
			}
		);
		this.listMeSubscription = this.authService.Me().subscribe(
			(res: User) => {
				this.me = res;
			}
		);
		this.obSubscription = Observable.interval(5000).subscribe(x => {
			this.reloadMessages();
		});
	}
	ngOnDestroy() {
		this.him = null;
		this.messages = [];
		this.liveMessagesSubscription.unsubscribe();
		this.liveMessagesSubscription2.unsubscribe();
		this.liveDiscussionSubscription.unsubscribe();
		this.liveDiscussionSubscription2.unsubscribe();
		this.listUserSubscription.unsubscribe();
		this.listMeSubscription.unsubscribe();
		this.obSubscription.unsubscribe();
	}

	toggleFullWidth() {
		this.sidebarService.toggle();
		this.sidebarVisible = this.sidebarService.getStatus();
		this.cdr.detectChanges();
	}

	getUserMedia(path) {
		return this.global.Medias + 'users/' + path;
	}

	onClickContact(id) {
		this.him = null;
		this.messages = [];
		const discussion = this.discussions.find((d) => {
			return (d.createdby_id === id) || (d.destination_id === id);
		});
		this.him = this.users.find((u) => u.id === id);
		if (discussion) {
			this.discussionService.getMessages(discussion.id).subscribe(
				(res: Message[]) => {
					this.messages = res;
					this.messages.reverse();
				}
			);
		}

	}

	onSubmitMessage() {
		let discussion = this.discussions.find((d) => {
			return (d.createdby_id === this.him.id) || (d.destination_id === this.him.id);
		});
		if (!discussion) {
			this.discussionService.createDiscussion(this.him.id).subscribe(
				(res: Discussion) => {
					discussion = res;
					this.discussionService.sendMessage({content: this.message, receiver_id: this.him.id, discussion_id: discussion.id})
						.subscribe(
							(response: Message[]) => {
								this.message = '';
								this.messages = response;
								this.messages.reverse();
							}
						);
				}
			);
		} else {
			this.discussionService.sendMessage({content: this.message, receiver_id: this.him.id, discussion_id: discussion.id})
				.subscribe(
					(response: Message[]) => {
						this.message = '';
						this.messages = response;
						this.messages.reverse();
					}
				);
		}
	}

	reloadMessages() {
		if (this.him) {
			this.liveDiscussionSubscription2 = this.discussionService.getDiscussionsFromServer().subscribe(
				(res: Discussion[]) => {
					this.discussions = res;
					const discussion = this.discussions.find((d) => {
						return (d.createdby_id === this.him.id) || (d.destination_id === this.him.id);
					});
					if (discussion) {
						this.liveMessagesSubscription2 = this.discussionService.getMessages(discussion.id).subscribe(
							(response: Message[]) => {
								this.messages = response;
								this.messages.reverse();
							}
						);
					}
				}
			);
		}
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

}
