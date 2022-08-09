import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'informationInv',
    templateUrl: './informationInv.component.html',
    styleUrls: ['./informationInv.component.css']
})
export class InformationInvComponent{
    message:string;
    
    constructor(public dialogRef: MatDialogRef<InformationInvComponent>,@Inject(MAT_DIALOG_DATA) public data: any){}
    ngOnInit(): void {
        this.message=this.data.message;
    }
    close(){
        this.dialogRef.close();
    }
}