import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './view/auth/auth.component';
import { FormsComponent } from './view/forms/forms.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'admin', loadChildren: () => import('./view/admin/admin.module').then(m => m.AdminModule) },
  { path: 'form', component: FormsComponent },
  { path: '**', redirectTo: 'admin' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
