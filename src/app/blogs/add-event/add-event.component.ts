import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SidebarService} from '../../services/sidebar.service';
import {Router} from '@angular/router';
import {ArticleService} from '../../services/article.service';
import {requiredFileType} from '../../../shared/requiredfiletype';
import {EventService} from '../../services/event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  type = 'public';
  progress = 0;
  success = false;
  medias = [];
  nbr_medias = 0;
  articleForm: FormGroup;
  description: string;
  public sidebarVisible = true;
  public config: object = {
    items: [
      'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
      'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
      'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
      'Indent', 'Outdent', '|', 'CreateLink', 'CreateTable',
      'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
  };
  constructor(private sidebarService: SidebarService,
              private cdr: ChangeDetectorRef,
              private router: Router,
              private formBuilder: FormBuilder,
              private eventService: EventService) {
  }

  ngOnInit() {
    this.initArticleForm();
  }

  toggleFullWidth() {
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    this.cdr.detectChanges();
  }
  getRole() {
    return localStorage.getItem('role');
  }

  onArticleSubmit(article) {
    article.medias.forEach((m, i) => {
      if (m.type === 'youtube') {
        m.path = this.genEmbedYoutube(m.path);
      }
    });
    this.eventService.addEvent(article).subscribe(r => this.router.navigate(['app', 'events']));
  }

  onRemoveMedia(index) {
    const medias = this.articleForm.controls.medias as FormArray;
    medias.removeAt(index);
    this.nbr_medias--;
  }

  getformArray() { return <FormArray>this.articleForm.get('medias'); }

  initArticleForm() {
    this.articleForm = this.formBuilder.group(
        {
          title: ['', [Validators.required, Validators.minLength(5)]],
          start_date: [Date(), Validators.required],
          end_date: [Date(), Validators.required],
          description: [],
          medias: new FormArray([]),
        }
    );
  }
  genEmbedYoutube(url: string) {
    return url.split('?v=')[1];
  }

  GenererMediasform() {
    this.nbr_medias = this.nbr_medias ++;
    const medias = this.articleForm.controls.medias as FormArray;
    medias.push(this.formBuilder.group({
      type: ['', [Validators.required, Validators.minLength(5)]],
      path: [null],
      file: [null, [requiredFileType(['mp4', 'avi', 'jpg', 'png'])]]
    }));
  }

}
