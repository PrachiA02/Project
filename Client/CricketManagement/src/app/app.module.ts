import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SelectDropDownModule } from 'ngx-select-dropdown'
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
    AddMatchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    SelectDropDownModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent},
      { path: 'home', component: HomeCarouselComponent},
      { path: '', component: HomeCarouselComponent},
      { path: 'signup', component: SignupComponent },
      { path: 'team', component: TeamComponent },
      { path: 'add-team', component: AddTeamComponent },
      { path: 'player', component: PlayerComponent },
      { path: 'add-player', component: AddPlayerComponent},
      { path: 'player-details', component: PlayerDetailsComponent},
      { path: 'team-details', component: TeamDetailsComponent},
      { path: 'add-match', component: AddMatchComponent}
    ])
  ],
  exports: [BsDropdownModule],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
