
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsValidationComponent } from './forms-validation/forms-validation.component';
import { RouterModule } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { FormsBasicComponent } from './forms-basic/forms-basic.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
	declarations: [FormsValidationComponent, FormsBasicComponent],
	imports: [
		CommonModule,
		RouterModule,
		NgxEchartsModule,
		NgMultiSelectDropDownModule,
		FormsModule,
		NgbModule
	]
})
export class FormModule { }
