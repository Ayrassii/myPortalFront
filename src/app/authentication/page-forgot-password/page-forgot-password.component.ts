import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-page-forgot-password',
    templateUrl: './page-forgot-password.component.html',
    styleUrls: ['./page-forgot-password.component.css']
})
export class PageForgotPasswordComponent implements OnInit {
    forgotForm: FormGroup;
    errorMessage: string;
    constructor(private router: Router,
                private formBuilder: FormBuilder,
                private authService: AuthService) { }
    ngOnInit() {
        this.initForgotForm();
    }

    onSubmit() {
        const mail = this.forgotForm.get('mail').value;
        this.authService.forgot(mail).subscribe(
            (res) => {
                if (res['code'] === 1 ) {
                    this.router.navigate(['/authentication/page-login'], { queryParams: { mailsuccess: '1' } });
                }
                if (res['code'] === 400 ) {
                    this.errorMessage = 'Vous n\'avez pas un compte WeLearn Verifier avec votre établissement';
                    this.initForgotForm();
                }
            }
        );
    }

    initForgotForm() {
        this.forgotForm = this.formBuilder.group(
            {
                mail: [null, [Validators.required, Validators.email]],
            });
    }

    closeAlert() {
        this.errorMessage = '';
    }

}
