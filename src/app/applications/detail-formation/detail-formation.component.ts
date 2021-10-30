import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {VgAPI} from 'videogular2/compiled/src/core/services/vg-api';
import {IMedia} from '../../interfaces/imedia';
import {Formation} from '../../models/formation';
import {SidebarService} from '../../services/sidebar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormationService} from '../../services/formation.service';
import {Partieformation} from '../../models/partieformation';
import {EtudiantService} from '../../services/etudiant.service';
import {User} from '../../models/user';
import {ProgressionEtudiant} from '../../models/progressionetudiant';

@Component({
  selector: 'app-detail-formation',
  templateUrl: './detail-formation.component.html',
  styleUrls: ['./detail-formation.component.css']
})
export class DetailFormationComponent implements OnInit {
  api: VgAPI;
  loading = true;
  playlist: Array<IMedia> = [];
  formation: Formation;
  currentIndex;
  currentItem: IMedia;
  etudiants: User[];
  public sidebarVisible = true;
  constructor(private sidebarService: SidebarService,
              private cdr: ChangeDetectorRef,
              private router: Router,
              private route: ActivatedRoute,
              private etudiantService: EtudiantService,
              private formationService: FormationService) {
  }


  ngOnInit() {
    this.formationService.getSingleFormation(this.route.snapshot.params.slug).subscribe(
        (res) => {
          this.formation = res['formation'];
          this.formation.partieformations.forEach(
              (el: Partieformation) => {
                this.playlist.push({
                  id: el.id,
                  title: el.titre,
                  src: 'https://gestion-scolarite.io/api/' + el.uuid + '/view?token=' + localStorage.getItem('token'),
                  type: 'video/mp4',
                });
              }
          );
          this.currentIndex = 0;
          this.currentItem = this.playlist[ this.currentIndex ];
          this.etudiantService.getEtudiantsByNiveau(this.formation.niveau.id).subscribe(
              (result) => {
                this.etudiants = result['etudiants'];
                this.loading = false;
              }
          );
        },
        (err) => {
          if (err.status === 401 ) {
            this.router.navigate(['authentication', 'page-403']);
          }
        }
    );
  }
  toggleFullWidth() {
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    this.cdr.detectChanges();
  }
  onClickPlaylistItem(item: IMedia) {
    this.currentIndex = this.playlist.indexOf(item);
    this.currentItem = item;
  }
  onPlayerReady(api: VgAPI) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.ended.subscribe(
        this.nextVideo.bind(this)
    );
  }
  nextVideo() {
    this.currentIndex++;
    if (this.currentIndex === this.playlist.length) {
      this.currentIndex = 0;
    }

    this.currentItem = this.playlist[ this.currentIndex ];
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

  calculProgress(formation: Formation, etudiant: User) {
    let progress = 0;
    formation.partieformations.forEach(
        (el: Partieformation) => {
          if (el.progressionetudiants.length > 0) {
            progress += el.progressionetudiants.find(
                (elemen: ProgressionEtudiant) => {
                  return elemen.partie_formation_id === el.id && elemen.user_id === etudiant.id;
                }
            ) ? el.progressionetudiants.find(
                (elemen: ProgressionEtudiant) => {
                  return elemen.partie_formation_id === el.id && elemen.user_id === etudiant.id;
                }
            ).progress : 0;
          } else {
            progress += 0;
          }
        }
    );
    return Math.round((progress / formation.duration) * 100);
  }
}
