import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EChartOption } from 'echarts';
import { SidebarService } from '../../services/sidebar.service';
import {EmploiService} from '../../services/emploi.service';
import {Case} from '../../models/case';
import {Jour} from '../../models/jour';
import {Seance} from '../../models/seance';
import {Subscription} from 'rxjs';
import * as jsPDF from 'jspdf';
@Component({
	selector: 'app-page-blank',
	templateUrl: './page-blank.component.html',
	styleUrls: ['./page-blank.component.css']
})
export class PageBlankComponent implements OnInit {
	aujourdhui = new Date();
	loading: boolean;
	cases: Case[] = [];
	jours: Jour[] = [];
	seances: Seance[] = [];
	casesSubscription: Subscription;
	public sidebarVisible = true;

	constructor(private sidebarService: SidebarService,
				private cdr: ChangeDetectorRef,
				private emploiService: EmploiService) {
	}

	ngOnInit() {
		this.loading = true;
		this.emploiService.getCasesFromServer();
		this.casesSubscription = this.emploiService.casesSubject.subscribe(
			(cases: Case[] ) => {
				this.cases = cases;
				this.jours = this.emploiService.jours;
				this.seances = this.emploiService.seances;
				this.loading = false;
			}
		);
		this.emploiService.emitCases();
	}

	toggleFullWidth() {
		this.sidebarService.toggle();
		this.sidebarVisible = this.sidebarService.getStatus();
		this.cdr.detectChanges();
	}
	caseSeanceJour(seance_id: number, jour_id: number) {
		return this.cases.filter((el: Case) => {
			return el.seance.id === seance_id && el.jour.id === jour_id;
			}
		);
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
	getRole() {
		return localStorage.getItem('role');
	}
	genererPDF() {
		this.emploiService.getEmploiPDF(this.cases[0].semaine, this.cases[0].date_debut, this.cases[0].date_fin).subscribe(
			(response) => {
				this.downLoadFile(response, 'application/pdf');
			}
		);
	}

	downLoadFile(data: any, type: string) {
		const blob = new Blob([data], { type: type});
		const url = window.URL.createObjectURL(blob);
		const pwa = window.open(url);
		if (!pwa || pwa.closed || typeof pwa.closed === 'undefined') {
			alert( 'Veuillez desactiver le blockeur de Pop Ups ');
		}
	}
}
