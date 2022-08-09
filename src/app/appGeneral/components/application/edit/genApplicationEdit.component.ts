import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-genApplicationEdit',
    templateUrl: './genApplicationEdit.component.html',
    styleUrls: ['./genApplicationEdit.component.css']
})
export class GenApplicationEditComponent implements OnInit{
    applicationId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<GenApplicationEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.applicationId=this.data.applicationId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}