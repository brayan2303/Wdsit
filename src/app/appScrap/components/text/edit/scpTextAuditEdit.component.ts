import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-scpTextAuditEdit',
    templateUrl: './scpTextAuditEdit.component.html',
    styleUrls: ['./scpTextAuditEdit.component.css']
})
export class ScpTextAuditEditComponent implements OnInit{
  formId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<ScpTextAuditEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
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