import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-genPositionEdit',
    templateUrl: './genPositionEdit.component.html',
    styleUrls: ['./genPositionEdit.component.css']
})
export class GenPositionEditComponent implements OnInit{
    positionId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<GenPositionEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.positionId=this.data.positionId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}