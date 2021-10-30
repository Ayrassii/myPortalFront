import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Abscence} from '../../models/abscence';
import {SidebarService} from '../../services/sidebar.service';
import {Router} from '@angular/router';
import {AbscenceService} from '../../services/abscence.service';
import {Formation} from '../../models/formation';
import {FormationService} from '../../services/formation.service';
import {Partieformation} from '../../models/partieformation';
import {ProgressionEtudiant} from '../../models/progressionetudiant';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../models/user';

@Component({
    selector: 'app-app-formation',
    templateUrl: './app-formation.component.html',
    styleUrls: ['./app-formation.component.css']
})
export class AppFormationComponent implements OnInit {
    loading = true;
    selectionne: Formation;
    formations: Formation[] = [];
    public sidebarVisible = true;
    constructor(private sidebarService: SidebarService,
                private modalService: NgbModal,
                private cdr: ChangeDetectorRef,
                private router: Router,
                private formationService: FormationService) {
    }


    ngOnInit() {
        this.formationService.getFormations().subscribe(
            (res) => {
                this.formations = res['formations'];
                this.loading = false;
            }
        );
    }
    toggleFullWidth() {
        this.sidebarService.toggle();
        this.sidebarVisible = this.sidebarService.getStatus();
        this.cdr.detectChanges();
    }

    calculProgress(formation: Formation) {
        let progress = 0;
        formation.partieformations.forEach(
            (el: Partieformation) => {
                if (el.progressionetudiants.length > 0) {
                    progress += el.progressionetudiants.find(
                        (elemen: ProgressionEtudiant) => {
                            return elemen.partie_formation_id === el.id;
                        }
                    ).progress;
                }
            }
        );
        return Math.round((progress * 100 ) / formation.duration);
    }

    getRole() {
        return localStorage.getItem('role');
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

    openModalSuppression(content, size, formation) {
        this.selectionne = formation;
        this.modalService.open(content, { size: size });
    }
    deleteformation() {
        this.formationService.deleteFormation(this.selectionne.slug).subscribe(
            () => {
                const index: number = this.formations.indexOf(this.selectionne);
                if (index !== -1) {
                    this.formations.splice(index, 1);
                }
                this.modalService.dismissAll();
            }
        );
    }

    getImage(user?: User): string {
        if (user.image) {
            return 'https://gestion-scolarite.io/images/etudiants/' + user.image;
        }
        if (user.gendre === 'male') {
            return 'https://gestion-scolarite.io/assets/dist/img/avatar5.png';
        } else {
            return 'https://gestion-scolarite.io/assets/dist/img/avatar2.png';
        }
    }


}
