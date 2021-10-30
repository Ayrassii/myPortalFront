import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';

import { FileDocumentsComponent } from './file-documents/file-documents.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { FileMediaComponent } from './file-media/file-media.component';
import { FileImagesComponent } from './file-images/file-images.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [FileDocumentsComponent, FileManagerComponent, FileMediaComponent, FileImagesComponent],
	imports: [
		CommonModule,
		NgxEchartsModule,
		RouterModule
	]
})
export class FileManagerModule { }
