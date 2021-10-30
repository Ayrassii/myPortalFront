import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SidebarService} from '../../services/sidebar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormationService} from '../../services/formation.service';
import {IMedia} from '../../interfaces/imedia';
import {Formation} from '../../models/formation';
import {Partieformation} from '../../models/partieformation';
import {VgAPI} from 'videogular2/compiled/src/core/services/vg-api';
import {ProgressionEtudiant} from '../../models/progressionetudiant';

@Component({
    selector: 'app-single-formation',
    templateUrl: './single-formation.component.html',
    styleUrls: ['./single-formation.component.css']
})
export class SingleFormationComponent implements OnInit {
    api: VgAPI;
    loading = true;
    playlist: Array<IMedia> = [];
    formation: Formation;
    currentIndex = 0;
    currentItem: IMedia;
    public sidebarVisible = true;
    constructor(private sidebarService: SidebarService,
                private cdr: ChangeDetectorRef,
                private router: Router,
                private route: ActivatedRoute,
                private formationService: FormationService) {
    }


    ngOnInit() {
        this.formationService.getSingleFormation(this.route.snapshot.params.slug).subscribe(
            (res) => {
                this.formation = res['formation'];
                this.formation.partieformations.forEach(
                    (el: Partieformation) => {
                        const prog = el.progressionetudiants.find(
                            (elemen: ProgressionEtudiant) => {
                                return elemen.partie_formation_id === el.id;
                            }
                        ) ? el.progressionetudiants.find(
                            (elemen: ProgressionEtudiant) => {
                                return elemen.partie_formation_id === el.id;
                            }
                        ).progress : 0;
                        const time =  el.progressionetudiants.find(
                            (elemen: ProgressionEtudiant) => {
                                return elemen.partie_formation_id === el.id;
                            }
                        ) ? el.progressionetudiants.find(
                            (elemen: ProgressionEtudiant) => {
                                return elemen.partie_formation_id === el.id;
                            }
                            ).time : 1;
                            this.playlist.push({
                                id: el.id,
                                title: el.titre,
                                src: 'https://gestion-scolarite.io/api/' + el.uuid + '/view?token=' + localStorage.getItem('token'),
                                type: 'video/mp4',
                                progress: prog,
                                time: time
                            });
                    }
                );
                this.currentIndex = 0;
                this.currentItem = this.playlist[ this.currentIndex ];
                this.loading = false;
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
        this.api.getDefaultMedia().subscriptions.loadedData.subscribe(
            () => {
                this.api.getDefaultMedia().currentTime = this.currentItem.progress;
            }
        );
        this.api.getDefaultMedia().subscriptions.pause.subscribe(
            () => {
                console.log(this.api.getDefaultMedia().currentTime);
                console.log(this.api.getDefaultMedia().duration);
                this.formationService.progressEtudiant(this.currentItem.id,
                    this.api.getDefaultMedia().currentTime, this.api.getDefaultMedia().duration).subscribe();
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
    onRightClick() {
        return false;
    }
    getProgessPourcentage(item: IMedia) {
        return (item.progress * 100 / item.time);
    }

}
