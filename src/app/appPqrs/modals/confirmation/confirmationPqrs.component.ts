import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'confirmationPqrs',
    templateUrl: './confirmationPqrs.component.html',
    styleUrls: ['./confirmationPqrs.component.css']
})
export class ConfirmationPqrs{
    status:boolean;
    message:string;
    
    constructor(public dialogRef: MatDialogRef<ConfirmationPqrs>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.message=this.data.message;
    }
    onClose(value:boolean){
        this.status=value;
        this.dialogRef.close(this.status);
    }
}