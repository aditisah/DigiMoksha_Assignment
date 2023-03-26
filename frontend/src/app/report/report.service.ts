import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Report } from './report.model';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ReportService {
  URL = 'http://localhost:3000/report';
  // const httpOptions={
  //   headers: new HttpHeaders({
  //     'content-type': 'application/json',
  //     'x-api-key': 'Bearer' + token
  //   })
  // }
  constructor(private http: HttpClient) {}
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
    return this.http.post(this.URL, reportObj);
  }

  showReport(){
    return this.http.get(this.URL).pipe(map((responseData)=>{
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
