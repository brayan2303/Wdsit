import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'confirmationFinishPqrs',
    templateUrl: './confirmationFinishPqrs.component.html',
    styleUrls: ['./confirmationFinishPqrs.component.css']
})
export class confirmationFinishPqrs{
    status:boolean;
    message:string;
    
    constructor(public dialogRef: MatDialogRef<confirmationFinishPqrs>,@Inject(MAT_DIALOG_DATA) public data: any){
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