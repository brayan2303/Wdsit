import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-genCenterCostEdit',
    templateUrl: './genCenterCostEdit.component.html',
    styleUrls: ['./genCenterCostEdit.component.css']
})
export class GenCenterCostEditComponent implements OnInit{
    centerCostId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<GenCenterCostEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.centerCostId=this.data.centerCostId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}