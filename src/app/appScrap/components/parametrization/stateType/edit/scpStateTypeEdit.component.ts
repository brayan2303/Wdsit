import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-scpStateTypeEdit',
    templateUrl: './scpStateTypeEdit.component.html',
    styleUrls: ['./scpStateTypeEdit.component.css']
})
export class ScpStateTypeEditComponent implements OnInit{
    stateTypeId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<ScpStateTypeEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.stateTypeId=this.data.stateTypeId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}