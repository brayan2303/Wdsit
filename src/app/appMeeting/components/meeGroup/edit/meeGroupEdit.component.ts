import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-meeGroupEdit',
    templateUrl: './meeGroupEdit.component.html',
    styleUrls: ['./meeGroupEdit.component.css']
})
export class MeeGroupEditComponent implements OnInit{
    meGroupformId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<MeeGroupEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.meGroupformId=this.data.meGroupformId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}