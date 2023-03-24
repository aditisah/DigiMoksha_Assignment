import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild("login") login: NgForm

  constructor(private authServ: AuthService){}
onLogIn(login: NgForm){
const loginDetail = login.value
this.authServ.logIn(loginDetail.email, loginDetail.password)
}
}
