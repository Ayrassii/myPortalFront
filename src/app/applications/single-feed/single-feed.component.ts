import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FeedService} from '../../services/feed.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Feed} from '../../models/feed';
import {SidebarService} from '../../services/sidebar.service';
import {User} from '../../models/user';
import {DomSanitizer} from '@angular/platform-browser';
import {Globals} from '../../Globals';
import {AuthService} from '../../services/auth.service';
import {Evenement} from '../../models/evenement';
import {Article} from '../../models/article';

@Component({
    selector: 'app-single-feed',
    templateUrl: './single-feed.component.html',
    styleUrls: ['./single-feed.component.css']
})
export class SingleFeedComponent implements OnInit {
    feed: Feed = new Feed();
    commentclicked = false;
    loading = true;
    mycomment: string;
    is_liked: boolean;
    @ViewChild('commentinput', {static: false}) commentInput: ElementRef;
    public sidebarVisible = true;
    constructor(private feedService: FeedService,
                private router: Router,
                private authService: AuthService,
                private route: ActivatedRoute,
                private sanitizer: DomSanitizer,
                private global: Globals,
                private sidebarService: SidebarService,
                private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.feedService.getSingleFeed(this.route.snapshot.params.id).subscribe(
            (res: Feed) => {
                this.feed = res;
                if (this.feed.medias.length > 0) {
                    if (this.feed.medias[0].type === 'youtube') {
                        this.feed.medias[0].path = this.sanitizer.bypassSecurityTrustResourceUrl(<string>this.feed.medias[0].path);
                    }
                }
                const like = this.feed.likes.find(l => l.user_id === parseInt(localStorage.getItem('id'), 10));
                if (like) { this.is_liked = true; } else { this.is_liked = false; }
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

    getFeedMedia(path) {
        return this.global.Medias + 'feeds/' + path;
    }
    getUserMedia(path) {
        return this.global.Medias + 'users/' + path;
    }
    onCommentClick() {
        this.commentclicked = !this.commentclicked;
        window.scrollTo({left: 0, top: document.body.scrollHeight, behavior: 'smooth'});
    }
    doTextareaValueChange(event) {
        try {
            this.mycomment = event.target.value;
        } catch (e) {
            console.log('could not set textarea-value');
        }
    }

    onCommentSubmit() {
        console.log(this.mycomment);
        this.feedService.commentFeed(this.mycomment, this.feed.id).subscribe(
            (res: Feed) => {
                this.feed = res;
                if (this.feed.medias.length > 0) {
                    if (this.feed.medias[0].type === 'youtube') {
                        this.feed.medias[0].path = this.sanitizer.bypassSecurityTrustResourceUrl(<string>this.feed.medias[0].path);
                    }
                }
                this.mycomment = '';
                this.commentInput.nativeElement.value = '';
            }
        );
    }

    onCommentDelete(comment_id) {
        this.authService.deleteComment(comment_id).subscribe(
            (res: Feed) => {
                this.feed = res;
                if (this.feed.medias.length > 0) {
                    if (this.feed.medias[0].type === 'youtube') {
                        this.feed.medias[0].path = this.sanitizer.bypassSecurityTrustResourceUrl(<string>this.feed.medias[0].path);
                    }
                }
            }
        );
    }

    onCommentUpdate(comment) {
        this.authService.editComment(comment.id, comment.content).subscribe(
            (res: Feed) => {
                this.feed = res;
                if (this.feed.medias.length > 0) {
                    if (this.feed.medias[0].type === 'youtube') {
                        this.feed.medias[0].path = this.sanitizer.bypassSecurityTrustResourceUrl(<string>this.feed.medias[0].path);
                    }
                }
                this.feed.comments.forEach(c => c.is_editing = false);
            }
        );
    }

    onEditComment(comment) {
        comment.is_editing = !comment.is_editing;
    }

    onLikeSubmit() {
        this.feedService.likeFeed(this.feed.id).subscribe(
            (res: Feed) => {
                this.feed.likes = res.likes;
                this.feed.likes_count = res.likes_count;
                const like = this.feed.likes.find(l => l.user_id === parseInt(localStorage.getItem('id'), 10));
                if (like) { this.is_liked = true; } else { this.is_liked = false; }
            }
        );
    }

    getId() {
        return localStorage.getItem('id');
    }

}
