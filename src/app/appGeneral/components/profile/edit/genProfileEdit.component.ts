import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-genProfileEdit',
    templateUrl: './genProfileEdit.component.html',
    styleUrls: ['./genProfileEdit.component.css']
})
export class GenProfileEditComponent implements OnInit{
    profileId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<GenProfileEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.profileId=this.data.profileId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}