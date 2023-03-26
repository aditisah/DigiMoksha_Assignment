import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

interface LoginResponse {
  data: {
    userId: number;
    token: string;
  };
  message: string;
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
URL = "http://localhost:3000/admin"
  constructor(private http: HttpClient) { }
  signUp(userName: string, email: string, mobileNo: number, password: string, confirmPassword: string){
    const signUpObj = {
      userName: userName,
      email: email,
      mobileNo: mobileNo,
      password: password,
      confirmPassword: confirmPassword
    }
  return this.http.post(`${this.URL}/signup`,signUpObj)
  }

  logIn(email: string, password: string){
    const loginObj = {
      email: email,
      password: password
    }
    return this.http.post<LoginResponse>(`${this.URL}/login`, loginObj)
  }
}
