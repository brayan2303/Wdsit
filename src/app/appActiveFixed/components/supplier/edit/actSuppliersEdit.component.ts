import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-actSuppliersEdit',
    templateUrl: './actSuppliersEdit.component.html',
    styleUrls: ['./actSuppliersEdit.component.css']
})
export class ActSuppliersEditComponent implements OnInit{
    ActFixformId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<ActSuppliersEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.ActFixformId=this.data.ActFixformId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}