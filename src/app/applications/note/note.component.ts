import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Abscence} from '../../models/abscence';
import {SidebarService} from '../../services/sidebar.service';
import {AbscenceService} from '../../services/abscence.service';
import {NoteService} from '../../services/note.service';
import {Note} from '../../models/note';
import {Router} from '@angular/router';
import {Devoir} from '../../models/devoir';
import {DevoirService} from '../../services/devoir.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  devoir: Devoir;
  detailsopened = false;
  devoirs: Devoir[] = [];
  loading = true;
  notes: Note[] = [];
  public sidebarVisible = true;

  constructor(private sidebarService: SidebarService,
              private cdr: ChangeDetectorRef,
              private router: Router,
              private note: NoteService,
              private devoirService: DevoirService) {
  }

  ngOnInit() {
    if (this.getRole() === 'ROLE_PROFESSEUR') {
      this.devoirService.getDevoirsForProfesseur().subscribe(
          (res) => {
            this.devoirs = res ['devoirs'];
            this.loading = false;
          }
      );
    } else if (this.getRole() === 'ROLE_ETUDIANT') {
      this.note.getNotes().subscribe(
          (res) => {
            this.notes = res['notes'];
            this.loading = false;
          },
          (err) => {
            if (err.status === 401) {
              this.router.navigate(['authentication/page-403']);
            }
          }
      );
    }
  }

  toggleFullWidth() {
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    this.cdr.detectChanges();
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

  getDate(x: string): Date {
    return new Date(x);
  }

  getRole() {
    return localStorage.getItem('role');
  }

  calculMoyenne(devoir: Devoir) {
    if (devoir.notes.length === 0) {
      return 0;
    }
    let somme = 0;
    devoir.notes.forEach(el => somme += el.mark);
    return (somme / devoir.notes.length).toFixed(2);
  }

  details(devoir) {
    this.devoir = devoir;
    this.detailsopened = true;
  }

  getDevoirs() {
    this.detailsopened = false;
  }

}
