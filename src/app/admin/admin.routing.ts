import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { IndexComponent } from './index/index.component';
import { AppCalendarComponent } from '../applications/app-calendar/app-calendar.component';
import { PageLeafletComponent } from '../maps/page-leaflet/page-leaflet.component';
import {BlogListComponent} from '../blogs/blog-list/blog-list.component';
import {PageBlankComponent} from '../pages/page-blank/page-blank.component';
import {AppNotifComponent} from '../applications/app-notif/app-notif.component';
import {PageProfileComponent} from '../pages/page-profile/page-profile.component';
import {AppAbscenceComponent} from '../applications/app-abscence/app-abscence.component';
import {AppDemandeComponent} from '../applications/app-demande/app-demande.component';
import {NoteComponent} from '../applications/note/note.component';
import {SingleFeedComponent} from '../applications/single-feed/single-feed.component';
import {AppFormationComponent} from '../applications/app-formation/app-formation.component';
import {SingleFormationComponent} from '../applications/single-formation/single-formation.component';
import {BlogPostComponent} from '../blogs/blog-post/blog-post.component';
import {AppProfileComponent} from '../applications/app-profile/app-profile.component';
import {DetailFormationComponent} from '../applications/detail-formation/detail-formation.component';
import {AjoutFormationComponent} from '../blogs/ajout-formation/ajout-formation.component';
import {EmploisComponent} from '../pages/emplois/emplois.component';
import {ChangePasswordComponent} from '../applications/change-password/change-password.component';
import {EditFeedComponent} from '../blogs/edit-feed/edit-feed.component';
import {EditFormationComponent} from '../blogs/edit-formation/edit-formation.component';
import {EventListComponent} from '../blogs/event-list/event-list.component';
import {SingleEventComponent} from '../blogs/single-event/single-event.component';
import {ArticleListComponent} from '../blogs/article-list/article-list.component';
import {AnnuaireComponent} from '../blogs/annuaire/annuaire.component';
import {AppChatComponent} from '../applications/app-chat/app-chat.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: '', redirectTo: 'index'},
            {
                path: 'index', component: BlogListComponent, data: { title: ':: HLI :: App :: Accueil ::' }
            },
            {
                path: 'events', component: EventListComponent, data: { title: ':: HLI :: App :: Evenements ::' }
            },
            {
                path: 'newfeed', component: BlogPostComponent, data: { title: ':: HLI :: App :: Nouvelle Actualite ::' }
            },
            {
                path: 'singlefeed/:id', component: SingleFeedComponent, data: { title: ':: HLI :: App :: Actualite ::' }
            },
            {
                path: 'singleevent/:id', component: SingleEventComponent, data: { title: ':: HLI :: App :: Evenement ::' }
            },
            {
                path: 'articles', component: ArticleListComponent, data: { title: ':: HLI :: App :: Blog ::' }
            },
            {
                path: 'singlearticle/:id', component: ArticleListComponent, data: { title: ':: HLI :: App :: Article ::' }
            },
            {
                path: 'annuaire', component: AnnuaireComponent, data: { title: ':: HLI :: App :: Annuaire ::' }
            },
            {
                path: 'add-annuaire', component: AnnuaireComponent, data: { title: ':: HLI :: App :: Ajouter Employé ::' }
            },
            {
                path: 'blogs',
                children: [
                    { path: '', redirectTo: 'blog-post', pathMatch: 'full' },
                    { path: 'blog-post', component: BlogPostComponent, data: { title: ':: We Learn :: Blog Post :: Blog ::' } },
                    { path: 'blog-list', component: BlogListComponent, data: { title: ':: We Learn :: Blog List :: Blog ::' } },
                ]
            },
            {
                path: 'editfeed/:id', component: EditFeedComponent, data: { title: ':: HLI :: App :: Modifier Post ::' }
            },
            {
                path: 'discussions', component: AppChatComponent, data: { title: ':: HLI :: App :: Discussions ::'}
            },
            {
                path: 'notes', component: NoteComponent, data: { title: ':: HLI :: App :: Notes ::' }
            },
            {
                path: 'formations', component: AppFormationComponent, data: { title: ':: HLI :: App :: Formations ::' }
            },
            {
                path: 'formations/:slug', component: DetailFormationComponent, data: { title: ':: HLI :: App :: Details Formation ::' }
            },
            {
                path: 'single-formation/:slug', component: SingleFormationComponent, data: { title: ':: HLI :: App :: Formation ::' }
            },
            {
                path: 'editformation/:slug', component: EditFormationComponent,
                data: { title: ':: HLI :: App :: Modifier Formation ::' }
            },
            {
                path: 'addformation', component: AjoutFormationComponent, data: { title: ':: HLI :: App :: Ajout Formation ::' }
            },
            {
                path: 'notifications', component: AppNotifComponent, data: { title: ':: HLI :: App :: Notifications ::' }
            },
            {
                path: 'abscences', component: AppAbscenceComponent, data: { title: ':: HLI :: App :: Abscences ::' }
            },
            {
                path: 'profile', component: PageProfileComponent, data: { title: ':: HLI :: App :: Profil ::' }
            },
            {
                path: 'changepassword', component: ChangePasswordComponent, data: { title: ':: HLI :: App :: Changer Mot De Passe ::' }
            },
            {
                path: 'calendrier',
                children: [
                    { path: 'app-calendar', component: AppCalendarComponent, data: { title: ':: HLI :: App :: calendrier ::' } },

                ]
            },
            {
                path: 'emplois',
                children: [
                    {path: '', component: EmploisComponent, data: { title: ':: HLI :: App :: Emploi à venir ::'} },
                    {path: 'current', component: PageBlankComponent, data: { title: ':: HLI :: App :: Emploi de la Semaine ::'} }
                ]
            },
            {
                path: 'demandes', component: AppDemandeComponent, data: { title: ':: HLI :: App :: Demandes ::'}
            },
            {
                path: 'user/:cin', component: AppProfileComponent, data: { title: ':: HLI :: App :: Profile Utilisateur ::'}
            }
        ]
    },
];
export const routing = RouterModule.forChild(routes);

// import { Routes, RouterModule } from '@angular/router';
// import { AdminComponent } from './admin/admin.component';
// import { IndexComponent } from './index/index.component';
// import { InboxComponent } from '../applications/inbox/inbox.component';
// import { ComposeComponent } from '../applications/compose/compose.component';
// import { ContactGridComponent } from '../applications/contact-grid/contact-grid.component';
// import { FileDocumentsComponent } from '../file-manager/file-documents/file-documents.component';
// import { FileMediaComponent } from '../file-manager/file-media/file-media.component';
// import { FileImagesComponent } from '../file-manager/file-images/file-images.component';
// import { TypographyComponent } from '../ui-elements/typography/typography.component';
// import { UiTabsComponent } from '../ui-elements/ui-tabs/ui-tabs.component';
// import { UiButtonsComponent } from '../ui-elements/ui-buttons/ui-buttons.component';
// import { UiBootstrapComponent } from '../ui-elements/ui-bootstrap/ui-bootstrap.component';
// import { UiIconsComponent } from '../ui-elements/ui-icons/ui-icons.component';
// import { UiColorsComponent } from '../ui-elements/ui-colors/ui-colors.component';
// import { UiListGroupComponent } from '../ui-elements/ui-list-group/ui-list-group.component';
// import { UiMediaObjectComponent } from '../ui-elements/ui-media-object/ui-media-object.component';
// import { UiModalsComponent } from '../ui-elements/ui-modals/ui-modals.component'
// import { UiNotificationsComponent } from '../ui-elements/ui-notifications/ui-notifications.component';
// import { AppChatComponent } from '../applications/app-chat/app-chat.component';
// import { TableNormalComponent } from '../tables/table-normal/table-normal.component';
// import { PageBlankComponent } from '../pages/page-blank/page-blank.component';
// import { PageProfileComponent } from '../pages/page-profile/page-profile.component';
// import { PageProfileV2Component } from '../pages/page-profile-v2/page-profile-v2.component';
// import { PageGalleryComponent } from '../pages/page-gallery/page-gallery.component';
// import { PageTimelineComponent } from '../pages/page-timeline/page-timeline.component';
// import { PagePricingComponent } from '../pages/page-pricing/page-pricing.component';
// import { PageInvoicesComponent } from '../pages/page-invoices/page-invoices.component';
// import { PageInvoicesV2Component } from '../pages/page-invoices-v2/page-invoices-v2.component';
// import { PageSearchResultsComponent } from '../pages/page-search-results/page-search-results.component';
// import { PageHelperClassComponent } from '../pages/page-helper-class/page-helper-class.component';
// import { PageTeamsBoardComponent } from '../pages/page-teams-board/page-teams-board.component';
// import { PageProjectsListComponent } from '../pages/page-projects-list/page-projects-list.component';
// import { PageTestimonialsComponent } from '../pages/page-testimonials/page-testimonials.component';
// import { PageFaqComponent } from '../pages/page-faq/page-faq.component';
// import { AppCalendarComponent } from '../applications/app-calendar/app-calendar.component';
// import { ChartEchartComponent } from '../charts/chart-echart/chart-echart.component';
// import { FormsValidationComponent } from '../form/forms-validation/forms-validation.component';
// import { BlogListComponent } from '../blogs/blog-list/blog-list.component';
// import { BlogDetailsComponent } from '../blogs/blog-details/blog-details.component';
// import { FormsBasicComponent } from '../form/forms-basic/forms-basic.component';
// import { WidgetsEcommerceComponent } from '../widgets/widgets-ecommerce/widgets-ecommerce.component';
// import { WidgetsBlogComponent } from '../widgets/widgets-blog/widgets-blog.component';
// import { WidgetsWeatherComponent } from '../widgets/widgets-weather/widgets-weather.component';
// import { WidgetsDataComponent } from '../widgets/widgets-data/widgets-data.component';
// import { IotDashboardComponent } from './iot-dashboard/iot-dashboard.component';
// import { BlogPostComponent } from '../blogs/blog-post/blog-post.component';
// import { PageLeafletComponent } from '../maps/page-leaflet/page-leaflet.component';
//
// const routes: Routes = [
//     {
//         path: '',
//         component: AdminComponent,
//         children: [
//             { path: '', redirectTo: 'dashboard'},
//             {
//                 path: 'dashboard',
//                 children: [
//                     { path: '', redirectTo: 'index', pathMatch: 'full' },
//                     { path: 'index', component: IndexComponent, data: { title: ':: We Learn :: Dashboard :: Analytical ::' } },
//                     { path: 'iot', component: IotDashboardComponent, data: { title: ':: We Learn :: Dashboard :: Analytical ::' } }
//                 ]
//             },
//             {
//                 path: 'app',
//                 children: [
//                     {
//                         path: 'app-inbox',
//                         children: [
//                             { path: '', pathMatch: 'full', component: InboxComponent,
//                                 data: { title: ':: We Learn :: App :: Inbox ::' }  },
//                             { path: 'compose', component: ComposeComponent, data: { title: ':: We Learn :: App :: Compose ::' } }
//                         ]
//                     },
//                     { path: 'app-chat', component: AppChatComponent, data: { title: ':: We Learn :: App :: Chat ::' } },
//                     { path: 'app-contact-grid', component: ContactGridComponent,
//                         data: { title: ':: We Learn :: App :: Contacts ::' } },
//                     { path: 'app-calendar', component: AppCalendarComponent, data: { title: ':: We Learn :: App :: Calendar ::' } },
//
//                 ]
//             },
//             {
//                 path: 'ui-elements',
//                 children: [
//                     { path: '', redirectTo: 'typography', pathMatch: 'full' },
//                     { path: 'typography', component: TypographyComponent,
//                     data: { title: ':: We Learn :: UI Elements :: Typography ::' } },
//                     { path: 'ui-tabs', component: UiTabsComponent, data: { title: ':: We Learn :: UI Elements :: Tabs ::' } },
//                     { path: 'ui-buttons', component: UiButtonsComponent, data: { title: ':: We Learn :: UI Elements :: Buttons ::' } },
//                     { path: 'ui-bootstrap', component: UiBootstrapComponent,
//                         data: { title: ':: We Learn :: UI Elements :: Bootstrap ::' } },
//                     { path: 'ui-icons', component: UiIconsComponent, data: { title: ':: We Learn :: UI Elements :: Icons ::' } },
//                     { path: 'ui-colors', component: UiColorsComponent, data: { title: ':: We Learn :: UI Elements :: Colors ::' } },
//                     { path: 'ui-list-group', component: UiListGroupComponent,
//
//                     data: { title: ':: We Learn :: UI Elements :: Lists ::' } },
//                     { path: 'ui-media-object', component: UiMediaObjectComponent,
//                         data: { title: ':: We Learn :: UI Elements :: Media ::' } },
//                     { path: 'ui-modal', component: UiModalsComponent, data: { title: ':: We Learn :: UI Elements :: Modal ::' } },
//                     { path: 'ui-progressbars', component: UiProgressbarsComponent,
//                         data: { title: ':: We Learn :: UI Elements :: Prograssbars ::' } },
//                     { path: 'ui-notifications', component: UiNotificationsComponent,
//                         data: { title: ':: We Learn :: UI Elements :: Notifications ::' } },
//                 ]
//             },
//             {
//                 path: 'file-manager',
//                 children: [
//                     { path: '', redirectTo: 'file-documents', pathMatch: 'full' },
//                     { path: 'file-documents', component: FileDocumentsComponent,
//                         data: { title: ':: We Learn :: File Manager :: Documents ::' } },
//                     { path: 'file-media', component: FileMediaComponent, data: { title: ':: We Learn :: File Manager :: Media ::' } },
//                     { path: 'file-images', component: FileImagesComponent, data: { title: ':: We Learn :: File Manager :: Images ::' } }
//                 ]
//             },
//             {
//                 path: 'tables',
//                 children: [
//                     { path: '', redirectTo: 'table-normal', pathMatch: 'full' },
//                     { path: 'table-normal', component: TableNormalComponent,
//                         data: { title: ':: We Learn :: Tables :: Normal Tables ::' }  },
//                 ]
//             },
//             {
//                 path: 'pages',
//                 children: [
//                     { path: '', redirectTo: 'page-blank', pathMatch: 'full' },
//                     { path: 'page-blank', component: PageBlankComponent, data: { title: ':: We Learn :: Pages :: Blank ::' }  },
//                     { path: 'page-profile', component: PageProfileComponent, data: { title: ':: We Learn :: Pages :: Profile ::' } },
//                     { path: 'page-profile2', component: PageProfileV2Component,
//                         data: { title: ':: We Learn :: Pages :: Profile - V2 ::' } },
//                     { path: 'page-gallery', component: PageGalleryComponent, data: { title: ':: We Learn :: Pages :: Gallery ::' } },
//                     { path: 'page-timeline', component: PageTimelineComponent, data: { title: ':: We Learn :: Pages :: Timeline ::' } },
//                     { path: 'page-pricing', component: PagePricingComponent, data: { title: ':: We Learn :: Pages :: Pricing ::' } },
//                     { path: 'page-invoices', component: PageInvoicesComponent, data: { title: ':: We Learn :: Pages :: Invoices ::' } },
//                     { path: 'page-invoices2', component: PageInvoicesV2Component,
//                         data: { title: ':: We Learn :: Pages :: Invoices - V2 ::' } },
//                     { path: 'page-search-results', component: PageSearchResultsComponent,
//                         data: { title: ':: We Learn :: Pages :: Search Results ::' } },
//                     { path: 'page-helper-class', component: PageHelperClassComponent,
//                         data: { title: ':: We Learn :: Pages :: Classes ::' } },
//                     { path: 'page-teams-board', component: PageTeamsBoardComponent,
//                         data: { title: ':: We Learn :: Pages :: Team ::' } },
//                     { path: 'page-projects-list', component: PageProjectsListComponent,
//                         data: { title: ':: We Learn :: Pages :: Projects ::' } },
//                     { path: 'page-maintenance', component: PageProjectsListComponent,
//                         data: { title: ':: We Learn :: Pages :: Maintenance ::' } },
//                     { path: 'page-testimonials', component: PageTestimonialsComponent,
//                         data: { title: ':: We Learn :: Pages :: Testimonials ::' } },
//                     { path: 'page-faq', component: PageFaqComponent,
//                         data: { title: ':: We Learn :: Pages :: Faq ::' } },
//                 ]
//             },
//             {
//                 path: 'charts',
//                 children: [
//                     { path: '', redirectTo: 'chart-echarts', pathMatch: 'full' },
//                     { path: 'chart-echarts', component: ChartEchartComponent, data: { title: ':: We Learn :: Charts :: E-Charts ::' } },
//                 ]
//             },
//             {
//                 path: 'forms',
//                 children: [
//                     { path: '', redirectTo: 'forms-validation', pathMatch: 'full' },
//                     { path: 'forms-validation', component: FormsValidationComponent,
//                         data: { title: ':: We Learn :: Form Validations :: Forms ::' } },
//                     { path: 'forms-basic', component: FormsBasicComponent, data: { title: ':: We Learn :: Form Basic :: Forms ::' } }
//                 ]
//             },
//             {
//                 path: 'blogs',
//                 children: [
//                     { path: '', redirectTo: 'blog-post', pathMatch: 'full' },
//                     { path: 'blog-post', component: BlogPostComponent, data: { title: ':: We Learn :: Blog Post :: Blog ::' } },
//                     { path: 'blog-list', component: BlogListComponent, data: { title: ':: We Learn :: Blog List :: Blog ::' } },
//                     { path: 'blog-details', component: BlogDetailsComponent, data: { title: ':: We Learn :: Blog Details :: Blog ::' } }
//                 ]
//             },
//             {
//                 path: 'widgets',
//                 children: [
//                     { path: '', redirectTo: 'widgets-data', pathMatch: 'full' },
//                     { path: 'widgets-data', component: WidgetsDataComponent,
//                     data: { title: ':: We Learn :: Widgets Data :: Widgets ::' } },
//                     { path: 'widgets-weather', component: WidgetsWeatherComponent,
//                         data: { title: ':: We Learn :: Widgets Weather :: Widgets ::' } },
//                     { path: 'widgets-blog', component: WidgetsBlogComponent,
//                     data: { title: ':: We Learn :: Widgets Blog :: Widgets ::' } },
//                     { path: 'widgets-ecommerce', component: WidgetsEcommerceComponent,
//                         data: { title: ':: We Learn :: Widgets eCommerce :: Widgets ::' } }
//                 ]
//             },
//             {
//                 path: 'maps',
//                 children: [
//                     { path: '', redirectTo: 'leaflet', pathMatch: 'full' },
//                     { path: 'leaflet', component: PageLeafletComponent, data: { title: ':: We Learn :: Maps :: Leaflet ::' } },
//                 ]
//             }
//         ]
//     },
// ];
// export const routing = RouterModule.forChild(routes);
