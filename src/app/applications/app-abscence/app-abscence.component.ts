import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SidebarService} from '../../services/sidebar.service';
import {AbscenceService} from '../../services/abscence.service';
import {Abscence} from '../../models/abscence';
import {Router} from '@angular/router';

@Component({
  selector: 'app-app-abscence',
  templateUrl: './app-abscence.component.html',
  styleUrls: ['./app-abscence.component.css']
})
export class AppAbscenceComponent implements OnInit {
  loading = true;
  abscences: Abscence[] = [];
  public sidebarVisible = true;

  constructor(private sidebarService: SidebarService,
              private cdr: ChangeDetectorRef,
              private router: Router,
              private abscence: AbscenceService) {
  }

  ngOnInit() {
    this.abscence.getAbscences().subscribe(
        (res) => {
          this.abscences = res['abscences'];
          this.loading = false;
        },
        (err) => {
          if (err.status === 401) {
            this.router.navigate(['authentication/page-403']);
          }
        }
    );
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

}
