import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private notificationService: NotificationService, private router : Router, private userService : UserService) {

    if(this.userService.GetCurrentUser){
      this.userService.logout();
      this.notificationService.sendSuccess("You are now logged out");
    }
    
   }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      User: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      Pass: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }

  onSubmit() {
    if(this.username.invalid || this.password.invalid)
    {
      this.notificationService.sendError("Username and password must not be blank");
      return
    }

    this.userService.login(this.username.value, this.password.value).subscribe(result => {
      if(this.userService.LoggedIn) {
        this.router.navigate(['/dashboard']);
        this.notificationService.sendSuccess("Logged in successfully, welcome " + this.userService.GetCurrentUser.username);
      }
      else
      {
        this.notificationService.sendError("Something went wrong");
      }
    }, error => {
      if('message' in error.error)
      {
        if(error.error.message.indexOf('Sequence contains no elements') >= 0)
        {
          this.notificationService.sendError("Invalid username or password");
        }
        else
        {
          this.notificationService.sendError(error.error.message);
        }
      }
    });
  }
  get username() { return this.loginForm.get("User"); }
  get password() { return this.loginForm.get("Pass"); }
}
