import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-ActFeaturesAssigmetEdit',
    templateUrl: './ActFeaturesAssigmetEdit.component.html',
    styleUrls: ['./ActFeaturesAssigmetEdit.component.css']
})
export class ActFeaturesAssigmentEditComponent implements OnInit{
    ActFixAsigformId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<ActFeaturesAssigmentEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.ActFixAsigformId=this.data.ActFixAsigformId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}