import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-genCountryEdit',
    templateUrl: './genCountryEdit.component.html',
    styleUrls: ['./genCountryEdit.component.css']
})
export class GenCountryEditComponent implements OnInit{
    countryId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<GenCountryEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.countryId=this.data.countryId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}