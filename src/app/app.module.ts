import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { VideogameListComponent } from './videogame-list/videogame-list.component';
import { SingleVideogameComponent } from './videogame-list/single-videogame/single-videogame.component';
import { VideogameFormComponent } from './videogame-list/videogame-form/videogame-form.component';
import { HeaderComponent } from './header/header.component';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { VideogamesService } from './services/videogames.service';
import { AuthGuardService } from './services/auth-guard.service';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'videogames', canActivate: [AuthGuardService], component: VideogameListComponent },
  { path: 'videogames/new', canActivate: [AuthGuardService], component: VideogameFormComponent },
  { path: 'videogames/view/:id', canActivate: [AuthGuardService], component: SingleVideogameComponent },
  { path: '', redirectTo: 'videogames', pathMatch: 'full' },
  { path: '**', redirectTo: 'videogames' }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    VideogameListComponent,
    SingleVideogameComponent,
    VideogameFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService, 
    VideogamesService, 
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
