import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-repMailEdit',
    templateUrl: './repMailEdit.component.html',
    styleUrls: ['./repMailEdit.component.css']
})
export class RepMailEditComponent implements OnInit{
    mailId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<RepMailEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.mailId=this.data.mailId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}