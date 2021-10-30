import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {AuthGuardService} from './services/auth-guard.service';

export const routes: Routes = [
    { path: '', redirectTo: 'app', pathMatch: 'full'},
    { path: 'app', canActivateChild: [AuthGuardService],
        canActivate: [AuthGuardService], loadChildren: () => import('app/admin/admin.module').then(m => m.AdminModule) },
    { path: 'authentication', loadChildren: () => import('app/authentication/authentication.module').then(m => m.AuthenticationModule) },
    { path: '**' , redirectTo: 'authentication/page-404', pathMatch: 'full' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: false });
