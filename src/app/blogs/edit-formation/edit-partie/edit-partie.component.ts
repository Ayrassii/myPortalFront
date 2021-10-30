import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {requiredFileType} from '../../../../shared/requiredfiletype';
import {Partieformation} from '../../../models/partieformation';

@Component({
  selector: 'app-edit-partie',
  templateUrl: './edit-partie.component.html',
  styleUrls: ['./edit-partie.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class EditPartieComponent implements OnInit {
  @Input() editForm: FormGroup;
  @Input() partie: Partieformation;
  selectionne = false;
  srcs;
  constructor(private sanitizer: DomSanitizer,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  findsrc(indice: number): string {
    return this.srcs.find(
        (el) => el.indice === indice
    ) ? this.srcs.find(
        (el) => el.indice === indice
    ).src : '';
  }

  readVideoUrl(event: any, indice) {
    const files = event.target.files;
    if (files && files[0]) {
      this.srcs.push({
        'indice': indice,
        'src': this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(files[0]))
      });
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  editpartie(indice) {
    // const oldparties = this.editForm.controls.oldparties as FormArray;
    // oldparties.push(this.formBuilder.group({
    //   indice: [indice],
    //   titrepartie: ['', [Validators.required, Validators.minLength(5)]],
    //   videopartie: [null, [Validators.required, requiredFileType(['mp4', 'avi'])]]
    // }));
    this.selectionne = true;
  }

}
