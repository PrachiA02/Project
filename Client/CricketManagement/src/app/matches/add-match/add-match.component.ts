import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/team.service';
import { MatchesService } from 'src/app/matches.service';

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
  matchName: string;
  matchDate: string;
  matchStadium: string;
  matchLocation: string;
  selectedMatchType : any;

  teams = [];
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
    private matchService: MatchesService) {
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
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onAdd() {
    console.log('Vishal Shevale');
    console.log(this.firstTeam[0].teamId);
    console.log(this.secondTeam[0].teamId);
    console.log(this.matchName);
    console.log(this.matchDate);
    console.log(this.matchStadium);
    console.log(this.matchLocation);
    console.log(this.selectedMatchType[0].matchTypeId);
  }
}
