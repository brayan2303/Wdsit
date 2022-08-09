import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-certCertEdit',
    templateUrl: './certCertEdit.component.html',
    styleUrls: ['./certCertEdit.component.css']
})
export class CertificateCertEditComponent implements OnInit{
    CertId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<CertificateCertEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.CertId=this.data.CertId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}