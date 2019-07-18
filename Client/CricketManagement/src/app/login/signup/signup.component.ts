import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
  }

  onSignup() {
    if (this.firstName.length == 0) {
      alert('enter first name');
    } else if (this.lastName.length == 0) {
      alert('enter last name');
    } else if (this.email.length == 0) {
      alert('enter email');
    } else if (this.password.length == 0) {
      alert('enter password');
    } else if (this.confirmPassword.length == 0) {
      alert('confirm password');
    } else if (this.confirmPassword != this.password) {
      alert('password do not match');
    } else {
      this.userService
        .signup(this.firstName, this.lastName, this.email, this.password)
        .subscribe(response => {
          const body = response.json();
          if (body['status'] == 'success') {
            this.router.navigate(['/login']);
          } else {
            alert('error while registering a user');
          }
        });
    }
  }

  onCancel() {
    this.router.navigate(['/login']);
  }

}
