import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-genModuleEdit',
    templateUrl: './genModuleEdit.component.html',
    styleUrls: ['./genModuleEdit.component.css']
})
export class GenModuleEditComponent implements OnInit{
    moduleId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<GenModuleEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.moduleId=this.data.moduleId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}