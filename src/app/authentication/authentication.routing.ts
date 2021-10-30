import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { PageForgotPasswordComponent } from './page-forgot-password/page-forgot-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageForbiddonErrorComponent } from './page-forbiddon-error/page-forbiddon-error.component';
import { PageMaintananceComponent } from '../pages/page-maintanance/page-maintanance.component';
import {ResetpasswordComponent} from './resetpassword/resetpassword.component';

const routes: Routes = [
    {
        path: '',
        component: AuthenticationComponent,
        children: [
            { path: '', redirectTo: 'page-login', pathMatch: 'full' },
            { path: 'page-login', component: PageLoginComponent, data: { title: 'Connexion :: We Learn' } },
            { path: 'page-forgot-password', component: PageForgotPasswordComponent, data: { title: 'Mot de passe Oublié :: We Learn' } },
            { path: 'page-404', component: PageNotFoundComponent, data: { title: 'Page-404 :: We Learn' } },
            { path: 'page-403', component: PageForbiddonErrorComponent, data: { title: 'Page-403 :: We Learn' } },
            { path: 'password/reset/:token', component: ResetpasswordComponent, data: { title: 'Reset Mot de passe :: We Learn' } },
            // { path: 'page-maintanance', component: PageMaintananceComponent, data: { title: 'maintenance :: We Learn' } },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
