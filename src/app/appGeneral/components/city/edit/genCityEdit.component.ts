import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-genCityEdit',
    templateUrl: './genCityEdit.component.html',
    styleUrls: ['./genCityEdit.component.css']
})
export class GenCityEditComponent implements OnInit{
    cityId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<GenCityEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.cityId=this.data.cityId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}