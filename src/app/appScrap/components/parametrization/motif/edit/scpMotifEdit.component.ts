import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-scpMotifEdit',
    templateUrl: './scpMotifEdit.component.html',
    styleUrls: ['./scpMotifEdit.component.css']
})
export class ScpMotifEditComponent implements OnInit{
    motifId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<ScpMotifEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.motifId=this.data.motifId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}