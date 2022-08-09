import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-tasTaskEdit',
    templateUrl: './tasTaskEdit.component.html',
    styleUrls: ['./tasTaskEdit.component.css']
})
export class TasTaskEditComponent implements OnInit{
    taskId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<TasTaskEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.taskId=this.data.taskId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}