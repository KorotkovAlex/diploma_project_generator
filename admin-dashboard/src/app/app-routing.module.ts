import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './view/auth/auth.component';
import { AdminComponent } from './view/admin/admin.component';
import { FormsComponent } from './view/forms/forms.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'form', component: FormsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
