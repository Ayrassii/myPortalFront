import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SidebarService} from '../../services/sidebar.service';
import {AbscenceService} from '../../services/abscence.service';
import {DemandeService} from '../../services/demande.service';
import {Demande} from '../../models/demande';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-app-demande',
  templateUrl: './app-demande.component.html',
  styleUrls: ['./app-demande.component.css']
})
export class AppDemandeComponent implements OnInit {
  presbtnloading: boolean;
  persobtnloading: boolean;
  insbtnloading: boolean;
  incriptionForm: FormGroup;
  presenceForm: FormGroup;
  personnaliseForm: FormGroup;
  loading = true;
  demandes: Demande[];
  public sidebarVisible = true;

  constructor(private sidebarService: SidebarService,
              private cdr: ChangeDetectorRef,
              private router: Router,
              private formBuilder: FormBuilder,
              private demandeService: DemandeService) {
  }

  ngOnInit() {
    this.demandeService.getDemandes().subscribe(
        (res) => {
          this.demandes = res['demandes'];
          this.loading = false;
        },
        (err) => {
          if (err.status === 401) {
            this.router.navigate(['authentication/page-403']);
          }
        }
    );
    this.initInscriptionForm();
    this.initPresenceForm();
    this.initPersonnaliseForm();
  }

  toggleFullWidth() {
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    this.cdr.detectChanges();
  }

  getPresence()  {
    const d =  this.demandes.filter(
        (el: Demande) => {
          return el.type === 'Presence';
        });
    return d[0];
  }
  getInscription()  {
    const d =  this.demandes.filter(
        (el: Demande) => {
          return el.type === 'Inscription';
        });
    return d[0];
  }
  getPersonnalise()  {
    const d =  this.demandes.filter(
        (el: Demande) => {
          return el.type === 'Personnalise';
        });
    return d[0];
  }

  onIncriptionSubmit() {
    this.insbtnloading = true;
    const d = new Demande('Inscription');
    this.demandeService.sendDemande(d).subscribe(
        () => {
          this.demandeService.getDemandes().subscribe(
              (res) => {
                this.demandes = res['demandes'];
                this.presbtnloading = false;
              }
          );
        }
    );
  }
  onPresenceSubmit() {
    this.presbtnloading = true;
    const d = new Demande('Presence');
    this.demandeService.sendDemande(d).subscribe(
        () => {
          this.demandeService.getDemandes().subscribe(
              (res) => {
                this.demandes = res['demandes'];
                this.presbtnloading = false;
              }
          );
        }
    );
  }
  onPersonnaliseSubmit() {
    this.persobtnloading = true;
    const d = new Demande('Personnalise');
    d.description = this.personnaliseForm.get('description').value;
    this.demandeService.sendDemande(d).subscribe(
        () => {
          this.demandeService.getDemandes().subscribe(
              (res) => {
                this.demandes = res['demandes'];
                this.persobtnloading = false;
              }
          );
        }
    );
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
  initInscriptionForm() {
    this.incriptionForm = this.formBuilder.group({});
  }
  initPresenceForm() {
    this.presenceForm = this.formBuilder.group({});
  }
  initPersonnaliseForm() {
    this.personnaliseForm = this.formBuilder.group({
        description: ['', [Validators.required, Validators.minLength(5)]]
    });
  }



}
