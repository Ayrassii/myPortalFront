import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiElementsComponent } from './ui-elements/ui-elements.component';
import { TypographyComponent } from './typography/typography.component';
import { UiTabsComponent } from './ui-tabs/ui-tabs.component';
import { TabExample1Component } from './tab-example1/tab-example1.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { TabExample2Component } from './tab-example2/tab-example2.component';
import { TabsComponent } from './tabs/tabs.component';
import { UiButtonsComponent } from './ui-buttons/ui-buttons.component';
import { UiBootstrapComponent } from './ui-bootstrap/ui-bootstrap.component';
import { UiIconsComponent } from './ui-icons/ui-icons.component';
import { UiColorsComponent } from './ui-colors/ui-colors.component';
import { UiMediaObjectComponent } from './ui-media-object/ui-media-object.component';
import { UiListGroupComponent } from './ui-list-group/ui-list-group.component';
import { UiNotificationsComponent } from './ui-notifications/ui-notifications.component';
import { UiModalsComponent } from './ui-modals/ui-modals.component';
import { CommonElementsModule } from '../common-elements/common-elements.module';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [
		UiElementsComponent,
		TypographyComponent,
		UiTabsComponent,
		TabExample1Component,
		TabExample2Component,
		TabsComponent,
		UiButtonsComponent,
		UiBootstrapComponent,
		UiIconsComponent,
		UiColorsComponent,
		UiMediaObjectComponent,
		UiListGroupComponent,
		UiNotificationsComponent,
		UiModalsComponent
	],
	imports: [
		CommonModule,
		NgxEchartsModule,
		CommonElementsModule,
		RouterModule
	]
})
export class UiElementsModule { }
