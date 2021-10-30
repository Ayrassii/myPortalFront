import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnDestroy {

	me: User;
	loading = true;
	@Input() sidebarVisible = true;
	@Input() navTab = 'menu';
	@Input() currentActiveMenu;
	@Input() currentActiveSubMenu;
	@Output() changeNavTabEvent = new EventEmitter();
	@Output() activeInactiveMenuEvent = new EventEmitter();
    public themeClass = 'theme-cyan';
    public darkClass = '';
    private ngUnsubscribe = new Subject();

	constructor(private themeService: ThemeService,
				private authService: AuthService,
				private router: Router) {
		this.authService.Me().subscribe(
			(response) => {
				this.me = response['me'];
				this.loading = false;
			},
			(err) => {
				if (err.status === 401) {
					this.router.navigate(['authentication/page-403']);
				}
			}
		);
        this.themeService.themeClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(themeClass => {
			this.themeClass = themeClass;
        });
        this.themeService.darkClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(darkClass => {
            this.darkClass = darkClass;
        });
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

	changeNavTab(tab: string) {
		this.navTab = tab;
	}

	activeInactiveMenu(menuItem: string) {
		this.activeInactiveMenuEvent.emit({ 'item': menuItem });
	}

	changeTheme(theme: string) {
		this.themeService.themeChange(theme);
    }

	getRole(user: User): string {
		if (user) {
			if (user.role === 'ROLE_PROFESSEUR') {
				return 'Professeur';
			} else {
				return 'Etudiant';
			}
		}
		return '';

	}
	getImage(user: User): string {
		if (user) {
			if (user.image) {
				if (this.getRole(user) === 'Professeur') {
					return 'https://gestion-scolarite.io/images/professeurs/' + user.image;
				} else {
					return 'https://gestion-scolarite.io/images/etudiants/' + user.image;
				}
			}
			if (user.gendre === 'male') {
				return 'https://gestion-scolarite.io/assets/dist/img/avatar5.png';
			} else {
				return 'https://gestion-scolarite.io/assets/dist/img/avatar2.png';
			}
		}
		return '';
	}

	onLogout() {
		this.authService.logoutUser();
	}
}
