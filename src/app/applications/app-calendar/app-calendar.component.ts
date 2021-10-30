import {Component, ViewChild, ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { SidebarService } from '../../services/sidebar.service';
import { EventService } from '../../services/event.service';
import {Subject, Subscription} from 'rxjs';
import {DevoirService} from '../../services/devoir.service';
import {Devoir} from '../../models/devoir';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Affectation} from '../../models/affectation';
import {AffectationService} from '../../services/affectation.service';
import {DatePipe} from '@angular/common';
import * as $ from 'jquery';
@Component({
	selector: 'app-app-calendar',
	templateUrl: './app-calendar.component.html',
	styleUrls: ['./app-calendar.component.css']
})
export class AppCalendarComponent implements OnDestroy , OnInit {

	@ViewChild('ucCalendar', { static: true }) ucCalendar: CalendarComponent;
	public sidebarVisible = true;
	public displayEvent: any;
	public selectedMoment = new Date();
	devoirForm: FormGroup;
	matieres: Affectation[] = [];
	data = [];
	devoirSubscription: Subscription;
	affectionSubscription: Subscription;
	affectations: Affectation[];
	dateaujourdhui: string;
	calendarOptions = {
		defaultDate: Date.now(),
		eventTextColor: '#000',
		locale: 'fr',
		defaultView: 'month',
		editable: localStorage.getItem('role') === 'ROLE_PROFESSEUR' ,
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
				private devoirService: DevoirService,
				private datePipe: DatePipe,
				private affectationService: AffectationService,
				private eventService: EventService
	) {
		this.dateaujourdhui = this.datePipe.transform(Date.now(), 'yyyy-MM-dd\THH:ss');
		this.devoirService.getDevoirsFromServer();
		this.devoirSubscription = this.devoirService.devoirsSubject.subscribe(
			(devoirs: Devoir[] ) => {
				devoirs.forEach(
					(d: Devoir) => {
						this.data.push({
							id: d.id,
							title: this.getRole() === 'ROLE_PROFESSEUR' ? 'Classe : ' + d.classe.niveau.nom + ' ' + d.classe.niveau.specialite.nom
								+ ' ,Type : ' + d.type + ' ,Matiere : ' + 	d.matiere.nom + ' ,Coeficient : ' + d.coeficient
								: 'Type : ' + d.type + ' ,Matiere : ' + d.matiere.nom + ' ,Coeficient : ' + d.coeficient,
							start: d.date,
							end: d.date,
							color: this.getRandomColor(),
							textColor: '#000'
						});
					}
				);
				$('#myCalendar').fullCalendar('renderEvents', this.data, true);
			});
	}

	ngOnDestroy() {
		this.devoirSubscription.unsubscribe();
		if (this.getRole() === 'ROLE_PROFESSEUR') {
			this.affectionSubscription.unsubscribe();
		}
	}

	toggleFullWidth() {
		this.sidebarService.toggle();
		this.sidebarVisible = this.sidebarService.getStatus();
		this.cdr.detectChanges();
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

	onDevoirSubmit(devoir: Devoir) {
		this.devoirService.add(devoir).subscribe(
			(res) => {
				const added = [{
					id: res['devoir'].id,
					title: this.getRole() === 'ROLE_PROFESSEUR' ? 'Classe : ' + res['devoir'].classe.niveau.nom
						+ ' ' + res['devoir'].classe.niveau.specialite.nom
						+ ' ,Type : ' + res['devoir'].type + ' ,Matiere : ' + 	res['devoir'].matiere.nom + ' ,Coeficient : ' + res['devoir'].coeficient
						: 'Type : ' + res['devoir'].type + ' ,Matiere : ' + res['devoir'].matiere.nom + ' ,Coeficient : ' + res['devoir'].coeficient,
					start: res['devoir'].date,
					end: res['devoir'].date,
					color: this.getRandomColor()
				}];
				$('#myCalendar').fullCalendar('renderEvents', added, true);
				this.modalService.dismissAll();
				this.initDevoirForm();
			},
			(err) => {
			}
		);
	}

	updateEvent(model: any) {
		this.devoirService.update(model).subscribe(
			() => {
				this.displayEvent = model;
			},
			(err) => {
			}
		);
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

	ngOnInit(): void {
		if (localStorage.getItem('role') === 'ROLE_PROFESSEUR') {
			this.affectationService.getAffectationFromServer();
			this.affectionSubscription = this.affectationService.affectationsSubject.subscribe(
				(affectations: Affectation[] ) => {
					this.affectations = affectations;
				}
			);
			this.affectationService.emitAffectations();
			this.initDevoirForm();
		}
	}

	initDevoirForm() {
		const d = new Date();
		d.setHours(d.getHours() - 1);
		const date = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
		const time = d.getHours() + ':' + d.getMinutes() ;
		const dateTime = date + '\T' + time;
		this.devoirForm = this.formBuilder.group(
			{
				date: [dateTime, [Validators.required]],
				classe_id: ['', [Validators.required]],
				matiere_id: ['', [Validators.required]],
				type: ['', [Validators.required]],
				coeficient: ['', [Validators.required, Validators.min(1), Validators.max(4)]],
			}
		);
	}

	mesmatieres(classe_id) {
		this.matieres = [];
		this.affectations.forEach((el: Affectation) => {
			if (el.classe.id === Number(classe_id)) {
				this.matieres.push(el);
			}
		});
	}

	deleteExamen(evennement) {
		const index = this.data.findIndex((el) => {
			return el.id === evennement.id;
		});
		if (index > -1) {
			this.data.splice(index, 1);
		}
		this.devoirService.delete(evennement.id).subscribe(
			() => {
				$('#myCalendar').fullCalendar('removeEvents');
				$('#myCalendar').fullCalendar('renderEvents', this.data, true);
				this.modalService.dismissAll();
			},
			(err) => {
			}
		);
	}

}
