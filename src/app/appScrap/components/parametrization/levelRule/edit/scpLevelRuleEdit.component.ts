import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-scpLevelRuleEdit',
    templateUrl: './scpLevelRuleEdit.component.html',
    styleUrls: ['./scpLevelRuleEdit.component.css']
})
export class ScpLevelRuleEditComponent implements OnInit{
    levelRuleId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<ScpLevelRuleEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.levelRuleId=this.data.levelRuleId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}