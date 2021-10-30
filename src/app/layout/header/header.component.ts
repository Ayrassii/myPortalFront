import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ThemeService } from '../../services/theme.service';
import {AuthService} from '../../services/auth.service';
import {interval, Observable, Subject} from 'rxjs';
import {startWith, map, switchMap, takeUntil} from 'rxjs/operators';
import {Notif} from '../../models/notif';


@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
	providers: [NgbDropdownConfig]
})
export class HeaderComponent implements OnInit {
	private unsubscribe$ = new Subject<void>();
	// Properties
	@Input() showNotifMenu = false;
	@Input() showToggleMenu = false;
	@Input() darkClass = '';
	@Input() notifs$: Observable<Notif[]>;
	@Output() toggleSettingDropMenuEvent = new EventEmitter();
	@Output() toggleNotificationDropMenuEvent = new EventEmitter();

	constructor(private config: NgbDropdownConfig,
				private themeService: ThemeService,
				private authService: AuthService ) {
		config.placement = 'bottom-right';
	}

	ngOnInit() {
		this.notifs$ = interval(216000)
			.pipe(
				takeUntil(this.unsubscribe$),
				startWith(0),
				switchMap(() => this.authService.getNotifs()),
			);
	}

	toggleSideMenu() {
		this.themeService.showHideMenu();
	}
	onLogout() {
		this.authService.logoutUser();
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
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
