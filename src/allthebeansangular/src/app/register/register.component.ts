import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //FormGroup
  registerForm: FormGroup;

  //Error Fields
  error : string;
  constructor(private notificationService: NotificationService,private userService: UserService, private router : Router) {
    this.registerForm = new FormGroup({
      User: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      Pass: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      Mail: new FormControl('', [
        Validators.required,
        Validators.email
      ])
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.username.errors && !this.password.errors && !this.email.errors) {
      this.userService.register(this.username.value, this.password.value, this.email.value).subscribe(result => {
        if(this.userService.LoggedIn) {
          this.router.navigate(['/dashboard']);
          this.notificationService.sendSuccess("Registered Successfully.");
        }
      }, error => {
        this.notificationService.sendError(error.error.message);
      });
    }
    else
    {
      this.notificationService.sendError("Check your details, some are invalid.");
    }
  }

  get username() { return this.registerForm.get("User"); }
  get password() { return this.registerForm.get("Pass"); }
  get email() { return this.registerForm.get("Mail"); }

}
