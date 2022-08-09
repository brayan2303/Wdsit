import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-certMonthEdit',
    templateUrl: './certMonthEdit.component.html',
    styleUrls: ['./certMonthEdit.component.css']
})
export class CertificateMonthEditComponent implements OnInit{
    MonthId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<CertificateMonthEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.MonthId=this.data.MonthId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}