import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-conControlPanelEdit',
    templateUrl: './conControlPanelEdit.component.html',
    styleUrls: ['./conControlPanelEdit.component.css']
})
export class ConControlPanelEditComponent implements OnInit{
    controlPanelId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<ConControlPanelEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.controlPanelId=this.data.controlPanelId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}