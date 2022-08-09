import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-scpAuditPreviousEdit',
    templateUrl: './scpAuditPreviousEdit.component.html',
    styleUrls: ['./scpAuditPreviousEdit.component.css']
})
export class ScpAuditPreviousEditComponent implements OnInit{
    auditPreviousId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<ScpAuditPreviousEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.auditPreviousId=this.data.auditPreviousId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}