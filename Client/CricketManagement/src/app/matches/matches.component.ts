import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../matches.service';
import { TeamService } from '../team.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
matches=[];
teams=[];
  constructor(private matchService:MatchesService,
    private teamservice:TeamService,
    private router: Router,
    private userService: UserService) { 
    let teamResponse = this.teamservice.get();
    let matchesResponse = this.matchService.get();
    forkJoin(teamResponse, matchesResponse).subscribe(response=>{
        
      const teamBody = response[0].json();
        this.teams = [];
        teamBody.data.forEach(team => {
          this.teams.push({
            teamId: team.Team_Id,
            teamName:team.Team_Name  
          });
        });

      const matchesBody = response[1].json();
        this.matches = [];
        matchesBody.data.forEach(match => {
          this.matches.push({
            Match_Id: match.Match_Id,
            Team_A:this.getTeamNameByID(match.Team_A),
            Team_B:this.getTeamNameByID(match.Team_B),
            Match_Name: match.Match_Name,
            Match_Type: match.Match_Type,
            Match_Date: match.Match_Date,
            Match_Stadium: match.Match_Stadium,
            Match_Location: match.Match_Location,
            Match_Status: match.Match_Status,
            Match_Result: match.Match_Result,
            Winning_Team: this.getTeamNameByID(match.Winning_Team)
          });
        });
      });

      this.teamservice.get().subscribe(response=>{
        
      });
  }

  ngOnInit() {
  }
  getTeamNameByID(Id :number){
    let teamName;
    this.teams.forEach(team => {
      if(Id===team.teamId){
        teamName = team.teamName;
      }
    });
    return teamName;
  }

  onUpdateScore(match) {
    this.router.navigate(['/update-score'], { queryParams: { id: match.Match_Id } });
  }

  isUserLoggedIn(){
    return this.userService.isUserLogin();
  }
}
