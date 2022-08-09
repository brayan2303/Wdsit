import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent{
    status:boolean;
    message:string;
    
    constructor(public dialogRef: MatDialogRef<ConfirmationComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
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