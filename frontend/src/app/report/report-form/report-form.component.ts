import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReportService } from '../report.service';
@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent {
@ViewChild('report') report: NgForm
isFormSubmitted: boolean = false
isAuthenticate: boolean = true
isFieldEmpty: boolean = false
errorFlag: boolean=false
errorMessage: string=''

 states = ['Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttarakhand',
  'Uttar Pradesh',
  'West Bengal']

  constructor(private reportServ: ReportService){}
  onSubmitReport(report: NgForm){
    const reportData = report.value
    //console.log(reportData)
    this.reportServ.submitReport(reportData.state, reportData.district,
      reportData.subDistrict,
      reportData.block,
      reportData.FPO,
      reportData.shareHolders,
      reportData.percentageWomenFarmers).subscribe({
        next: response=>{
          console.log(response)
          this.isFormSubmitted=true
          this.isAuthenticate=true
        },
        error: err=>{
          if(err.status===401){
            this.isAuthenticate=false
          }else{
            this.isFormSubmitted=false
            //this.isFieldEmpty=true
            this.errorFlag=true
            this.errorMessage=err.error.message
          }

          console.log(err.error.message)
        }
      }
      )

  }
}
