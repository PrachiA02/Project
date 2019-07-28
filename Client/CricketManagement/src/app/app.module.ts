import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AppComponent } from './app.component';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from './user.service';
import { HttpModule } from '@angular/http';
import { SignupComponent } from './login/signup/signup.component';
import { TeamComponent } from './team/team.component';
import { AddTeamComponent } from './team/add-team/add-team.component';
import { PlayerComponent } from './team/player/player.component';
import { AddPlayerComponent } from './team/player/add-player/add-player.component';
import { PlayerDetailsComponent } from './team/player/player-details/player-details.component';
import { TeamDetailsComponent } from './team/team-details/team-details.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatchesComponent } from './matches/matches.component';
import { AddMatchComponent } from './matches/add-match/add-match.component';
import { LiveMatchesComponent } from './matches/live-matches/live-matches.component';
import { UpdateScoreComponent } from './matches/update-score/update-score.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ViewScoreComponent } from './matches/view-score/view-score.component';
import { ViewLiveScoreComponent } from './matches/view-live-score/view-live-score.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeCarouselComponent,
    LoginComponent,
    SignupComponent,
    TeamComponent,
    AddTeamComponent,
    PlayerComponent,
    AddPlayerComponent,
    PlayerDetailsComponent,
    TeamDetailsComponent,
    MatchesComponent,
    AddMatchComponent,
    LiveMatchesComponent,
    UpdateScoreComponent,
    ContactUsComponent,
    ViewScoreComponent,
    ViewLiveScoreComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'home', component: HomeCarouselComponent },
      { path: '', component: HomeCarouselComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'team', component: TeamComponent },
      { path: 'add-team', component: AddTeamComponent, canActivate: [UserService] },
      { path: 'player', component: PlayerComponent },
      { path: 'add-player', component: AddPlayerComponent, canActivate: [UserService] },
      { path: 'player-details', component: PlayerDetailsComponent },
      { path: 'team-details', component: TeamDetailsComponent },
      { path: 'add-match', component: AddMatchComponent, canActivate: [UserService] },
      { path: 'matches', component: MatchesComponent },
      { path: 'update-score', component: UpdateScoreComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'view-score', component: ViewScoreComponent },
      { path: 'view-live-score', component: ViewLiveScoreComponent }
    ])
  ],
  exports: [BsDropdownModule],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
