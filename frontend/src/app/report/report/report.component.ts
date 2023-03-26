import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReportService } from '../report.service';
 import { MatTableDataSource } from '@angular/material/table';
import { Report } from '../report.model';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
declare const Blob: any;


 export interface reportElement{
   state: string,
   district: string,
   subDistrict: string,
   block: string,
   PFO: string,
   shareHolders: number,
   percentageWomenFarmers: number
 }
//  const reportData :{}[]=[{}]
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  //@ViewChild('data', {static: false}) dataList: ElementRef;
  displayedColumns: string[]=['s.no.','state','district','subDistrict','block','fpo','shareHolders','womenFarmers']
   //reportData: Report[{}]=[{}]
    reportData :{}[]=[{}]
dataSource = new MatTableDataSource(this.reportData)
constructor(private reportServ: ReportService){}
ngOnInit(): void {
    this.onShowReport();
}
onShowReport(){
this.reportServ.showReport().subscribe(resData=>{
console.log(resData)
this.dataSource.data = resData
})
}
applyFilter(event: Event){
const filteredValue = (event.target as HTMLInputElement).value
this.dataSource.filter = filteredValue.trim().toLowerCase()
}

downloadReport(){
  const ws = XLSX.utils.json_to_sheet(this.dataSource.data)
  var wb = XLSX.utils.book_new()
XLSX.utils.book_append_sheet(wb,ws, 'sheet1');
 const excelData=XLSX.write(wb, {bookType: 'xlsx', type: 'array',});
const blob = new Blob([excelData],{ type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
saveAs(blob,'FPO_report.xlsx')
}
}
