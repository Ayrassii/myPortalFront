import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Case} from '../../models/case';
import {Jour} from '../../models/jour';
import {Seance} from '../../models/seance';
import {SidebarService} from '../../services/sidebar.service';
import {EmploiService} from '../../services/emploi.service';
@Component({
  selector: 'app-emplois',
  templateUrl: './emplois.component.html',
  styleUrls: ['./emplois.component.css']
})
export class EmploisComponent implements OnInit {
  loading: boolean;
  detailsopened =  false;
  singleloading =  true;
  emplois: Case[] = [];
  cases: Case[] = [];
  jours: Jour[] = [];
  seances: Seance[] = [];
  date_debut: string;
  date_fin: string;
  semaine: string;
  public sidebarVisible = true;

  constructor(private sidebarService: SidebarService,
              private cdr: ChangeDetectorRef,
              private emploiService: EmploiService) {
  }

  ngOnInit() {
    this.loading = true;
    this.emploiService.getEmploisFromServer().subscribe(
        (res) => {
          this.emplois = res['emplois'];
          this.loading = false;
        },
        (err) => {
          this.loading = false;
          console.log(err);
        }
    );
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
  getDate(x: string): Date {
    return new Date(x);
  }
  getRole() {
    return localStorage.getItem('role');
  }

  getEmploi(semaine, classe, debut, fin) {
    this.emploiService.getOneEmploi(classe, debut, fin).subscribe(
        (res) => {
          this.cases = res['cases'];
          this.jours = res['jours'];
          this.seances = res['seances'];
          this.date_debut = debut;
          this.date_fin = fin;
          this.semaine = semaine;
          this.detailsopened = true;
          this.singleloading = false;
        }
    );
  }

  genererPDF() {
    this.emploiService.getEmploiPDF(this.semaine, this.date_debut, this.date_fin).subscribe(
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
