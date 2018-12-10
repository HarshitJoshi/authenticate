import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import {ButtonSignIn} from './button-sign-in/button-sign-in.component'
import { SubmitButton } from './submit-button/submit-button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewUserFormComponent } from './new-user-form/new-user-form.component';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { TopNavComponent } from './top-nav/top-nav.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent, SubmitButton, NewUserFormComponent, ButtonSignIn, TopNavComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, RouterModule.forRoot([
      {path: 'key-in', component: ButtonSignIn},
      {path: 'register', component: NewUserFormComponent},
      /*{path: '**', component: OopsComponent}*/
    ]), BrowserAnimationsModule, MatInputModule, FormsModule, MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
