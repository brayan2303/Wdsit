import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-dataBasesEdit',
    templateUrl: './dataBasesEdit.component.html',
    styleUrls: ['./dataBasesEdit.component.css']
})
export class DataBasesEditComponent implements OnInit{
    formId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<DataBasesEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
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