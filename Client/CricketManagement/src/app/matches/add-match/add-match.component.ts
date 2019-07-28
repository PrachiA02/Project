import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/team.service';
import { MatchesService } from 'src/app/matches.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.css']
})
export class AddMatchComponent implements OnInit {
  matchTypeDropdownSettings = {};
  teamDropdownSettings = {};
  firstTeam: any;
  secondTeam: any;
  battingTeam: any;
  matchName: string;
  matchStadium: string;
  matchLocation: string;
  selectedMatchType : any;
  
  teams = [];
  teamsForBatting = [];
  matchTypes = [
    {
      matchTypeId: 1,
      matchType: 'One Day'
    }, {
      matchTypeId: 2,
      matchType: 'T20'
    }, {
      matchTypeId: 3,
      matchType: 'Test Match'
    }, {
      matchTypeId: 4,
      matchType: 'IPL'
    }
  ];
  constructor(private teamService: TeamService,
    private matchService: MatchesService, private router: Router) {
    this.teamService
    .get()
    .subscribe(response => {
      const body = response.json();
      this.teams = [];
      body.data.forEach(team => {
        this.teams.push({
          teamId: team.Team_Id,
          teamName: team.Team_Name
        });
      });
    });
   }
  
   ngOnInit() {
    this.matchTypeDropdownSettings = {
      singleSelection: true,
      idField: 'matchTypeId',
      textField: 'matchType',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };
    this.teamDropdownSettings = {
      singleSelection: true,
      idField: 'teamId',
      textField: 'teamName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };
  }
  onItemSelect(team: any) {
    if(this.teamsForBatting.length === 0) {
      this.teamsForBatting = [];
      this.teamsForBatting.push(team);
    } else {
      this.teamsForBatting = [];
      if(this.firstTeam.length > 0){
        this.teamsForBatting.push(this.firstTeam[0]);
      }
      if(this.secondTeam.length > 0){
        this.teamsForBatting.push(this.secondTeam[0]);
      }
      
    }
  }
  onTeamASelect(team: any){
    
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onAdd() {
    this.matchService
    .post(this.matchName,this.firstTeam[0].teamId,
      this.secondTeam[0].teamId,this.selectedMatchType[0].matchType,
      this.matchStadium,this.matchLocation,this.battingTeam[0].teamId).subscribe(response=>{
        console.log(response);
        const body = response.json();
        if(body['status']=='success'){
          
          this.onCancel();
        } else {
          alert(body['error']);
        }
      }); 
  }
  onCancel() {
    this.router.navigate(['/matches']);
  }
  // private getStatusByDates() {
  //   let todaysDate = new Date();
  //   let selectedDate = new Date(this.matchDate);
  //   let todaysDateString = todaysDate.getFullYear()+"-"+todaysDate.getMonth()+"-"+todaysDate.getDate();
  //   let selectedDateString = selectedDate.getFullYear()+"-"+selectedDate.getMonth()+"-"+selectedDate.getDate();
  //   if(todaysDateString === selectedDateString)
  //   {
  //    return "LIVE"; 
  //   } else
  //   {
  //     return "FUTURE";
  //   }
  // }
}
