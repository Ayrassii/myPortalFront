import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { FullCalendarModule } from 'ng-fullcalendar';
import { RouterModule } from '@angular/router';

import { InboxComponent } from './inbox/inbox.component';
import { ContactGridComponent } from './contact-grid/contact-grid.component';
import { ComposeComponent } from './compose/compose.component';
import { AppChatComponent } from './app-chat/app-chat.component';
import { AppCalendarComponent } from './app-calendar/app-calendar.component';
import { AppNotifComponent } from './app-notif/app-notif.component';
import { AppAbscenceComponent } from './app-abscence/app-abscence.component';
import { AppDemandeComponent } from './app-demande/app-demande.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NoteComponent} from './note/note.component';
import { SingleFeedComponent } from './single-feed/single-feed.component';
import { AppFormationComponent } from './app-formation/app-formation.component';
import {VgCoreModule} from 'videogular2/compiled/src/core/core';
import {VgControlsModule} from 'videogular2/compiled/src/controls/controls';
import { SingleFormationComponent } from './single-formation/single-formation.component';
import { AppProfileComponent } from './app-profile/app-profile.component';
import { DetailFormationComponent } from './detail-formation/detail-formation.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    InboxComponent,
    ContactGridComponent,
    ComposeComponent,
    AppChatComponent,
    AppCalendarComponent,
    AppNotifComponent,
    AppAbscenceComponent,
    AppDemandeComponent,
    NoteComponent,
    SingleFeedComponent,
    AppFormationComponent,
    SingleFormationComponent,
    AppProfileComponent,
    DetailFormationComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    NgxEchartsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RichTextEditorAllModule,
    FullCalendarModule,
    RouterModule,
    VgCoreModule,
    VgControlsModule,
  ],
  providers: [
      DatePipe
  ]
})
export class ApplicationsModule { }
