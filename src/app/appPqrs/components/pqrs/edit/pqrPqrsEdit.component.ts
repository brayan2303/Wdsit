import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-pqrPqrsEdit',
    templateUrl: './pqrPqrsEdit.component.html',
    styleUrls: ['./pqrPqrsEdit.component.css']
})
export class PqrPqrsEditComponent implements OnInit{
    pqrsId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<PqrPqrsEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.pqrsId=this.data.pqrsId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}