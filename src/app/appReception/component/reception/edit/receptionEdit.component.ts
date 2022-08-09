import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-receptionEdit',
    templateUrl: './receptionEdit.component.html',
    styleUrls: ['./receptionEdit.component.css']
})
export class ReceptionEditComponent implements OnInit{
    formId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<ReceptionEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
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