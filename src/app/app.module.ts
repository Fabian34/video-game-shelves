import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { VideoGameListComponent } from './video-game-list/video-game-list.component';
import { SingleVideoGameComponent } from './video-game-list/single-video-game/single-video-game.component';
import { VideoGameFormComponent } from './video-game-list/video-game-form/video-game-form.component';
import { HeaderComponent } from './header/header.component';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { VideoGamesService } from './services/video-games.service';
import { AuthGuardService } from './services/auth-guard.service';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'video-games', canActivate: [AuthGuardService], component: VideoGameListComponent },
  { path: 'video-games/new', canActivate: [AuthGuardService], component: VideoGameFormComponent },
  { path: 'video-games/view/:id', canActivate: [AuthGuardService], component: SingleVideoGameComponent },
  { path: '', redirectTo: 'video-games', pathMatch: 'full' },
  { path: '**', redirectTo: 'video-games' }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    VideoGameListComponent,
    SingleVideoGameComponent,
    VideoGameFormComponent,
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
    VideoGamesService, 
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
