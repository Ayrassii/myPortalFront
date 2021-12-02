import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Feed} from '../../models/feed';
import {Devoir} from '../../models/devoir';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {SidebarService} from '../../services/sidebar.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FeedService} from '../../services/feed.service';
import {DevoirService} from '../../services/devoir.service';
import {User} from '../../models/user';
import {Evenement} from '../../models/evenement';
import {EventService} from '../../services/event.service';
import {Globals} from '../../Globals';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, OnDestroy {

  progress = 0;
  success = false;
  loading = true;
  selectedevent: Evenement;
  evenements: Evenement[] = [];
  slug: string;
  public sidebarVisible = false;

  constructor(private sidebarService: SidebarService,
              private modalService: NgbModal,
              private eventService: EventService,
              private global: Globals,
              private sanitizer: DomSanitizer,
              private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loading = false;
    this.eventService.getEvents().subscribe(
        (evenements: Evenement[] ) => {
          this.evenements = evenements;
          this.evenements.forEach((f, i) => {
            if (f.medias.length > 0) {
              if (f.medias[0].type === 'youtube') {
                f.medias[0].path = this.sanitizer.bypassSecurityTrustResourceUrl(<string>f.medias[0].path);
              }
            }
            this.loading = false;
          });
        });
  }

  toggleFullWidth() {
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {

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

  getUserMedia(path: string): string {
    return this.global.Medias + 'users/' + path;
  }
  getRole(): string {
    return localStorage.getItem('role');
  }
  getId(): string {
    return localStorage.getItem('id');
  }
  getEventMedia(path) {
    return this.global.Medias + 'events/' + path;
  }
  onDeleteEntry(evenement) {
    this.eventService.deleteEvent(evenement).subscribe(
        (evenements: Evenement[] ) => {
          this.evenements = evenements;
          this.evenements.forEach((f, i) => {
            if (f.medias.length > 0) {
              if (f.medias[0].type === 'youtube') {
                f.medias[0].path = this.sanitizer.bypassSecurityTrustResourceUrl(<string>f.medias[0].path);
              }
            }
            this.loading = false;
          });
        }
    );
  }

}
