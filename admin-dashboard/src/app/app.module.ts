import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './view/auth/auth.module';
import { AdminModule } from './view/admin/admin.module';
import { FormsComponent } from './view/forms/forms.component';
import { AuthService } from './view/auth/auth.service';
import { AuthGuardService } from './view/auth/auth-guard.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [AppComponent, FormsComponent],
  imports: [BrowserModule, AppRoutingModule, AuthModule, AdminModule, FormsModule, NgbModule],
  providers: [AuthService, AuthGuardService, JwtHelperService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
