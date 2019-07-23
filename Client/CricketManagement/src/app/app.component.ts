import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userName = localStorage.getItem('userName');
  title = 'CricketManagement';

  constructor(private router: Router, 
    private userService: UserService) {
      
    }
    
  isUserLoggedIn() {
    return this.userService.isUserLogin();
  }
  logout() {
      if (this.userService.isUserLogin()) {
        const result = confirm('Are you sure you want to logout?');
        if (result) {
          this.userService.logout();
        }
      } else {
        alert('Please login first!');
    }
  }
}
