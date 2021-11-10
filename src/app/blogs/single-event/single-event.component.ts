import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SidebarService} from '../../services/sidebar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../services/event.service';
import {Evenement} from '../../models/evenement';
import {Globals} from '../../Globals';
import {NotifService} from '../../services/notif.service';

@Component({
  selector: 'app-single-event',
  templateUrl: './single-event.component.html',
  styleUrls: ['./single-event.component.css']
})
export class SingleEventComponent implements OnInit {
  public sidebarVisible = false;
  evenement: Evenement;
  commentclicked = false;
  @ViewChild('scrollMe', {static: false}) private scrollMe: ElementRef;
  constructor(private sidebarService: SidebarService,
              private eventService: EventService,
              private cdr: ChangeDetectorRef,
              private router: Router,
              private notifService: NotifService,
              private route: ActivatedRoute,
              private global: Globals,
  ) { }

  ngOnInit() {
    this.eventService.getSingleEvent(this.route.snapshot.params.id).subscribe(
        (res: Evenement) => {
          this.evenement = res;
        },
        (err) => {
          if (err.status === 401) {
            this.router.navigate(['authentication/page-403']);
          }
        }
    );
    this.route.queryParams.subscribe(params => {
      if (params['notif_id']) {
        this.notifService.readNotif(params['notif_id']).subscribe();
      }
    });
  }
  toggleFullWidth() {
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    this.cdr.detectChanges();
  }
  getEventMedia(path) {
    return this.global.Medias + 'events/' + path;
  }
  getUserMedia(path) {
    return this.global.Medias + 'users/' + path;
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

  onCommentClick() {
    this.commentclicked = !this.commentclicked;
    window.scrollTo({left: 0, top: document.body.scrollHeight, behavior: 'smooth'});
  }

}
