import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  isGrid = true;
  teams = [];

  constructor(
    private router: Router,
    private teamService: TeamService,
    private userService: UserService
  ) { 
    this.loadTeams();
  }

  ngOnInit() {
  }
  onSelectTeam(team) {
    this.router.navigate(['/team-details'], { queryParams: { id: team.Team_Id } });
  }
  showGrid() {
    this.isGrid = true;
  }
  toggleGrid() {
    this.isGrid = !this.isGrid;
  }
  showList() {
    this.isGrid = false;
  }
  onDelete(team) {
    const result = confirm('Are you sure you want to remove this Team?');
    if (result) {
      this.teamService
        .delete(team.Team_Id)
        .subscribe(response => {
          const body = response.json();
          if (body['status'] == 'success') {
            this.loadTeams();
          }
        })
    }
  }

  loadTeams() {
    this.teamService
      .get()
      .subscribe(response => {
        const body = response.json();
        this.teams = body.data;
      });
  }

  onAddTeam() {
    this.router.navigate(['/add-team']);
  }

  isUserLoggedIn() {
    return this.userService.isUserLogin();
  }
}
