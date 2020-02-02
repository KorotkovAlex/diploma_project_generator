import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './view/auth/auth.component';
import { AdminComponent } from './view/admin/admin.component';
import { FormsComponent } from './view/forms/forms.component';
import { AuthGuardService as AuthGuard } from './view/auth/auth-guard.service';
import { AuthService } from './view/auth/auth.service';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'form', component: FormsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
