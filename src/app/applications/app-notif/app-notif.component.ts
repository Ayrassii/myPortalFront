import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {SidebarService} from '../../services/sidebar.service';
import {NotifService} from '../../services/notif.service';
import {interval, Observable} from 'rxjs';
import {Notif} from '../../models/notif';
import {startWith, switchMap} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-app-notif',
  templateUrl: './app-notif.component.html',
  styleUrls: ['./app-notif.component.css']
})
export class AppNotifComponent implements OnInit {
  @Input() notifs$: Observable<Notif[]>;
  public sidebarVisible = false;
  selectionne: Notif;
  constructor(private sidebarService: SidebarService,
              private modalService: NgbModal,
              private cdr: ChangeDetectorRef,
              private notif: NotifService) { }

  ngOnInit() {
    this.notifs$ = interval(1000)
        .pipe(
            startWith(0),
            switchMap(() => this.notif.getNotifs()),
        );
    this.notif.allRead().subscribe();
  }
  toggleFullWidth() {
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    this.cdr.detectChanges();
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

  openModalSuppression(content, size, notif) {
    this.selectionne = notif;
    this.modalService.open(content, { size: size });
  }
  openModalToutSupprimer(content, size) {
    this.modalService.open(content, { size: size });
  }

  deletenotif() {
    this.notif.deleteNotif(this.selectionne.id).subscribe(
        () => {
          this.selectionne = null;
          this.modalService.dismissAll();
        }
    );
  }
  deleteall() {
    this.notif.deleteAll().subscribe(
        () => {
          this.modalService.dismissAll();
        }
    );
  }

}
