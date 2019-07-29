import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  name = '';
  country = '';
  teamIcon: any;
  imageUrl: any;

  constructor(private teamService: TeamService,
    private router: Router) { }

  ngOnInit() {
  }

  onSelectTeamIcon(event) {
    this.teamIcon = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
    reader.readAsDataURL(this.teamIcon);
  }

  onAdd() {
    if (this.name === undefined ||
      this.name.length === 0) {
      alert('Please enter name');
    } else if (this.country === undefined ||
      this.country.length === 0) {
      alert('Please enter Country');
    } else if (this.teamIcon === undefined ||
      this.teamIcon.length === 0) {
      alert('Please select TeamIcon');
    } else {
      this.teamService
        .post(this.teamIcon, this.name, this.country)
        .subscribe(response => {
          console.log(response);
          const body = response.json();
          if (body['status'] == 'success') {
            this.name = '';
            this.country = '';
            this.imageUrl = undefined;
            this.teamIcon = undefined;
            this.onCancel();
          } else {
            alert(body['error']);
          }
        });
    }
  }

  onCancel() {
    this.router.navigate(['/team']);
  }

}
