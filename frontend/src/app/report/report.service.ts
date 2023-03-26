import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Report } from './report.model';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ReportService {
  URL = 'http://localhost:3000/report';
  isSessionExpired=false
  // const httpOptions={
  //   headers: new HttpHeaders({
  //     'content-type': 'application/json',
  //     'x-api-key': 'Bearer' + token
  //   })
  // }
  //  token = localStorage.getItem('Authorization')
  //   headers=new HttpHeaders({
  //   'Content-Type': 'application/json',
  //     'Authorization': `${this.token}`
  //  })

  constructor(private http: HttpClient) {}

  createHeader(){
    const authStr=  localStorage.getItem('Authorization');
    let token;
    let expiresIn;
    if(authStr!='null' && authStr!=null){
      const authData= JSON.parse(authStr)
      token = authData.token
      expiresIn = authData.expiresIn
    }else{
      console.log('token is not present in local storage')
    }

    console.log(expiresIn)
    let headers={}
    if(expiresIn<Date.now()){
      this.isSessionExpired=true
       headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `null`
      });
      console.log('session has expired!!')
    }else{
       headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      });
    }
    return headers
  }

  submitReport(
    state: string,
    district: string,
    subDistrict: string,
    block: string,
    FPO: string,
    shareHolders: number,
    percentageWomenFarmers: number
  ) {
    const reportObj = {
      state,
      district,
      subDistrict,
      block,
      FPO,
      shareHolders,
      percentageWomenFarmers
    };
    const headers=this.createHeader()
    console.log(`create report header ${headers}`)
    return this.http.post(this.URL, reportObj,{headers});
  }

  showReport(){
    const headers=this.createHeader()
console.log(headers)
    return this.http.get(this.URL,{headers}).pipe(map((responseData)=>{
      const reportArr=[]
      for(const key in responseData){
        if(responseData.hasOwnProperty(key)){
          reportArr.push({...responseData[key as keyof typeof responseData],id:key})
        }
      }
      return reportArr
    }))

  }
}
