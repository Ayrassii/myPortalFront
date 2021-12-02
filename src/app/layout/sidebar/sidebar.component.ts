import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { takeUntil } from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {Globals} from '../../Globals';
import {DiscussionService} from '../../services/discussion.service';
import {Discussion} from '../../models/discussion';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnDestroy {

	me: User;
	loading = true;
	discussions: Discussion[] = [];
	@Input() sidebarVisible = true;
	@Input() navTab = 'menu';
	@Input() currentActiveMenu;
	@Input() currentActiveSubMenu;
	@Output() changeNavTabEvent = new EventEmitter();
	@Output() activeInactiveMenuEvent = new EventEmitter();
    public themeClass = 'theme-cyan';
    public darkClass = '';
    private ngUnsubscribe = new Subject();
	listUserSubscription: Subscription = new Subscription();

	constructor(private themeService: ThemeService,
				private authService: AuthService,
				private global: Globals,
				private discussionService: DiscussionService,
				private router: Router) {
		this.authService.Me().subscribe(
			(response: User) => {
				this.me = response;
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
		this.listUserSubscription = this.discussionService.getDiscussionsFromServer().subscribe(
			(res: Discussion[]) => {
				this.discussions = res;
			}
		);
    }

	getUserMedia(path) {
		return this.global.Medias + 'users/' + path;
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

	getRole(user?: User): string {
		if (user.role === 'ROLE_COLLAB') {
			return 'Collaborateur';
		}
		if (user.role === 'ROLE_RH') {
			return 'Resources Humaines';
		}
		if (user.role === 'ROLE_MARK') {
			return 'Marketing';
		}
	}
	getImage(user?: User): string {
		return this.global.Medias + 'users/' + user.avatar;
	}

	onLogout() {
		this.authService.logoutUser();
	}
}
