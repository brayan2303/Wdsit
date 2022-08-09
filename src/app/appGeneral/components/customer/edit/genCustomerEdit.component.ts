import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-genCustomerEdit',
    templateUrl: './genCustomerEdit.component.html',
    styleUrls: ['./genCustomerEdit.component.css']
})
export class GenCustomerEditComponent implements OnInit{
    customerId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<GenCustomerEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.customerId=this.data.customerId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}