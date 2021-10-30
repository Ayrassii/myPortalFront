import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { EChartOption } from 'echarts';
import { SidebarService } from '../../services/sidebar.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';

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
			(response) => {
				this.me = response['me'];
				this.classmates = response['classmates'];
				this.loading = false;
			},
			() => {
				alert('Erreur Profile');
			}
		);
	}

	getRole(user?: User): string {
		if (user.role === 'ROLE_PROFESSEUR') {
			return 'Professeur';
		} else {
			return 'Etudiant';
		}

	}
	getImage(user?: User): string {
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

}
