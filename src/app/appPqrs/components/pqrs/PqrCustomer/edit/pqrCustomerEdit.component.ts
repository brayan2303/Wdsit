import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-pqrCustomerEdit',
    templateUrl: './pqrCustomerEdit.component.html',
    styleUrls: ['./pqrCustomerEdit.component.css']
})
export class PqrCustomerEditComponent implements OnInit{
    pqrCustformId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<PqrCustomerEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.pqrCustformId=this.data.pqrCustformId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}