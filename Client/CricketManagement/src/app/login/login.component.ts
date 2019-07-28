import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';

  constructor(
    private userService: UserService,
    private router: Router) { }/*  */

  ngOnInit() {
  }

  onLogin() {
    if (this.email.length == 0) {
      alert('enter email');
    } else if (this.password.length == 0) {
      alert('enter password');
    } else {
      this.userService
        .login(this.email, this.password);
    }
  }

  onCancel() {
    this.router.navigate(['/home']);
  }

  onSignup() {
    this.router.navigate(['/signup']);
  }
}