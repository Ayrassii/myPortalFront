import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {SidebarService} from '../../services/sidebar.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from '@angular/forms';
import {FeedService} from '../../services/feed.service';
import {QuestionService} from '../../services/question.service';
import {EventService} from '../../services/event.service';
import {DatePipe} from '@angular/common';
import {Globals} from '../../Globals';
import {DomSanitizer} from '@angular/platform-browser';
import {AuthService} from '../../services/auth.service';
import {Evenement} from '../../models/evenement';
import {Article} from '../../models/article';
import {ArticleService} from '../../services/article.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit, OnDestroy {
  success = false;
  loading = true;
  articles: Article[] = [];
  farticle: Article;
  articleSubscription = new Subscription();
  public sidebarVisible = false;
  constructor(private sidebarService: SidebarService,
              private cdr: ChangeDetectorRef,
              private articleService: ArticleService,
              private datePipe: DatePipe,
              private global: Globals,
              private sanitizer: DomSanitizer,
              private authService: AuthService) { }

  ngOnInit() {
    this.articleSubscription = this.articleService.getArticlesFromServer().subscribe(
        (res: Article[]) => {
          this.articles = res;
          this.articles.forEach((f, i) => {
            if (f.medias.length > 0) {
              if (f.medias[0].type === 'youtube') {
                f.medias[0].path = this.sanitizer.bypassSecurityTrustResourceUrl(<string>f.medias[0].path);
              }
            }
          });
          this.farticle = this.articles[0];
        }
    );
  }

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe();
  }

  toggleFullWidth() {
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    this.cdr.detectChanges();
  }

  getArticleMedia(path) {
    return this.global.Medias + 'articles/' + path;
  }

}
