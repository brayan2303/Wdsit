import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-ActFeaturesProductEdit',
    templateUrl: './ActFeaturesProductEdit.component.html',
    styleUrls: ['./ActFeaturesProductEdit.component.css']
})
export class ActFeaturesProductEditComponent implements OnInit{
    ActFixProductformId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<ActFeaturesProductEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.ActFixProductformId=this.data.ActFixProductformId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}