import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-genUserEdit',
    templateUrl: './genUserEdit.component.html',
    styleUrls: ['./genUserEdit.component.css']
})
export class GenUserEditComponent implements OnInit{
    personId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<GenUserEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.personId=this.data.personId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}