import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-genHolidaysEdit',
    templateUrl: './genHolidaysEdit.component.html',
    styleUrls: ['./genHolidaysEdit.component.css']
})
export class GenHolidaysEditComponent implements OnInit{
    genHolidaysformId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<GenHolidaysEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.genHolidaysformId=this.data.genHolidaysformId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}