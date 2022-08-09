import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-repReportEdit',
    templateUrl: './repReportEdit.component.html',
    styleUrls: ['./repReportEdit.component.css']
})
export class RepReportEditComponent implements OnInit{
    reportId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<RepReportEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.reportId=this.data.reportId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}