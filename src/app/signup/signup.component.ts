import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormControl,FormGroup,Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit{
  constructor(private _AuthService:AuthService,private _Router:Router){
    this.img = _AuthService.img;
  }
  signupForm = new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(2),Validators.maxLength(50)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.minLength(6),Validators.maxLength(20)]),
    confirmPassword:new FormControl(null,[Validators.required,Validators.minLength(6),Validators.maxLength(20)]),
  })

  emailError:string='';
  passwordError:string='';
  img:string='';

  signup(formData: FormGroup) {
    this._AuthService.signup(formData.value).subscribe((res) => {
      if (res.token) {
        localStorage.setItem("token", res.token);
        this._AuthService.getCurrentUser();
      }
      this._Router.navigate(['/home'])

    }, (error) => {
      error.error.errors.map((e: any) => {
        if (e.path == 'email') {
          this.emailError = e.msg;
        } else if (e.path == 'password') {
          this.passwordError = e.msg;
        }
      })
    })
  }

  ngOnInit()
  {
    this.img = this._AuthService.img;
  }
}
