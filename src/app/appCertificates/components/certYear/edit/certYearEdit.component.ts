import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-certYearEdit',
    templateUrl: './certYearEdit.component.html',
    styleUrls: ['./certYearEdit.component.css']
})
export class CertificateYearEditComponent implements OnInit{
    YearId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<CertificateYearEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.YearId=this.data.YearId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}