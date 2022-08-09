import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-tasActivityEdit',
    templateUrl: './tasActivityEdit.component.html',
    styleUrls: ['./tasActivityEdit.component.css']
})
export class TasActivityEditComponent implements OnInit{
    activityId:number;
    taskId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<TasActivityEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.activityId=this.data.activityId;
        this.taskId=this.data.taskId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}