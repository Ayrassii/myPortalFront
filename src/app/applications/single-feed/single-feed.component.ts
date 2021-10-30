import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FeedService} from '../../services/feed.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Feed} from '../../models/feed';
import {SidebarService} from '../../services/sidebar.service';
import {User} from '../../models/user';

@Component({
    selector: 'app-single-feed',
    templateUrl: './single-feed.component.html',
    styleUrls: ['./single-feed.component.css']
})
export class SingleFeedComponent implements OnInit {
    feed: Feed = new Feed();
    public sidebarVisible = true;
    constructor(private feedService: FeedService,
                private  router: Router,
                private route: ActivatedRoute,
                private sidebarService: SidebarService,
                private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.feedService.getSingleFeed(this.route.snapshot.params.slug).subscribe(
            (res) => {
                this.feed = res['feed'];
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

    getImage(user: User): string {
        if (user) {
            if (user.image) {
                if (user.role === 'ROLE_PROFESSEUR') {
                    return 'https://gestion-scolarite.io/images/professeurs/' + user.image;
                }
            }
            if (user.gendre === 'male') {
                return 'https://gestion-scolarite.io/assets/dist/img/avatar5.png';
            } else {
                return 'https://gestion-scolarite.io/assets/dist/img/avatar2.png';
            }
        }
        return '';
    }

}
