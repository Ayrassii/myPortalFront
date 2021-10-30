import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
	selector: 'app-page-login',
	templateUrl: './page-login.component.html',
	styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {
	successMessage = '0';
	LoginForm: FormGroup;
	errorMessage: string;
	constructor(private formBuilder: FormBuilder,
				private authService: AuthService,
				private route: ActivatedRoute,
				private router: Router) { }

	ngOnInit() {
		this.route.queryParams
			.filter(params => params.mailsuccess)
			.subscribe(params => {
				this.successMessage = params.mailsuccess;
			});
		this.initForm();
	}

	initForm() {
		this.LoginForm = this.formBuilder.group(
			{
				username: ['', [Validators.required]],
				password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,}$')]]
			}
		);
	}
	onSubmit() {
		this.errorMessage = null;
		const username = this.LoginForm.get('username').value;
		const password = this.LoginForm.get('password').value;
		this.authService.signinUser(username, password).subscribe(
			(response) => {
				if (response['error']) {
					this.errorMessage = response['error'];
					this.initForm();
				} else {
					localStorage.setItem('token', response['access_token']);
					localStorage.setItem('role', response['role']);
					localStorage.setItem('cin', response['cin']);
					localStorage.setItem('date-login', Date.now().toString());
					this.router.navigate(['app', 'index']);
				}
			},
			() => {
				this.errorMessage = 'Login ou Mot de passe Incorrect';
				this.initForm();
			}
		);
	}
	closeAlert() {
		this.errorMessage = '';
		this.successMessage = '0';
	}
}
