import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-scpAuditEdit',
    templateUrl: './scpAuditEdit.component.html',
    styleUrls: ['./scpAuditEdit.component.css']
})
export class ScpAuditEditComponent implements OnInit{
    auditId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<ScpAuditEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.auditId=this.data.auditId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}