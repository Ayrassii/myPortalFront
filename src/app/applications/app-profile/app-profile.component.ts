import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {SidebarService} from '../../services/sidebar.service';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';

@Component({
  selector: 'app-app-profile',
  templateUrl: './app-profile.component.html',
  styleUrls: ['./app-profile.component.css']
})
export class AppProfileComponent implements OnInit {

  loading: boolean;
  user: User;
  public sidebarVisible = true;

  constructor(private sidebarService: SidebarService,
              private cdr: ChangeDetectorRef,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) {
  }

  toggleFullWidth() {
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.loading = true;
    this.authService.profile(this.route.snapshot.params.cin).subscribe(
        (response) => {
          this.user = response['user'];
          this.loading = false;
        },
        () => {
          this.router.navigate(['authentication/page-404']);
        }
    );
  }

  getRole(user?: User): string {
    if (user.role === 'ROLE_PROFESSEUR') {
      return 'Professeur';
    } else {
      return 'Etudiant';
    }

  }
  getImage(user?: User): string {
    if (user.image) {
      if (this.getRole(user) === 'Professeur') {
        return 'https://gestion-scolarite.io/images/professeurs/' + user.image;
      } else {
        return 'https://gestion-scolarite.io/images/etudiants/' + user.image;
      }
    }
    if (user.gendre === 'male') {
      return 'https://gestion-scolarite.io/assets/dist/img/avatar5.png';
    } else {
      return 'https://gestion-scolarite.io/assets/dist/img/avatar2.png';
    }
  }

}
