import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-ActFeaturesEditEdit',
    templateUrl: './actFeaturesEdit.component.html',
    styleUrls: ['./actFeaturesEdit.component.css']
})
export class ActFeaturesEditComponent implements OnInit{
    ActFixformId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<ActFeaturesEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
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