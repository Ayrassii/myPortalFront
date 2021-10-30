import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  errorMessage: string;
  successMessage: string;
  token: string;
  resetForm: FormGroup;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit() {
    if (this.route.snapshot.params.token) {
      this.token = this.route.snapshot.params.token;
      this.initResetForm();
    } else {
      this.router.navigate(['/authentication/page-forgot-password']);
    }
  }

  onSubmit(resetcredentials) {
    this.authService.reset(resetcredentials).subscribe(
        (res) => {
            if (res['success']) {
              this.successMessage = res['success'];
              this.initResetForm();
            }
            if (res['error']) {
              this.errorMessage = res['error'];
              this.initResetForm();
            }
        }
    );
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirmPass = group.controls.password_confirmation.value;

    return pass === confirmPass ? null : { notSame: true };
  }
  closeAlert() {
    this.errorMessage = '';
    this.successMessage = '';
  }
  initResetForm() {
    this.resetForm = this.formBuilder.group(
        {
          email: [null, [Validators.required, Validators.email]],
          token: [this.token, [Validators.required]],
          password: [null, [Validators.required, Validators.minLength(8)]],
          password_confirmation: [null, Validators.required]
        }, {validator: this.checkPasswords });
  }
}
