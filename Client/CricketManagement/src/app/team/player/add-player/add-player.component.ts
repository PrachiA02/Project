import { Component, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/players.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {

  name = '';
  playerPhoto: any;
  imageUrl: any;
  birthDate: string;
  age: number;
  majorTeams: string;
  playingRole: string;
  batingStyle: string;
  bowlingStyle: string;
  nativePlace: string;
  description: string;

  constructor(private playerService: PlayersService,
    private router: Router) { }

  ngOnInit() {
  }

  onSelectPlayerPhoto(event) {
    this.playerPhoto = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
    reader.readAsDataURL(this.playerPhoto);
  }

  onAdd() {
    this.playerService
      .post(this.playerPhoto, this.name, this.birthDate, this.age, this.majorTeams, this.playingRole, this.batingStyle, this.bowlingStyle,this.nativePlace, this.description)
      .subscribe(response => {
        console.log(response);
        const body  = response.json();
        if (body['status'] == 'success') {
          this.name = '';
          this.imageUrl = undefined;
          this.playerPhoto = undefined;
          this.onCancel();
        } else {
          alert(body['error']);
        }
      });
  }

  onCancel() {
    this.router.navigate(['/player']);
  }
}
