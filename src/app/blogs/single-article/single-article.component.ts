import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SidebarService} from '../../services/sidebar.service';
import {Article} from '../../models/article';
import {ArticleService} from '../../services/article.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Globals} from '../../Globals';
import {Feed} from '../../models/feed';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.css']
})
export class SingleArticleComponent implements OnInit {

  article: Article = new Article();
  commentclicked = false;
  mycomment: string;
  is_liked: boolean;
  @ViewChild('commentinput', {static: false}) commentInput: ElementRef;
  public sidebarVisible = true;
  constructor(private articleService: ArticleService,
              private router: Router,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private global: Globals,
              private sidebarService: SidebarService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.articleService.getSingleArticle(this.route.snapshot.params.id).subscribe(
        (res: Article) => {
          this.article = res;
          console.log(this.article);
          if (this.article.medias.length > 0) {
            if (this.article.medias[0].type === 'youtube') {
              this.article.medias[0].path = this.sanitizer.bypassSecurityTrustResourceUrl(<string>this.article.medias[0].path);
            }
          }
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

  getArticleMedia(path) {
    return this.global.Medias + 'articles/' + path;
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
    this.articleService.commentArticle(this.mycomment, this.article.id).subscribe(
        (res: Article) => {
          this.article = res;
          if (this.article.medias.length > 0) {
            if (this.article.medias[0].type === 'youtube') {
              this.article.medias[0].path = this.sanitizer.bypassSecurityTrustResourceUrl(<string>this.article.medias[0].path);
            }
          }
          this.mycomment = '';
          this.commentInput.nativeElement.value = '';
        }
    );
  }

  onLikeSubmit() {
    this.articleService.likeArticle(this.article.id).subscribe(
        (res: Feed) => {
          this.article.likes = res.likes;
          this.article.likes_count = res.likes_count;
          const like = this.article.likes.find(l => l.user_id === parseInt(localStorage.getItem('id'), 10));
          if (like) { this.is_liked = true; } else { this.is_liked = false; }
        }
    );
  }

}
