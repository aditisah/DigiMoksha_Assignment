import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  @ViewChild('signup') signup: NgForm
  isSignedUp: boolean=false
  constructor(private authServ: AuthService) {}
  onSignUp(signUp: NgForm) {
    const adminDetail = signUp.value;
    //console.log(adminDetail)
    this.authServ.signUp(
      adminDetail.userName,
      adminDetail.email,
      adminDetail.mobileNo,
      adminDetail.password,
      adminDetail.confirmPassword
    ).subscribe(responseData=>{
      console.log(responseData)
      this.isSignedUp=true
    })
  }
}
