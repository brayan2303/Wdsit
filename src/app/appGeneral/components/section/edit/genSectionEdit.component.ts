import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-genSectionEdit',
    templateUrl: './genSectionEdit.component.html',
    styleUrls: ['./genSectionEdit.component.css']
})
export class GenSectionEditComponent implements OnInit{
    sectionId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<GenSectionEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.sectionId=this.data.sectionId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}