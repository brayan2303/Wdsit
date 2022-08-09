import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'information',
    templateUrl: './information.component.html',
    styleUrls: ['./information.component.css']
})
export class InformationComponent{
    message:string;
    
    constructor(public dialogRef: MatDialogRef<InformationComponent>,@Inject(MAT_DIALOG_DATA) public data: any){}
    ngOnInit(): void {
        this.message=this.data.message;
    }
    close(){
        this.dialogRef.close();
    }
}