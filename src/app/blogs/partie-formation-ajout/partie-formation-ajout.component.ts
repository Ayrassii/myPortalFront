import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';

@Component({
  selector: 'app-partie-formation-ajout',
  templateUrl: './partie-formation-ajout.component.html',
  styleUrls: ['./partie-formation-ajout.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PartieFormationAjoutComponent,
      multi: true
    }
  ],
})
export class PartieFormationAjoutComponent implements ControlValueAccessor {
  @Input() indice;
  @Input() formationForm: FormGroup;
  onChange: Function;

  constructor( private host: ElementRef<HTMLInputElement> ) {
    this.formationForm.addControl('parties[' + this.indice + '][titre]', new FormControl('', Validators.required));
    this.formationForm.addControl('parties[' + this.indice + '][video]', new FormControl('', Validators.required));
  }

  writeValue( value: null ) {
    // clear file input
    this.host.nativeElement.value = '';
  }

  registerOnChange( fn: Function ) {
    this.onChange = fn;
  }

  registerOnTouched( fn: Function ) {
  }

}
