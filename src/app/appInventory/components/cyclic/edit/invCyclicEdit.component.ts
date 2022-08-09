import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-invCyclicEdit',
    templateUrl: './invCyclicEdit.component.html',
    styleUrls: ['./invCyclicEdit.component.css']
})
export class InvCyclicEditComponent implements OnInit{
    cyclicId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<InvCyclicEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.cyclicId=this.data.cyclicId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}