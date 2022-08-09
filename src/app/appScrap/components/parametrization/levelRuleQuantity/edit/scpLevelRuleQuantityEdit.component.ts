import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-scpLevelRuleQuantityEdit',
    templateUrl: './scpLevelRuleQuantityEdit.component.html',
    styleUrls: ['./scpLevelRuleQuantityEdit.component.css']
})
export class ScpLevelRuleQuantityEditComponent implements OnInit{
    levelRuleQuantityId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<ScpLevelRuleQuantityEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.levelRuleQuantityId=this.data.levelRuleQuantityId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}