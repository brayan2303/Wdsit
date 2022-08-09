import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-scpCertificateEdit',
    templateUrl: './scpCertificateEdit.component.html',
    styleUrls: ['./scpCertificateEdit.component.css']
})
export class ScpCertificateEditComponent implements OnInit{
  formId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<ScpCertificateEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.formId=this.data.formId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}