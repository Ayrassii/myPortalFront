import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { EChartOption } from 'echarts';
import { SidebarService } from '../../services/sidebar.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';
import {Globals} from '../../Globals';

@Component({
	selector: 'app-page-profile',
	templateUrl: './page-profile.component.html',
	styleUrls: ['./page-profile.component.css']
})
export class PageProfileComponent implements OnInit, OnDestroy {
	loading: boolean;
	me: User;
	classmates: User[] = [];
	public sidebarVisible = true;

	constructor(private sidebarService: SidebarService,
				private global: Globals,
				private cdr: ChangeDetectorRef,
				private authService: AuthService) {
	}

    ngOnDestroy() {
    }

	toggleFullWidth() {
		this.sidebarService.toggle();
		this.sidebarVisible = this.sidebarService.getStatus();
		this.cdr.detectChanges();
	}

	ngOnInit(): void {
		this.loading = true;
		this.authService.Me().subscribe(
			(response: User) => {
				this.me = response;
				this.loading = false;
			},
			() => {
				alert('Erreur Profile');
			}
		);
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

}
