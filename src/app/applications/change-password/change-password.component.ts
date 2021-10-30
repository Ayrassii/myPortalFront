import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SidebarService} from '../../services/sidebar.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  errorMsg: string;
  successMsg: string;
  changePassForm: FormGroup;
  loading = false;
  public sidebarVisible = true;

  constructor(private sidebarService: SidebarService,
              private cdr: ChangeDetectorRef,
              private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService) {
  }

  toggleFullWidth() {
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.initChangePassForm();
  }

  initChangePassForm() {
    this.changePassForm = this.formBuilder.group({
      old: ['', [Validators.required, Validators.minLength(6)]],
      new: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmitChangePass() {
    this.loading = true;
    const old = this.changePassForm.get('old').value;
    const nouveau = this.changePassForm.get('new').value;
    const confirm = this.changePassForm.get('confirm').value;
    this.authService.changePassword(old, nouveau, confirm).subscribe(
        (res) => {
          if (res['error']) {
            this.errorMsg = res['error'];
            this.initChangePassForm();
            this.loading = false;
          }
          if (res['success']) {
            this.successMsg = res['success'];
            this.initChangePassForm();
            this.loading = false;
          }
        },
        (err) => {
          this.errorMsg = err;
          this.initChangePassForm();
          this.loading = false;
        }
    );
  }

}
