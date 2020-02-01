import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './view/auth/auth.module';
import { AdminModule } from './view/admin/admin.module';
import { FormsComponent } from './view/forms/forms.component';
@NgModule({
  declarations: [AppComponent, FormsComponent],
  imports: [BrowserModule, AppRoutingModule, AuthModule, AdminModule, FormsModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
