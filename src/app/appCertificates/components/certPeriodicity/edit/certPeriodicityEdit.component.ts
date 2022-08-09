import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-certPeriodicityEdit',
    templateUrl: './certPeriodicityEdit.component.html',
    styleUrls: ['./certPeriodicityEdit.component.css']
})
export class CertificatePeriodicityEditComponent implements OnInit{
    PeriodicityId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<CertificatePeriodicityEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.PeriodicityId=this.data.PeriodicityId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}