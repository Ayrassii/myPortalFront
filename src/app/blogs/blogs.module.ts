import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { RouterModule } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ProgressComponent } from './progress/progress.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {AjoutFormationComponent} from './ajout-formation/ajout-formation.component';
import { PartieFormationAjoutComponent } from './partie-formation-ajout/partie-formation-ajout.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UiProgressbarsComponent} from './ui-progressbars/ui-progressbars.component';
import { EditFeedComponent } from './edit-feed/edit-feed.component';
import { EditFormationComponent } from './edit-formation/edit-formation.component';
import { EditPartieComponent } from './edit-formation/edit-partie/edit-partie.component';
import { EventListComponent } from './event-list/event-list.component';
import { SingleEventComponent } from './single-event/single-event.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { AnnuaireComponent } from './annuaire/annuaire.component';
import {FullCalendarModule} from 'ng-fullcalendar';


@NgModule({
	declarations: [BlogPostComponent, BlogListComponent, BlogDetailsComponent,
		FileUploadComponent, ProgressComponent, AjoutFormationComponent, PartieFormationAjoutComponent, UiProgressbarsComponent, EditFeedComponent, EditFormationComponent, EditPartieComponent, EventListComponent, SingleEventComponent, ArticleListComponent, AnnuaireComponent],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgxEchartsModule,
        RichTextEditorAllModule,
        NgMultiSelectDropDownModule,
        NgbModule,
        FullCalendarModule
    ]
})
export class BlogsModule { }
