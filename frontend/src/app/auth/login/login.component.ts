import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoginResponse } from '../loginResponse.interface'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @ViewChild('login') login: NgForm;
  isValidCredentials: boolean = true
  isLoggedIn: boolean = false
  constructor(private authServ: AuthService) {}
  onLogIn(login: NgForm) {
    const loginDetail = login.value;
    this.authServ
      .logIn(loginDetail.email, loginDetail.password)
      .subscribe({
        next:(resData: LoginResponse)=>{
          console.log(resData.data.token)
          const tokenObj={
            token: resData.data.token,
            expiresIn: Date.now()+(60*1000)
          }
          localStorage.setItem('Authorization',JSON.stringify(tokenObj))
          this.isValidCredentials=true
          this.isLoggedIn = true
        },
        error:err=> {
          this.isValidCredentials=false
        }
  });
  }
}
